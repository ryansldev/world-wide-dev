import styled from "styled-components";

export const Main = styled.main`
  margin-top: 3.75rem;
  text-align: center;

  > .container {
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;

    > a {
      img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 1rem;
      }

      > h1 {
        color: ${(props) => props.theme.colors.subtitle};
      }

      > h2 {
        font: ${(props) => props.theme.fonts.subtitle};
        color: ${(props) => props.theme.colors.subtitle};
        margin-bottom: 1.875rem;
      }

      &:hover {
        filter: none;
      }
    }

    > p {
      max-width: 20rem;
      margin: 0 auto;
    }

    > .more-infos {
      display: flex;
      flex-direction: column;

      width: 100%;
      max-width: 17rem;
      margin: 0 auto;
      margin-top: 2.5rem;

      gap: 1rem;
      color: ${(props) => props.theme.colors.primary};

      > div  {
        display: flex;
        align-items: center;
        gap: 1.125rem;

        svg {
          flex: 1;
          max-width: 1.5rem;
          font-size: 1.5rem;
        }

        > a, span {
          flex: 1;
          text-align: left;
          font-weight: 400;
          color: ${(props) => props.theme.colors.primary};
        }

        > a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            filter: none;
            color: ${(props) => props.theme.colors.primary};
          }
        }
      }
    }
  }
`

export const Title = styled.h1`
  margin-top: 7.5rem;
  font: ${(props) => props.theme.fonts.heading400};
  color: ${(props) => props.theme.colors.subtitle};
  font-size: 2rem;

  strong {
    font-size: 2rem;
  }
`;