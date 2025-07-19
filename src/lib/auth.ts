import { useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
  name: string;
  email: string;
}

interface AuthProvider {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.reload();
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isServiceProvider, setIsServiceProvider] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsServiceProvider(parsedUser.role === 'serviceProvider'); // Ensure role is checked correctly
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        setUser(null);
        setIsServiceProvider(false);
      }
    } else {
      setUser(null);
      setIsServiceProvider(false);
    }
  }, []);

  const login = async (provider: AuthProvider, token: string) => {
    setUser({ id: provider.id, email: provider.email, name: provider.name, role: provider.role });
    localStorage.setItem("user", JSON.stringify(provider));
    localStorage.setItem("token", token);
  };

  return { user, isServiceProvider, login, logout };
}
