"use client";

import Link from "next/link";
import Image from "next/image";
import type { INav } from "@/types/nav-t";
import type { Locale } from "@/lib/dictionary";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface IProps {
  menu: INav[];
  lang: Locale;
}

export function Nav(props: IProps) {
  const { menu, lang } = props;

  return (
    <div className="flex items-center gap-x-6 p-4">
      <Link href={`/${lang}`} className="flex items-center gap-x-0 hover:no-underline">
        <Image
          src="/logo.png"
          alt="Novella logo"
          width={100}
          height={100}
          className="h-18 w-auto"
          priority
        />
        <span className="text-1xl font-bold text-white leading-tight -ml-3">
          Novella
        </span>
      </Link>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {menu.map((item) =>
            item.children ? (
              <NavigationMenuItem key={item.slug}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent
                  className="min-w-[180px] rounded-xl border border-white/10 backdrop-blur-md"
                  style={{ background: "rgba(15, 10, 25, 0.75)" }}
                >
                  {item.children.map((child) => (
                    <NavigationMenuLink key={child.slug} asChild>
                      <Link
                        href={`/${lang}/${child.slug}`}
                        className="whitespace-nowrap block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-primary hover:bg-white/5 transition-colors rounded-lg"
                      >
                        {child.title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.slug}>
                <NavigationMenuLink asChild>
                  <Link href={item.slug ? `/${lang}/${item.slug}` : `/${lang}`}>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
