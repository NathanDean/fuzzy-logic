import Main from '@/components/Main';
import Heading from '@/components/ui/Heading';
import Logo from '@/components/ui/Logo';

export default function Home() {
  return (
    <Main className="pt-25">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Heading variant="h1" className="text-center text-8xl">
          <Logo />
        </Heading>

        <Heading variant="h2">an improv company</Heading>
      </div>
    </Main>
  );
}
