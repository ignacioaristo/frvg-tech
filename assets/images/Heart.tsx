import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  isFavourite?: boolean;
  width?: number;
  height?: number;
};

export const Heart: React.FC<Props> = ({
  isFavourite = false,
  width = 50,
  height = 50,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={isFavourite ? "red" : "none"}
      stroke="red"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-heart-icon lucide-heart"
    >
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    </Svg>
  );
};
