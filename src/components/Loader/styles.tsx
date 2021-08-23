import styled from "styled-components";

export const StyledContainerLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: ${props => props.theme.colors.darkBluePrimary}; */
  background: #01081d;
`;

export const StyledLoader = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  /* background: ${props => `linear-gradient(45deg, transparent,
    transparent, 40%, ${props.theme.colors.primary})`}; */
  background: linear-gradient(45deg, transparent,
    transparent, 40%, #00c92c);

  animation: animateLoader 1s linear infinite;

  @keyframes animateLoader {
    0% {
      transform: rotate(0deg);
      filter: hue-rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(0deg);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    /* background: ${props => props.theme.colors.darkBluePrimary}; */
    background: #01081d;
    border-radius: 50%;
    z-index: 1000;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    /* background: ${props => `linear-gradient(45deg, transparent,
      transparent, 40%, ${props.theme.colors.primary})`}; */
    background: linear-gradient(45deg, transparent,
      transparent, 40%, #00c92c);
    border-radius: 50%;
    z-index: 1000;
    z-index: 1;
    filter: blur(30px);
  }
`;
