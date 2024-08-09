
import PropTypes from 'prop-types';

const Button = ({ propTextDecoration, propFontWeight, buttonPosition, buttonWidth, login, loginMinWidth }) => {
  return (
    <button
      style={{ textDecoration: propTextDecoration, fontWeight: propFontWeight, width: buttonWidth, minWidth: loginMinWidth }}
      className={`py-2 px-4 rounded bg-mediumpurple-100-90 text-white`}
    >
      {login}
    </button>
  );
};

Button.propTypes = {
  propTextDecoration: PropTypes.string,
  propFontWeight: PropTypes.string,
  buttonPosition: PropTypes.string,
  buttonWidth: PropTypes.string,
  login: PropTypes.string,
  loginMinWidth: PropTypes.string,
};

export default Button;

