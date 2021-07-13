import { InputHTMLAttributes } from "react";
import { StyledFilterInput } from './styles';

type FilterInputProps = InputHTMLAttributes<HTMLInputElement> & {
  htmlFor: string;
  labelTitle: string;
};

export function FilterInput({ htmlFor, labelTitle, ...rest }: FilterInputProps) {
  return (
    <StyledFilterInput htmlFor={htmlFor}>
      Which {labelTitle} do you want to filter your search?
      <input
        {...rest}
      />
    </StyledFilterInput>
  )
}
