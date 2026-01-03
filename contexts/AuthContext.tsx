"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { Profile } from "@/types/pos";

interface AuthContextType {
    user: Profile | null;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: Profile = {
    id: "user-1",
    email: "demo@lua.vn",
    role: "admin",
    full_name: "Nguyễn Văn A",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Profile | null>(null);

    const login = () => {
        setUser(mockUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
