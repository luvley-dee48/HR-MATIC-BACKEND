import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import logo from '../assets/images/Logo.png';




const FrameComponent1 = ({ className = '' }) => {
  return (
    <header className={`self-stretch bg-mediumpurple-200 flex flex-row items-start justify-center pt-3 px-12 pb-[12.9px] ${className}`}>
      <img
        className="h-[50px] w-[50px] rounded-[30px] object-contain"
        loading="lazy"
        alt="Logo"
        src={logo}
      />
      <div className="flex flex-col items-start justify-start pt-[13px] pb-0 pl-0 pr-1.5">
        <div className="flex flex-row items-start justify-start gap-[19.7px] mq1050:hidden">
          <a className="relative text-[inherit] whitespace-nowrap">HR Matic Solutions</a>
          <a className="relative text-[inherit] inline-block min-w-[94px] whitespace-nowrap">About Us</a>
          <a className="relative text-[inherit] whitespace-nowrap">Who We Serve</a>
          <a className="relative text-[inherit] inline-block min-w-[107px] whitespace-nowrap">Contact Us</a>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
        <Button propTextDecoration="none" propFontWeight="700" />
      </div>
    </header>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
