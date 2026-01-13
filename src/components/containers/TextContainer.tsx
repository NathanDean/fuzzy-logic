export default function TextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="space-y-4 sm:w-xl lg:w-3xl xl:w-4xl">{children}</div>;
}
