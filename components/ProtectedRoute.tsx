"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};
