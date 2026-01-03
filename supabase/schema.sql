-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'staff',
  updated_at timestamp with time zone,

  constraint username_length check (char_length(full_name) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for products
create table products (
  id uuid default gen_random_uuid() primary key,
  barcode text,
  name text not null,
  price numeric not null,
  unit text,
  category text,
  image_url text,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table products enable row level security;

create policy "Products are viewable by everyone." on products
  for select using (true);

create policy "Authenticated users can create products." on products
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update products." on products
  for update using (auth.role() = 'authenticated');

-- Create a table for orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete set null,
  total_amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table orders enable row level security;

create policy "Users can view their own orders." on orders
  for select using (auth.uid() = user_id);

create policy "Authenticated users can create orders." on orders
  for insert with check (auth.role() = 'authenticated');

-- Create a table for order items
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  quantity integer not null default 1,
  price_at_sale numeric not null
);

alter table order_items enable row level security;

create policy "Users can view their own order items." on order_items
  for select using (
    exists ( select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid() )
  );

create policy "Authenticated users can create order items." on order_items
  for insert with check (auth.role() = 'authenticated');

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table orders;

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'staff');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
