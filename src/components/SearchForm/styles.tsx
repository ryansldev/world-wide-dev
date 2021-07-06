import styled from "styled-components";

type SearchFormStyledProps = {
  showFilter: boolean;
}

export const StyledSearchForm = styled.form<SearchFormStyledProps>`
  > div.box-filter {
    margin-top: 2rem;
    display: ${(props) => props.showFilter ? 'grid' : 'none'};
    gap: 2.5rem;

    width: 30rem;
    max-width: 100%;
    height: 100%;
    padding: 3.175rem 1.875rem;
    border-radius: .5rem;
    background: ${(props) => props.showFilter ? "#FFF" : "#000"};
    box-shadow: 0px 4px 24px rgba(97, 84, 84, 0.15);
    transition: box-shadow .2s;
    text-align: center;

    &:hover {
      box-shadow: 0px 4px 24px rgba(97, 84, 84, 0.25);
    }

    > button[type="submit"] {
      width: 100%;
      padding: 1rem;
      background: ${(props) => props.theme.colors.primary300};
      color: ${(props) => props.theme.colors.white};
      font: ${(props) => props.theme.fonts.heading500};

      border: 0;
      outline: 0;
      border-radius: .5rem;
      cursor: pointer;
      transition: .3s;

      &:hover {
        background: ${(props) => props.theme.colors.primary400};
      }
    }
  }
`
