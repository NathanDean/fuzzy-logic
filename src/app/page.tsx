import Heading from '@/components/ui/Heading';
import Logo from '@/components/ui/Logo';

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Heading variant="h1" className="mb-4 px-1 text-center text-8xl">
        <Logo />
      </Heading>

      <Heading variant="h2">an improv company</Heading>
    </div>
  );
}
