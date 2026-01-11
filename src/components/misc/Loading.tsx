import { sigmar } from '@/lib/fonts';

import Heading from '../ui/Heading';

export default function Loading() {
  return (
    <Heading variant="h1" className={`${sigmar.className} text-6xl`}>
      loading...
    </Heading>
  );
}
