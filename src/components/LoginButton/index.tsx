import { FormEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import { StyledLoginButton } from "./styles";

export function LoginButton() {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <StyledLoginButton onSubmit={handleSubmit}>
      <button type="submit">
        <FaGithub />
        <span>SigIn with your GitHub</span>
      </button>
    </StyledLoginButton>
  )
}
