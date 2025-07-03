import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged,  FirebaseAuthTypes  } from '@react-native-firebase/auth';
import { router } from 'expo-router';

type AuthContextType = {
  user:  FirebaseAuthTypes.User | null;
  isLoading: boolean;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  getToken: async () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      
      // Safely handle navigation after auth state changes
      if (!isLoading) { // Only navigate after initial load
        router.replace(user ? "/(tabs)" : "/login");
      }
    });

    return unsubscribe;
  }, [isLoading]); // Add dependency to prevent stale closures

  const getToken = async () => {
    return user ? await user.getIdToken() : null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);