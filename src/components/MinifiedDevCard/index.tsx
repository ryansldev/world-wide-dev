import Link from "next/link";
import { FiUserCheck } from "react-icons/fi";
import { StyledMinifiedDevCard } from "./styles";

type MinifiedDevCardProps = {
  login: string;
  html_url: string;
  avatar_url: string;
  registered?: boolean;
};

export function MinifiedDevCard({
  login,
  avatar_url,
  registered = false,
}: MinifiedDevCardProps) {
  return (
    <article>
      <Link href={`/dev/${login}`} passHref={true}>
        <StyledMinifiedDevCard>
          <header>
            <img src={avatar_url} alt={login} />
          </header>

          <strong>@{login}</strong>

          {registered && (
            <footer>
              <FiUserCheck />
              <span>Signed User</span>
            </footer>
          )}
        </StyledMinifiedDevCard>
      </Link>
    </article>
  );
}
