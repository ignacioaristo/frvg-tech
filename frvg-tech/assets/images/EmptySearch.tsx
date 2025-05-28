import React from "react";
import Svg, { Path } from "react-native-svg";

export const EmptySearch = () => {
  return (
    <Svg width="150" height="150" viewBox="0 -0.5 25 25" fill="none">
      <Path
        clipRule="evenodd"
        d="M5.5 11.493a6.5 6.5 0 1113 .015 6.5 6.5 0 01-13-.015z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.062 16.568l3.438 3.425"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.53 8.963a.75.75 0 10-1.06 1.06l1.06-1.06zm.94 3.06a.75.75 0 101.06-1.06l-1.06 1.06zm1.06-1.06a.75.75 0 10-1.06 1.06l1.06-1.06zm.94 3.06a.75.75 0 101.06-1.06l-1.06 1.06zm-.94-2a.75.75 0 00-1.06-1.06l1.06 1.06zm-3.06.94a.75.75 0 001.06 1.06l-1.06-1.06zm2-2a.75.75 0 001.06 1.06l-1.06-1.06zm3.06-.94a.75.75 0 00-1.06-1.06l1.06 1.06zm-5.06 0l2 2 1.06-1.06-2-2-1.06 1.06zm2 2l2 2 1.06-1.06-2-2-1.06 1.06zm0-1.06l-2 2 1.06 1.06 2-2-1.06-1.06zm1.06 1.06l2-2-1.06-1.06-2 2 1.06 1.06z"
        fill="#000"
      />
    </Svg>
  );
};
