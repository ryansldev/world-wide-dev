import Link from "next/link";
import { FiMapPin, FiLink, FiUserCheck } from "react-icons/fi";
import { Card, Head, Content, Footer } from "./styles";

type DevCardProps = {
  name: string;
  login: string;
  html_url: string;
  bio?: string;
  location?: string;
  blog?: string;
  avatar_url?: string;
  registered?: boolean;
};

export function DevCard({
  name,
  login,
  html_url,
  bio,
  location,
  blog,
  avatar_url,
  registered
}: DevCardProps) {
  return (
    <Link href={`/dev/${login}`} passHref={true}>
      <Card>
        <img src={avatar_url} alt={name} />

        <Head>
          <strong>{name}</strong>
          <a href={html_url} rel="noopener noreferrer" target="_blank">
            @{login}
          </a>
        </Head>

        {
          registered && <FiUserCheck />
        }

        <Content>
          <b>Biography</b>
          <p>{bio ? bio : 'This user does not have a biography on his github profile.'}</p>
        </Content>

        <Footer>
          <div>
            <FiMapPin size={18} />
            <span>{location ? location : 'Uninformed'}</span>
          </div>
          <div>
            <FiLink size={24} />
            <a href={blog} rel="noopener noreferrer" target="_blank">
              {blog ? blog : 'Uninformed'}
            </a>
          </div>
        </Footer>
      </Card>
    </Link>
  );
}
