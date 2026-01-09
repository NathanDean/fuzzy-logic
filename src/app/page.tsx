import Heading from '@/components/ui/Heading';
import Logo from '@/components/ui/Logo';

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Heading className="mb-4 px-1 text-8xl text-center">
        <Logo />
      </Heading>

      <h2>an improv company</h2>
    </div>
  );
}
