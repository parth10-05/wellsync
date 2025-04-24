import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Auth not required for these paths
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(router.pathname);

  return (
    <ThemeProvider>
      <AuthProvider>
        {isPublicPath ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
