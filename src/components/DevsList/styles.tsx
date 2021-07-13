import styled from "styled-components";

export const List = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    max-width: 90vw;
    width: 73.125rem;

    margin: 3.75rem 0;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.125rem, auto));
    justify-content: center;
    gap: 1.5rem 0;
  }
`;
