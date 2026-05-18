"use client";

import Link from "next/link";
import Image from "next/image";
import type { IProps } from "@/types/nav-t";
import type { INav } from "@/types/nav-t";

const HOST = "http://localhost:3000";

export function Nav(props: IProps) {
  const { menu } = props;

  return (
    <div className="flex items-center gap-x-6 p-4">
      <Link
        href={HOST}
        className="flex items-center gap-x-3 hover:no-underline"
      >
        <Image
          src="/logo.png"
          alt="Novella logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <span className="text-2xl font-bold text-primary leading-tight">
          Novella
        </span>
      </Link>
      <ul className="flex items-center gap-x-1">
        {menu.map((item) => (
          <li key={item.slug} className="relative nav-item">
            <Link href={`${HOST}/${item.slug}`} className="nav-trigger">
              {item.title}
              {item.children && <span className="text-xs">▾</span>}
            </Link>
            {item.children && (
              <div className="nav-dropdown absolute top-full left-0 z-50 w-52 bg-popover border border-border rounded-md shadow-lg p-1">
                {item.children.map((child: INav, index: number) => (
                  <div key={child.slug}>
                    <Link
                      href={`${HOST}/${child.slug}`}
                      className="nav-child-link"
                    >
                      {child.title}
                    </Link>
                    {index < item.children!.length - 1 && (
                      <div className="border-b border-border mx-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
