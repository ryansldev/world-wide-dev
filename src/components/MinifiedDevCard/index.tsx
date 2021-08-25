import Link from "next/link";
import { FiUserCheck } from "react-icons/fi";
import { StyledMinifiedDevCard, NotFollowSpan } from "./styles";

type MinifiedDevCardProps = {
  login: string;
  html_url: string;
  avatar_url: string;
  followBack?: boolean;
  registered?: boolean;
};

export function MinifiedDevCard({
  login,
  avatar_url,
  followBack = undefined,
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

          <footer>
            {registered && (
              <>
                <FiUserCheck />
                <span>Signed User</span>
              </>
            )}
            {followBack !== undefined && (
              <>
                { followBack ? <span>Follow you</span> : <NotFollowSpan>Does not follow you</NotFollowSpan> }
              </>
            )}
          </footer>
        </StyledMinifiedDevCard>
      </Link>
    </article>
  );
}
