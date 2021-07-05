import styled from "styled-components";

export const StyledMinifiedDevCard = styled.a`
  width: 100%;
  height: 100%;
  max-width: 14.125rem;
  padding: 2.5rem 1.5rem;
  margin: 0 auto;

  background: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  box-shadow: 2px 4px 24px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.04),
      0px 9px 46px rgba(0, 0, 0, 0.02), 0px 11px 15px rgba(0, 0, 0, 0.09);
    filter: brightness(1);
  }

  header {
    margin-bottom: 1rem;
  }

  header > img {
    width: 4.375rem;
    border-radius: 50%;
  }

  strong {
    font: ${(props) => props.theme.fonts.heading500};
    color: ${(props) => props.theme.colors.subtitle};
    margin-bottom: 1rem;
  }

  footer {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.primary300};
    gap: 0.5rem;

    svg {
      font-size: 1.5rem;
    }

    span {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 574px) {
    width: 90vw;
    max-width: 80vw;
    padding: 1.5rem 1rem;
  }
`;
