import { FiUserCheck } from 'react-icons/fi';
import { StyledMinifiedDevCard } from './styles';

type MinifiedDevCardProps = {
  login: string,
  html_url: string,
  avatar_url: string,
  verified_user?: boolean,
}

export function MinifiedDevCard({ login, avatar_url, html_url, verified_user = false }: MinifiedDevCardProps) {
  return (
    <StyledMinifiedDevCard>
      <img src={avatar_url} alt={login} />
      <div>
        <a href={html_url}>@{login}</a>
        {verified_user && <span><FiUserCheck /> Signed User</span>}
      </div>
    </StyledMinifiedDevCard>
  )
}
