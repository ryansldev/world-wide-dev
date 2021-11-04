import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  padding: 2rem 3rem;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  margin-top: 11rem;

  background: ${(props) => props.theme.colors.darkBluePrimary};

  /* @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  } */
`;

export const StyledDiscordCommunity = styled.a`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary};
  }

  strong {
    font: ${props => props.theme.fonts.subtitle};
    color: ${props => props.theme.colors.placeholder};
  }
`;

export const Diviser = styled.div`
  height: 3rem;
  width: 1px;
  background: ${props => props.theme.colors.title};
`;
