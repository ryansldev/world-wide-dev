import { InputHTMLAttributes } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { StyledSearchBar } from "./styles";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  filterButtonShow: Function;
};

export function SearchBar({ filterButtonShow, ...rest }: SearchBarProps) {
  return (
    <StyledSearchBar>
      <input {...rest} />
      <button type="button" onClick={() => filterButtonShow()}>
        <RiUserSearchLine />
      </button>
    </StyledSearchBar>
  );
}
