import "./styles/normalize.scss";
import "./globals.scss";
import AuthContext from "@/pages/api/AuthContext";
import ProtectRoutes from "./components/protect-routes/ProtectRoutes";
import Header from "./components/header/Header";

interface LayoutProps {
  children: React.ReactNode;
  session?: any;
}

export default function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext>
          <ProtectRoutes>
            <Header />
            {children}
          </ProtectRoutes>
        </AuthContext>
      </body>
    </html>
  );
}
