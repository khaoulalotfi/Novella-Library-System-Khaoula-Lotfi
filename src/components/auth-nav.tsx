import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { signOutAction } from "@/actions/signout-action"
import { Role } from "@/constants/role"
import Link from "next/link"
import { LangSwitcher } from "@/components/parts/lang-switcher"
import type { Locale, IDict } from "@/lib/dictionary"

interface IProps {
  lang: Locale
  dict: IDict["auth"]
}

export async function AuthNav(props: IProps) {
  const { lang, dict } = props

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <ul className="flex items-center gap-x-3">
      {!session ? (
        <>
          <li>
            <Link
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href={`/${lang}/signup`}
            >
              {dict.signUp}
            </Link>
          </li>
          <li>
            <Link
              className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
              href={`/${lang}/signin`}
            >
              {dict.signIn}
            </Link>
          </li>
        </>
      ) : null}
      {session ? (
        <>
          <li>
            <span className="text-sm text-muted-foreground">
              {session.user.name ?? session.user.email}{" "}
              <span className="text-xs text-primary/70">
                ({session.user.role ?? Role.User})
              </span>
            </span>
          </li>
          <li>
            <form action={signOutAction}>
              <button
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                type="submit"
              >
                {dict.signOut}
              </button>
            </form>
          </li>
        </>
      ) : null}
      <li>
        <LangSwitcher currentLang={lang} />
      </li>
    </ul>
  )
}
