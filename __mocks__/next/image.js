const React = require('react');

// Simple mock for next/image
const Image = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  quality,
  fill,
  sizes,
  placeholder,
  ...props
}) => {
  // Simulate the behavior of next/image by rendering a regular img
  // with appropriate props while discarding Next.js specific props
  return React.createElement('img', {
    src: typeof src === 'object' ? src.src : src, // Handle both string and object src
    alt,
    width,
    height,
    className,
    'data-testid': 'next-image-mock',
    ...props,
  });
};

module.exports = Image;
module.exports.default = Image;
