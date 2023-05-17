interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <div className="grid gap-1 md:col-span-2">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="my-auto md:justify-self-end">{children}</div>
    </div>
  );
}
