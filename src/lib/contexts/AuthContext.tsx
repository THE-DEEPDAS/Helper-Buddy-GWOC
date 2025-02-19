// 'use client';

// import { createContext, useContext, useState } from 'react';
// import { User } from '@/lib/types';

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user] = useState<User | null>(null);

//   // Add authentication logic here

//   return (
//     <AuthContext.Provider value={{ user, login: async () => {}, logout: () => {} }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
