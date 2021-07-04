import styled from "styled-components";

export const StyledMinifiedDevCard = styled.header`
  width: 100%;
  height: 100%;
  max-width: 15.625rem;
  padding: 2.5rem 0px;

  background: ${(props) => props.theme.colors.white};
  border-radius: .5rem;
  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.07), 0px 9px 46px rgba(0, 0, 0, 0.05), 0px 11px 15px rgba(0, 0, 0, 0.13);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  & > img {
    width: 4.375rem;
    border-radius: 50%;
  }

  & > div {
    display: flex;
    flex-direction: column;

    a {
      font-size: 1.125rem;
      color: ${(props) => props.theme.colors.subtitle};
    }

    span {
      display: flex;
      align-items: center;
      gap: 0.3125rem;
      color: ${(props) => props.theme.colors.primary300};

      svg {
        font-size: 1.5rem;
      }
    }
  }
`;
