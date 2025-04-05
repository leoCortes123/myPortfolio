import React from 'react';
import Layer1 from './Layer1';
import Layer2 from './Layer2';
import Layer3 from './Layer3';
import Layer4 from './Layer4';
import Layer5 from './Layer5';
import Layer6 from './Layer6';


export default function Background({ viewBox = "0 0 1728 972", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      style={{
      }}
      {...props}
    >
      <Layer1 />
      <Layer2 />
      <Layer3 />
      <Layer4 />
      <Layer5 />
      <Layer6 />

    </svg>
  );
}
