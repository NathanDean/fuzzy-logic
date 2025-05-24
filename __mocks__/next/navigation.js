const useRouter = jest.fn(() => ({

    push: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn()

}));

const redirect = jest.fn();

const useSearchParams = jest.fn(() => ({

    get: jest.fn(() => null) // Returns null by default for any parameter

}))

module.exports = {

    useRouter,
    redirect,
    useSearchParams

}