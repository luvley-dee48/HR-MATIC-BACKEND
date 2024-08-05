import React from 'react';
import FrameComponent1 from './FrameComponent1';
import GroupComponent from './GroupComponent';

const LoginPage = () => {
  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start pt-2.5 px-0 pb-[233px] gap-[133px]">
      <FrameComponent1 />
      <section className="self-stretch flex flex-row items-start justify-center py-0 px-5">
        <GroupComponent />
      </section>
    </div>
  );
};

export default LoginPage;
