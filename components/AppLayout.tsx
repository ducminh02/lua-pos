"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    ShoppingCart,
    Package,
    ClipboardList,
    LogOut,
    ChevronDown,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
    { path: "/pos", label: "Bán Hàng", icon: ShoppingCart },
    { path: "/products", label: "Sản Phẩm", icon: Package },
    { path: "/orders", label: "Đơn Hàng", icon: ClipboardList },
];

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="dark min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 no-print">
                <div className="h-full px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/pos" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">Lua</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user?.avatar_url} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {user?.full_name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground hidden md:block">
                                {user?.full_name}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2">
                                <User className="w-4 h-4" />
                                Tài khoản
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
                                <LogOut className="w-4 h-4" />
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
};
