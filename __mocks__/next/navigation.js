const useRouter = jest.fn(() => ({

    push: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn()

}));

const redirect = jest.fn();

module.exports = {

    useRouter,
    redirect

}