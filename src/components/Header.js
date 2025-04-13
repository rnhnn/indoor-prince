'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isBlogActive = () => {
    if (pathname === '/') return true;

    const knownTopRoutes = ['/compendium', '/about'];
    return !knownTopRoutes.some((route) => pathname.startsWith(route));
  };

  const menuItems = [
    { name: 'Blog', path: '/' },
    { name: 'Compendium', path: '/compendium' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="header">
      <h1 className="header-title">
        <Link href="/">Indoor Prince</Link>
      </h1>

      <menu className="header-menu">
        {menuItems.map(({ name, path }) => {
          const isActive =
            name === 'Blog' ? isBlogActive() : pathname === path;

          return (
            <li
              key={path}
              className={`header-menu-item${isActive ? ' active' : ''}`}
            >
              <Link className="header-menu-link" href={path}>
                {name}
              </Link>
            </li>
          );
        })}
      </menu>
    </header>
  );
}
