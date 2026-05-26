import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { signOutAction } from "@/actions/signout-action";
import Link from "next/link";

export async function AuthNav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ul className="grid grid-flow-col w-fit gap-x-4 items-center">
      {!session ? (
        <>
          <li>
            <Link
              className="text-sm text-primary hover:underline"
              href="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              className="text-sm text-primary hover:underline"
              href="/signin"
            >
              Sign In
            </Link>
          </li>
        </>
      ) : null}
      {session ? (
        <>
          <li>
            <span className="text-sm text-muted-foreground">
              {session.user.name} ({session.user.role ?? "user"})
            </span>
          </li>
          <li>
            <form action={signOutAction}>
              <button
                className="text-sm text-primary hover:underline cursor-pointer"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </li>
        </>
      ) : null}
    </ul>
  );
}
