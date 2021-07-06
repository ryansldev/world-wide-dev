import { ReactNode, FormHTMLAttributes } from 'react';

import { StyledSearchForm } from './styles';

type SearchFormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  showFilter: boolean;
}

export function SearchForm({ children, ...rest }: SearchFormProps) {
  return (
    <StyledSearchForm { ...rest }>
      { children }
    </StyledSearchForm>
  )
}
