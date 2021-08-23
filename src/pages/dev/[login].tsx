import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FiMapPin, FiLink, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import { DevsList } from '../../components/DevsList';

import { api as githubAPI } from '../../services/github';

import { Main, Title, FollowButton } from '../../styles/pages/Dev';

type devPageProps = {
  usersIds: string[];
  staticUser: User;
}

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
  company?: string;
  twitter_username?: string;
}

type Following = {
  id: string;
  login: string;
  html_url?: string;
  avatar_url?: string;
}

export default function Dev({ usersIds, staticUser }: devPageProps) {
  const router = useRouter();
  const { login }: DevQueryParams = router.query;
  const [dev, setDev] = useState<Dev | null>(staticUser);
  const [following, setFollowing] = useState<Following[]>([]);
  const [isFollowed, setIsFollowed] = useState(false);

  const { user, getGithubRequestsInfo } = useAuth();

  useEffect(() => {
    getGithubRequestsInfo();
  }, [dev]);

  useEffect(() => {
    if (!login) {
      return;
    }

    async function devData() {
      const token = sessionStorage.getItem('access_token');

      if(!staticUser) {
        const { data: devData } = await githubAPI.get(`/users/${login}`, {
          headers: {
            Authorization: `${token ? `token ${token}` : ''}`,
          }
        });
        if(devData.blog && !devData.blog.includes('://')) {
          devData.blog = (`https://${devData.blog}`);
        };

        setDev(devData);
      }

      const { data: followingData } = await githubAPI.get(`/users/${login}/following`);

      followingData.map((follower) => usersIds.includes(follower.id) ? follower.registered = true : follower.registered = false);

      setFollowing(followingData);

      async function paginateFollowedDevs() {
        const { data } = await githubAPI.get(`/users/${user.login}/following?page=${count++}&per_page=100`, {
          headers: {
            Authorization: `${token ? `token ${token}` : ''}`
          },
        });

        if(data.length !== 0) {
          return true;
        } else {
          return false;
        }
      }

      if(token !== '' && user) {
        var count = 0;
        const listOfFollowedDevs = [];
        var isFollowedDev = false;

        while(await paginateFollowedDevs() === true) {
          const { data } = await githubAPI.get(`/users/${user.login}/following?page=${count++}&per_page=100`, {
            headers: {
              Authorization: `${token ? `token ${token}` : ''}`,
            },
          });

          listOfFollowedDevs.push(data);
          count++;
        };

        listOfFollowedDevs.map((element) => {
          if(isFollowedDev === false) {
            element.map((dev) => {
              if(dev && dev.login === login) {
                isFollowedDev = true;
              };
            });
          };
        });

        setIsFollowed(isFollowedDev);
      }
    }

    devData();
  }, [login, user]);

  async function handleFollowDev(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('access_token');
    if(!isFollowed) {
      await githubAPI({
        method: 'PUT',
        url: `/user/following/${dev.login}`,
        headers: {
          Authorization: `${token ? `token ${token}` : ''}`,
        },
      });

      setIsFollowed(true);
    } else {
      await githubAPI({
        method: 'DELETE',
        url: `/user/following/${dev.login}`,
        headers: {
          Authorization: `${token ? `token ${token}` : ''}`,
        },
      });

      setIsFollowed(false);
    }
  }

  return (
    <>
      <Head>
        <title>{`${dev?.name ? `${dev?.name}` : 'Dev'} | WWD`}</title>
      </Head>
      <Header />
      <Main>
        <div className="container">
          <a href={dev?.html_url} target="_blank" rel="noopener noreferrer">
            <img src={dev?.avatar_url} alt={dev?.name} />
            <h1>{dev?.name ? dev?.name : dev?.login}</h1>
            <h2>@{login}</h2>
          </a>
          <p>{dev?.bio}</p>
          <div className="more-infos">
            {dev?.location &&
              <div>
                <FiMapPin />
                <span>{dev?.location}</span>
              </div>
            }
            {dev?.html_url &&
              <div>
                <FiGithub />
                <a href={dev?.html_url} target="_blank" rel="noopener noreferrer">
                  {dev?.html_url}
                </a>
              </div>
            }
            {dev?.blog &&
              <div>
                <FiLink />
                <a href={dev?.blog} target="_blank" rel="noopener noreferrer">
                  {dev?.blog}
                </a>
              </div>
            }
            {dev?.email &&
              <div>
                <FiMail />
                <a href={`mailto:${dev?.email}`}>{dev?.email}</a>
              </div>
            }
            {dev?.company &&
              <div>
                <RiBuilding2Line />
                <span>{dev?.company}</span>
              </div>
            }
            {dev?.twitter_username &&
              <div>
                <FiTwitter />
                <a href={`https://twitter.com/${dev?.twitter_username}`} target="_blank" rel="noopener noreferrer">
                  @{dev?.twitter_username}
                </a>
              </div>
            }

            { user &&
              <FollowButton type="button" onClick={handleFollowDev} followed={isFollowed}>
                { !isFollowed ? `Follow @${dev?.login}` : `Unfollow @${dev?.login}` }
              </FollowButton>
            }
          </div>

          <DevsList devs={following}>
            {following.length !== 0 ? <Title>Who does <strong>{dev?.name ? dev?.name : dev?.login}</strong> follow?</Title> : <span><strong>{dev?.name}</strong> ainda não segue ninguém</span>}
          </DevsList>
        </div>
        <Footer />
      </Main>
    </>
  )
}

type User = {
  uid: string;
  githubId: string;
  login: string;
  name: string;
  avatar_url: string;
  email?: string;
  bio?: string;
  blog?: string;
  company?: string;
  location?: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const userRef = database.ref("users");
  const userSnap = await userRef.get();
  const usersFirebase = await userSnap.val() as User[];

  if(!usersFirebase || usersFirebase.length === 0) {
    return {
      paths: [],
      fallback: true,
    }
  }

  const users = Object.entries(usersFirebase).map(([key, value]) => value);

  const paths = users.map(user => {
    return {
      params: { login: user.login },
    };
  })

  return {
    paths: paths,
    fallback: true,
  };
};

type LoginStaticParams = {
  params: {
    login: string
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: LoginStaticParams) => {
  const userRef = database.ref("users");
  const userSnap = await userRef.get();
  const usersFirebase = await userSnap.val() as User[];

  if (!usersFirebase || usersFirebase.length === 0) {
    return {
      props: {},
      revalidate: 60,
    }
  }

  const users = Object.entries(usersFirebase).map(([key, value]) => value);

  const usersIds = users.map((user) => user.githubId);
  const user = users.find((user) => user.login === params.login);

  return {
    props: {
      usersIds,
      staticUser: user || null,
    },
    revalidate: 60,
  };
};
