import { InputHTMLAttributes } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { StyledSearchBar } from "./styles";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {};

export function SearchBar({ ...rest }: SearchBarProps) {
  return (
    <StyledSearchBar>
      <input {...rest} />
      <RiUserSearchLine />
    </StyledSearchBar>
  );
}
