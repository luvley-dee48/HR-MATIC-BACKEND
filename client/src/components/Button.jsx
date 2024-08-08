// import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className = '', propTextDecoration, propFontWeight }) => {
  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 ${className}`}
      style={{ textDecoration: propTextDecoration, fontWeight: propFontWeight }}
    >
      Login
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  propTextDecoration: PropTypes.string,
  propFontWeight: PropTypes.string,
};

export default Button;
