import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Indoor Prince',
  description: 'A personal blog by Indoor Prince',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}