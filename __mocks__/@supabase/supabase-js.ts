export const createClient = jest.fn(() => ({
  auth: {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
  },
}));
