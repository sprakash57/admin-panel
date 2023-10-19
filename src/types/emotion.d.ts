import { TextVariants } from 'theme/typography';

declare module '@emotion/react' {
  interface TextVariantsStyle {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    letterSpacing: string;
  }
  export interface Theme {
    text: {
      fontWeight: {
        bold: number;
        semiBold: number;
        normal: number;
      };
      variants: Record<TextVariants, TextVariantsStyle>;
    };
  }
}
