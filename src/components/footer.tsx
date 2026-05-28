import type { IDict } from "@/lib/dictionary"

interface IProps {
  dict: IDict["footer"]
}

export function Footer(props: IProps) {
  const { dict } = props
  return (
    <footer className="mt-5 p-1 bg-background text-muted-foreground text-sm text-center">
      {dict.copyright}
    </footer>
  )
}
