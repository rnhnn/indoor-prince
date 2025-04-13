'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Blog', path: '/' },
    { name: 'Compendium', path: '/compendium' },
    { name: 'About', path: '/about' },
  ];

  // Determines if a menu item should be marked as active
  const isActive = (menuPath) => {
    if (menuPath === '/') {
      // Match root ("/") and top-level slugs like "/inquisition-disbanded"
      return pathname === '/' || /^\/[^/]+$/.test(pathname);
    }
    return pathname === menuPath;
  };

  return (
    <header className="header">
      <h1 className="header-title">
        <Link href="/">Indoor Prince</Link>
      </h1>

      <menu className="header-menu">
        {menuItems.map(({ name, path }) => (
          <li
            key={path}
            className={`header-menu-item${isActive(path) ? ' active' : ''}`}
          >
            <Link className="header-menu-link" href={path}>
              {name}
            </Link>
          </li>
        ))}
      </menu>
    </header>
  );
}