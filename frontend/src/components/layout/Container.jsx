'use client';

import React from "react";


const Container  = ({ children, className = "" }) => {
  return (
    <div
      className={`
        max-w-[2200px]
        mx-auto
        md:px-12
        sm:px-2
        px-4
        h-full
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
