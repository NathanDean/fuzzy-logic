const React = require('react');

const Link = ({ href, children, ...rest }) => {
  return React.createElement('a', { href, ...rest }, children);
};

module.exports = Link;
module.exports.default = Link;
