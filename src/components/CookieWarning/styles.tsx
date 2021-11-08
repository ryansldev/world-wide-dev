import styled from "styled-components";

export const Card = styled.div`
  height: 200px;
  width: 100%;

  position: fixed;
  right: 0;
  bottom: 0;
  padding: 0 1rem;
  opacity: 0.92;

  display: flex;
  align-items: center;

  background: ${(props) => props.theme.colors.darkBluePrimary};
`

export const CardContainer = styled.div`
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  background: ${(props) => props.theme.colors.darkBluePrimary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 1rem 2rem;
  width: 100%;
  max-width: 280px;
  color: ${(props) => props.theme.colors.primary};
  border-radius: .5em;
  margin-top: 1.5em;
  cursor: pointer;
  transition: .3s ease-in-out;

  font: ${(props) => props.theme.fonts.heading500};

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.darkBluePrimary};
  }
`
