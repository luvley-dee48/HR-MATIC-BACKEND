import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const FrameComponent = ({ className = '', envelopeSolid1, email, propWidth, propColor }) => {
  const frameDivStyle = useMemo(() => {
    return { width: propWidth };
  }, [propWidth]);

  const emailStyle = useMemo(() => {
    return { color: propColor };
  }, [propColor]);

  return (
    <div className={`w-[410px] flex flex-row items-start justify-end pt-0 px-[25px] pb-[22px] ${className}`}>
      <div className="flex-1 rounded-xl bg-gainsboro border border-solid border-mediumpurple-100 flex flex-col items-start justify-start pt-3 px-0 pb-0 gap-3.5">
        <div className="self-stretch h-[52px] relative rounded-xl bg-gainsboro border border-solid border-mediumpurple-100 hidden" />
        <div className="w-[146px] flex flex-row items-start justify-start py-0 px-[18px]" style={frameDivStyle}>
          <div className="flex-1 flex flex-row items-start justify-start gap-[5px]">
            <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
              <img
                className="w-5 h-5"
                loading="lazy"
                alt=""
                src={envelopeSolid1}
              />
            </div>
            <b className="flex-1 relative" style={emailStyle}>
              {email}
            </b>
          </div>
        </div>
        <div className="self-stretch h-px relative rounded-xl bg-mediumpurple-300" />
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  envelopeSolid1: PropTypes.string,
  email: PropTypes.string,
  propWidth: PropTypes.any,
  propColor: PropTypes.any,
};

export default FrameComponent;
