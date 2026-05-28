"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/dictionary";

interface IProps {
  currentLang: Locale;
}

export function LangSwitcher(props: IProps) {
  const { currentLang } = props;
  const pathname = usePathname();
  const router = useRouter();

  const targetLang: Locale = currentLang === "en" ? "fr" : "en";
  const targetPath = pathname.replace(`/${currentLang}`, `/${targetLang}`);

  function handleSwitch() {
    document.cookie = `NEXT_LOCALE=${targetLang}; path=/; max-age=31536000`;
    router.push(targetPath);
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="text-xs font-semibold text-primary border border-primary/40 rounded px-2 py-0.5 hover:bg-primary/10 transition-colors cursor-pointer"
    >
      {targetLang.toUpperCase()}
    </button>
  );
}
