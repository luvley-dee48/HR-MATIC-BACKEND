import React from 'react';
import FrameComponent from './FrameComponent';
import Button from './Button';
import PropTypes from 'prop-types';

const GroupComponent = ({ className = '' }) => {
  return (
    <div className={`w-[400px] shadow-lg rounded-xl bg-mediumpurple-100 flex flex-col items-end justify-start pt-5 pb-[60px] pl-[40px] pr-9 relative gap-10 ${className}`}>
      <div className="w-[470px] h-full absolute top-0 right-0 bottom-0 shadow rounded-xl bg-white" />
      <div className="self-stretch flex flex-col items-end justify-start gap-[18px]">
        <div className="w-[412px] flex flex-row items-start justify-center py-0 px-5">
          <div className="w-[188px] flex flex-col items-end justify-start gap-[9px]">
            <div className="self-stretch flex flex-row items-start justify-end py-0 px-[49px]">
              <img
                className="h-20 w-20 rounded-[33.9px] object-cover"
                loading="lazy"
                alt=""
                src="/logo-1@2x.png"
              />                                              bg-mediumpurple-100
            </div>
            <b className="self-stretch relative">LOGIN</b>
          </div>
        </div>
        <b className="self-stretch relative text-black">SIGN IN TO YOUR ACCOUNT</b>
      </div>
      <FrameComponent envelopeSolid1="/envelopesolid-1.svg" email="Email" />
      <FrameComponent
        envelopeSolid1="/keysolid-1.svg"
        email="Password"
        propWidth="170px"
        propColor="#000"
      />
      <div className="w-[406px] flex flex-row items-start justify-center text-left text-white">
        <Button />
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
