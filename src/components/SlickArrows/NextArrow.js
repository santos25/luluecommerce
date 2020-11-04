import React from "react";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
        marginRight: 35,
        fontSize: 20,
        zIndex: 5,
      }}
      onClick={onClick}
    />
  );
};

export default NextArrow;
