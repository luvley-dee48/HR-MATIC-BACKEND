import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Button = ({ className = '', propTextDecoration, propFontWeight }) => {
  const loginStyle = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
      fontWeight: propFontWeight,
    };
  }, [propTextDecoration, propFontWeight]);

  return (
    <div className={`rounded-xl bg-mediumpurple-100 flex flex-row items-start justify-start py-[13px] px-[47px] text-left text-xl text-white ${className}`}>
      <b className="relative inline-block min-w-[55px]" style={loginStyle}>
        Login</b>
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  propTextDecoration: PropTypes.string,
  propFontWeight: PropTypes.string,
};

export default Button;


