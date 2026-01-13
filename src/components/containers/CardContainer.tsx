export default function CardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-3/4sm:w-xl lg:w-3xl xl:w-4xl">{children}</div>;
}
