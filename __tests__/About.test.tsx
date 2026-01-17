import About from '@/app/(main)/about/page';
import '@testing-library/jest-dom';

import { mockPeopleData } from '../__fixtures__/people';

jest.mock('@/utils/supabase/serverClient', () => ({
  createClient: jest.fn(() => ({
    from: () => ({
      select: () => ({
        order: () =>
          Promise.resolve({
            data: mockPeopleData,
          }),
      }),
    }),
  })),
}));

describe('About', () => {
  it('passes correct people data to client wrapper', async () => {
    const component = await About();
    const clientWrapper = component.props.children;
    const people = clientWrapper.props.people;

    expect(people[0].name).toBe('Mark Corrigan');
    expect(people[0].bio).toBe('Boy to geek to drone.');
    expect(people[1].name).toBe('Jeremy Usborne');
    expect(people[1].bio).toBe('Big beats are the best.');
  });
});
