import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 25rem;
  background-color: ${(props) => props.theme.colors.darkBluePrimary};

  @media (max-width: 512px) {
    height: 20rem;
  }

  & > div {
    width: 100%;
    height: 100%;
    max-width: 90vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    a:hover {
      filter: brightness(1.1);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
