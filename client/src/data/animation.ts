export const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

export const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const rightSlideVariant = {
  hidden: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
};
