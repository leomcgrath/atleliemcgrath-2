"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { getBrowserClient, getCurrentUser, getSession, signOut as signOutClient } from "./auth-client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      try {
        const sessionData = await getSession();
        const userData = await getCurrentUser();

        setSession(sessionData);
        setUser(userData);
      } catch (error) {
        console.error("Error loading auth:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuth();
  }, []);

  const handleSignOut = async () => {
    await signOutClient();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}