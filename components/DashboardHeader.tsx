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
    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
      <div className="grid gap-1">
        <h1 className="font-heading font-bold text-3xl md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="lg:justify-self-end my-auto">{children}</div>
    </div>
  );
}
