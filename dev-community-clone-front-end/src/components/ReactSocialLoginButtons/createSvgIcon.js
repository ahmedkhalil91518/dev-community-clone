import React from 'react';

// eslint-disable-next-line
const createSvgIcon = Component => ({ size, color }) => {

  function Image (props) {
    return <img src={Component} {...props} alt=""/>;
  }

  // URL has been given
  if (typeof Component === 'string') {

    return createSvgIcon(Image);
  }
  return <Component width={size} height={size} color={color} />;
};

export default createSvgIcon;
