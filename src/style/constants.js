export const screenSizes = {
  mobile: 475,
  tablet: 768,
  miniLaptop: 1000,
  laptop: 1440,
};

export const devices = {
  mobile: `(max-width: ${screenSizes.mobile}px)`,
  tablet: `(max-width: ${screenSizes.tablet}px)`,
  miniLaptop: `(max-width: ${screenSizes.miniLaptop}px)`,
  laptop: `(max-width: ${screenSizes.laptop}px)`,
  desktop: `(min-width: ${screenSizes.laptop}px)`,
};
