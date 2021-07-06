import { InputHTMLAttributes } from "react";
import { StyledFilterInput } from './styles';

type FilterInputProps = InputHTMLAttributes<HTMLInputElement> & {
  htmlFor: string;
  labelTitle: string;
};

export function FilterInput({ htmlFor, labelTitle, ...rest }: FilterInputProps) {
  return (
    <StyledFilterInput htmlFor={htmlFor}>
      Por qual {labelTitle} deseja filtrar sua busca?
      <input
        {...rest}
      />
    </StyledFilterInput>
  )
}
