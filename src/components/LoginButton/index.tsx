import { ButtonHTMLAttributes } from 'react';
import { FaGithub } from 'react-icons/fa';
import { StyledLoginButton } from "./styles";

export function LoginButton({...rest}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledLoginButton
      {...rest}
    >
      <FaGithub />
      <span>SigIn with your GitHub</span>
    </StyledLoginButton>
  )
}
