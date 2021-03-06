import styled from "styled-components";

export const Card = styled.article`
  max-width: 18.75rem;
  width: 100%;
  height: 23rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.white};

  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.07),
    0px 9px 46px rgba(0, 0, 0, 0.05), 0px 11px 15px rgba(0, 0, 0, 0.13);

  display: flex;
  flex-direction: column;
  cursor: pointer;

  > img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    align-self: center;
    margin-top: -3.775rem;
  }

  > svg {
    position: absolute;
    margin-left: 15rem;
    margin-top: -0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme.colors.primary400};
  }
`;

export const Head = styled.header`
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.title};
  }

  a {
    z-index: 9999;
    color: ${(props) => props.theme.colors.subtitle};
    transition: color 0.3s;
    font-size: 0.875rem;

    &:hover {
      color: ${(props) => props.theme.colors.primary300};
      filter: none;
    }
  }
`;

export const Content = styled.div`
  margin-top: 2rem;
  width: 100%;
  text-align: center;

  > b {
    color: ${(props) => props.theme.colors.primary};
  }

  > p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    overflow:hidden;
    line-height: 1.5rem;
    max-height: 4.5rem;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
  }
`;

export const Footer = styled.footer`
  margin-top: 3rem;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    span,
    a {
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }

    &:last-child {
      color: ${(props) => props.theme.colors.primary400};
      transition: filter 0.2s;
    }
  }
`;
