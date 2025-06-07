// Mock function for any Google fonts

const createFontMock = () => {
  // Returns an object that mimics the font object structure

  return {
    className: 'mocked-font-class',
    style: { fontFamily: 'mocked-font' },
    variable: '--mocked-font-variable',
  };
};

// Create mocks for each font
module.exports = {
  Oi: createFontMock,
  Outfit: createFontMock,
  Sigmar: createFontMock,
  // Add other fonts as needed
};
