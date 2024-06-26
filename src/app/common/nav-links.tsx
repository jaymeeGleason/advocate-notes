'use client';

import {
  HomeIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ListBulletIcon } from '@heroicons/react/20/solid';
const links = [
  { 
    name: 'Home', 
    href: '/', 
    icon: HomeIcon 
  },
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: ListBulletIcon 
  },
  {
    name: 'Create Notes',
    href: '/dashboard/create-notes',
    icon: DocumentIcon,
  },
];


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-black-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-200 text-black-600': pathname === link.href,
              },
            )}          
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
