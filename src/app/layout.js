import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Indoor Prince',
  description: 'A site about video games',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}