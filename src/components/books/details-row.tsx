interface IProps {
  label: string
  value: string
}

export function Row(props: IProps) {
  const { label, value } = props
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}
