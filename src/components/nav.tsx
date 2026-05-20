"use client";

import Link from "next/link";
import Image from "next/image";
import type { IProps } from "@/types/nav-t";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Nav(props: IProps) {
  const { menu } = props;

  return (
    <div className="flex items-center gap-x-6 p-4">
      <Link href="/" className="flex items-center gap-x-3 hover:no-underline">
        <Image
          src="/logo.png"
          alt="Novella logo"
          width={100}
          height={100}
          className="h-12 w-auto"
          priority
        />
        <span className="text-2xl font-bold text-primary leading-tight">
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
                        href={`/${child.slug}`}
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
                  <Link href={`/${item.slug}`}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
