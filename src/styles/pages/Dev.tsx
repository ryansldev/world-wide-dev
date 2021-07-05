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
        border: 4px solid ${(props) => props.theme.colors.primary};
        margin-bottom: 1rem;
      }

      > h1 {
        color: ${(props) => props.theme.colors.primary};
      }

      > h2 {
        font: ${(props) => props.theme.fonts.subtitle};
        color: ${(props) => props.theme.colors.primary400};
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
      color: ${(props) => props.theme.colors.primary300};

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
        }

        > a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            color: ${(props) => props.theme.colors.primary300};
            filter: none;
          }
        }
      }
    }

    > section {
      margin-top: 7.5rem;
      color: ${(props) => props.theme.colors.primary400};

      > span {
        font: ${(props) => props.theme.fonts.heading400};
        font-size: 2rem;

        strong {
          font-size: 2rem;
        }
      }

      > div {
        max-width: 90vw;
        width: 73.125rem;

        margin: 3.75rem 0;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16.125rem, auto));
        justify-content: center;
        gap: 1.5rem 0;

        @media (max-width: 572px) {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`
