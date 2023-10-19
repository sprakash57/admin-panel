import React from 'react';
import { TextVariants } from 'theme/typography';
import styled from '@emotion/styled';

type VariantType = keyof typeof TextVariants;

export interface ITextField {
  variant: VariantType;
  children: React.ReactNode;
  className?: string;
  htmlTag?: 'p';
}

const StyledText = styled.div<{ variant: VariantType }>`
  line-height: ${({ theme, variant }) => theme.text.variants[variant].lineHeight};
  font-weight: ${({ theme, variant }) => theme.text.variants[variant].fontWeight};
  letter-spacing: ${({ theme, variant }) => theme.text.variants[variant].letterSpacing};
  font-size: ${({ theme, variant }) => theme.text.variants[variant].fontSize};
`;

export const TextField = ({ variant, children, className, htmlTag = 'p' }: ITextField) => {
  return (
    <StyledText as={htmlTag} className={className} variant={variant}>
      {children}
    </StyledText>
  );
};
