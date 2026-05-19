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
          className="object-contain"
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
                <NavigationMenuContent className="min-w-[180px]">
                  {item.children.map((child) => (
                    <NavigationMenuLink key={child.slug} asChild>
                      <Link
                        href={`/${child.slug}`}
                        className="whitespace-nowrap block px-4 py-2"
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
