export default function DisplayMessageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col items-center space-y-2">{children}</div>;
}
