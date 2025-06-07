const React = require('react');

const Form = ({ children, action, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (action) action(new FormData(e.target));
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit, ...props },
    children
  );
};

module.exports = Form;
