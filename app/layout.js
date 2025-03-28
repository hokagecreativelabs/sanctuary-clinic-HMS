import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "ClinicFlow",
  description: "Hospital Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
