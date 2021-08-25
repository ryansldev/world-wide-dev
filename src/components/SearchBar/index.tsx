import { InputHTMLAttributes, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { StyledSearchBar, StyledFilterButton, ContainerSearchBar } from "./styles";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  filterButtonShow: Function;
};

export function SearchBar({ filterButtonShow, ...rest }: SearchBarProps) {
  const [active, setActive] = useState(false)
  return (
    <ContainerSearchBar>
      <StyledSearchBar>
        <input {...rest} />
        <button type="submit">
          <FiSearch />
        </button>
      </StyledSearchBar>
      <StyledFilterButton
        type="button"
        style={ active ? { backgroundColor: '#00c972', color: 'white' } : { backgroundColor: `white`, color: '#00c972' } }
        onClick={() => {
          { !active ? setActive(true) : setActive(false) }
          filterButtonShow();
        }}
      >
        <RiUserSearchLine />
      </StyledFilterButton>
    </ContainerSearchBar>
  );
}
