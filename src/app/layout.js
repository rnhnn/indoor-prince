import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Indoor Prince',
  description: 'A site about video games',
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