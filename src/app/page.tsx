import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="mb-4 px-1 text-8xl text-center">
        <Logo />
      </h1>

      <h2 className="subheading">an improv company</h2>
    </div>
  );
}
