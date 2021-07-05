import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FiMapPin, FiLink, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { Header } from '../../components/Header';
import { MinifiedDevCard } from '../../components/MinifiedDevCard';

import { api as githubAPI } from '../../services/github';

import { Main } from '../../styles/pages/Dev';

type DevQueryParams = {
  login?: string,
}

type Dev = {
  id?: string;
  name?: string;
  login?: string;
  html_url?: string;
  avatar_url?: string;
  bio?: string,
  location?: string;
  blog?: string;
  email?: string;
  twitter_username?: string;
}

type Following = {
  id: string;
  login: string;
  html_url?: string;
  avatar_url?: string;
}

export default function Dev() {
  const router = useRouter();
  const { login }: DevQueryParams = router.query;
  const [dev, setDev] = useState<Dev>({});
  const [following, setFollowing] = useState<Following[]>([]);

  useEffect(() => {
    if (!login) {
      return;
    }

    async function devData() {
      const { data: devData } = await githubAPI.get(`/users/${login}`);
      if(!devData.blog.includes('https://')) {
        devData.blog = (`https://${devData.blog}`);
      };
      const { data: followingData } = await githubAPI.get(`/users/${login}/following`);
      setDev(devData);
      setFollowing(followingData);
    }

    devData();
  }, [login]);

  return (
    <>
      <Head>
        <title>{`${dev.name ? `${dev.name}` : 'Dev'} | WWD`}</title>
      </Head>
      <Header />
      <Main>
        <div className="container">
          <a href={dev.html_url} target="_blank" rel="noopener noreferrer">
            <img src={dev.avatar_url} alt={dev.name} />
            <h1>{dev.name}</h1>
            <h2>@{login}</h2>
          </a>
          <p>{dev.bio}</p>
          <div className="more-infos">
            {dev.location &&
              <div>
                <FiMapPin />
                <span>{dev.location}</span>
              </div>
            }
            {dev.html_url &&
              <div>
                <FiGithub />
                <a href={dev.html_url} target="_blank" rel="noopener noreferrer">
                  {dev.html_url}
                </a>
              </div>
            }
            {dev.blog &&
              <div>
                <FiLink />
                <a href={dev.blog} target="_blank" rel="noopener noreferrer">
                  {dev.blog}
                </a>
              </div>
            }
            {dev.email &&
              <div>
                <FiMail />
                <span>{dev.email}</span>
              </div>
            }
            {dev.twitter_username &&
              <div>
                <FiTwitter />
                <a href={`https://twitter.com/${dev.twitter_username}`} target="_blank" rel="noopener noreferrer">
                  @{dev.twitter_username}
                </a>
              </div>
            }
          </div>
          <section className="following">
            {following !== [] ? <span>Quem <strong>{dev.name}</strong> segue?</span> : <span><strong>{dev.name}</strong> ainda não segue ninguém</span>}
            <div>
              {following.map((dev) => {
                return (
                  <MinifiedDevCard
                    key={dev.id}
                    login={dev.login}
                    avatar_url={dev.avatar_url}
                    html_url={dev.html_url}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </Main>
    </>
  )
}
