import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="dark min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <p className="text-xl text-muted-foreground">
                        Không tìm thấy trang này
                    </p>
                </div>
                <Button asChild>
                    <Link href="/pos" className="gap-2">
                        <Home className="w-4 h-4" />
                        Về trang chủ
                    </Link>
                </Button>
            </div>
        </div>
    );
}
