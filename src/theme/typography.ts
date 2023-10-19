export enum TextVariants {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  S1 = 'S1',
  S2 = 'S2',
}
/**
 * Bold: 700, Semi-Bold: 600, Normal: 500
 */
export const fontWeight = {
  bold: 700,
  semiBold: 600,
  normal: 500,
};

export const variants = {
  [TextVariants.H1]: {
    fontSize: '3.2rem',
    fontWeight: 700,
    lineHeight: '2rem',
    letterSpacing: '0rem',
  },
  [TextVariants.H2]: {
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: '1.6rem',
    letterSpacing: '0rem',
  },
  [TextVariants.H3]: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '1.4rem',
    letterSpacing: '0.01rem',
  },
  [TextVariants.P1]: {
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '1rem',
    letterSpacing: '0.01rem',
  },
  [TextVariants.P2]: {
    fontSize: '1.4rem',
    fontWeight: 600,
    lineHeight: '0.8rem',
    letterSpacing: '0.01rem',
  },
  [TextVariants.P3]: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '0.6rem',
    letterSpacing: '0.01rem',
  },
  [TextVariants.S1]: {
    fontSize: '1.2rem',
    fontWeight: 600,
    lineHeight: '0.6rem',
    letterSpacing: '0rem',
  },
  [TextVariants.S2]: {
    fontSize: '0.8rem',
    fontWeight: 500,
    lineHeight: '0rem',
    letterSpacing: '0rem',
  },
};
