interface LinksProps {
  children?: React.ReactNode;
}

export default function LinksLayout({ children }: LinksProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}
