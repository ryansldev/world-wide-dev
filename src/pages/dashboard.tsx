import { GetStaticProps } from "next";
import Head from "next/head";

import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { api as githubAPI } from "../services/github";

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { FilterInput } from '../components/FilterInput';
import { MinifiedDevCard } from "../components/MinifiedDevCard";
import { DevCard } from "../components/DevCard";
import { SearchForm } from "../components/SearchForm";

import { Main } from "../styles/pages/Dashboard";

type User = {
  id: string;
  login: string;
  html_url: string;
  avatar_url?: string;
  registered?: boolean;
};

type dashboardProps = {
  usersIds: string[]; // static props
}

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export default function Home({ usersIds }: dashboardProps) {
  const { user, githubApiInfo, getGithubRequestsInfo } = useAuth();
  const [devs, setDevs] = useState<User[]>([]);
  const [isLoadingDevs, setIsLoadingDevs] = useState(false);
  const [isLoadingRecommendedDevs, setIsLoadingRecommendedDevs] = useState(false);

  /* FORM */
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [recommendedDevs, setRecommendedDevs] = useState([]);

  useEffect(() => {
    getGithubRequestsInfo();
  }, [])

  async function handleSearchRecommendedUsers(event: FormEvent) {
    event.preventDefault();
    setIsLoadingRecommendedDevs(true);

    if(githubApiInfo.remaining < 15) {
      toast.error("it takes at least fifteen nodes", {
        style: {
          background: "#F56565",
          color: "#FFF",
          fontFamily: "Poppins, sans-serif"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#F56565"
        }
      });

      return;
    }

    function shuffleArray(arr) {
      // Loop em todos os elementos
      for (let i = arr.length - 1; i > 0; i--) {
              // Escolhendo elemento aleatório
          const j = Math.floor(Math.random() * (i + 1));
          // Reposicionando elemento
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      // Retornando array com aleatoriedade
      return arr;
    }

    const token = sessionStorage.getItem('access_token');
    const { data: followingDevs } = await githubAPI.get(`/users/${user.login}/following`, {
      headers: {
        Authorization: `${token ? `token ${token}` : ''}`,
      },
      params: {
        per_page: 100,
      }
    });

    async function filterFollowingDevs(dev) {
      if(dev) {
        const { data } = await githubAPI.get(`/users/${dev.login}/following`, {
          headers: {
            Authorization: `${token ? `token ${token}` : ''}`,
          },
        });

        if(data.length >= 10) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    const filteredFollowingDevs = followingDevs.filter((dev) => filterFollowingDevs(dev));

    const shuffleredFollowingDevs = shuffleArray(filteredFollowingDevs);
    const followedDevs = [
      shuffleredFollowingDevs[0],
      shuffleredFollowingDevs[1],
      shuffleredFollowingDevs[2],
      shuffleredFollowingDevs[3],
      shuffleredFollowingDevs[4]
    ];

    const parsedFollowedDevsOfTheFollowedDevs = await Promise.all(
      followedDevs.map(async (dev) => {
        const { data } = await githubAPI.get(`/users/${dev.login}/following`, {
          headers: {
            Authorization: `${token ? `token ${token}` : ''}`,
          },
        });

        function filterFollowedDevsOfTheFollowedDevs(dev) {
          const listOfFollowedDevs = [];
          followingDevs.map((followedDev) => {
            if(followedDev.login === dev.login) {
              listOfFollowedDevs.push(followedDev.login);
            }
          });

          console.log(listOfFollowedDevs, listOfFollowedDevs.includes(dev.login));

          if(listOfFollowedDevs.includes(dev.login)) {
            return false;
          } else {
            return dev.login !== user.login;
          }
        }

        const filteredFollowedDevsOfTheFollowedDevs = data.filter((dev) => filterFollowedDevsOfTheFollowedDevs(dev));
        const followedDevsOfTheFollowedDevs = filteredFollowedDevsOfTheFollowedDevs.reduce((unico, item) => {
          return unico.includes(item) ? unico : [...unico, item];
        }, []);

        if(followedDevsOfTheFollowedDevs.length >= 3) {
          const shuffleData = shuffleArray(followedDevsOfTheFollowedDevs);
          return [shuffleData[0], shuffleData[1], shuffleData[2]];
        }

        return followedDevsOfTheFollowedDevs;
      })
    );

    const followedDevsOfTheFollowedDevs = [];
    await parsedFollowedDevsOfTheFollowedDevs.map((element) => {
      element.map((dev) => {
        followedDevsOfTheFollowedDevs.push(dev);
      })

      return;
    });

    const filteredFollowedDevsOfTheFollowedDevs = followedDevsOfTheFollowedDevs.filter((dev, i) => {
      return followedDevsOfTheFollowedDevs.indexOf(dev) === i;
    });

    const parsedRecommendedDevsList = await filteredFollowedDevsOfTheFollowedDevs.map((dev) => {
      return dev;
    });

    const getFullInfoProfile = async (dev: any) => {
      const { data } = await githubAPI.get(`/users/${dev.login}`, {
        headers: {
          Authorization: `${token ? `token ${token}` : ''}`,
        },
      });

      if(data.blog && !data.blog.includes('://')) {
        data.blog = (`https://${data.blog}`);
      };

      return data;
    }

    const listOfRecommendedDevs = await Promise.all(
      parsedRecommendedDevsList.map(async (dev) => await getFullInfoProfile(dev))
    );

    setRecommendedDevs(listOfRecommendedDevs);
    getGithubRequestsInfo();
    setIsLoadingRecommendedDevs(false);
  }

  async function handleSearchUser(event: FormEvent) {
    event.preventDefault();
    setIsLoadingDevs(true);

    var query: string = '';
    const token = sessionStorage.getItem('access_token');

    if (username.includes('@')) {
      query = query + `${username.substring(1).trim()} in:login`
    } else {
      query = query + `${username.trim()} in:name `;
    }

    if (location) {
      query = query + `location:${location.trim()} `;
    }

    if (language) {
      query = query + `language:${language.trim()} `;
    }

    const result = await githubAPI.get(`search/users`, {
      headers: {
        Authorization: `${token ? `token ${token}` : ''}`,
      },
      params: {
        q: query,
      },
    });

    const usersResponseData = result?.data?.items as User[];

    if (!usersResponseData || usersResponseData?.length === 0) {
      setDevs([]);
      return;
    }

    if (!usersIds) {
      setDevs(usersResponseData);
      return;
    }

    const users = usersResponseData.map((user) => {
      usersIds.includes(user.id) ? user.registered = true : user.registered = false;
      return user;
    });

    setDevs(users);
    setIsLoadingDevs(false);
  }

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  return (
    <>
      <Head>
        <title>WWD - dashboard</title>
      </Head>
      <Header />
      <Main>
        <SearchForm showFilter={showFilter} onSubmit={handleSearchUser}>
          <SearchBar
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            filterButtonShow={handleShowFilter}
            placeholder="Put a name of a developer or @username"
          />
          <div className="box-filter">
            <FilterInput
              type="text"
              id="location"
              name="location"
              htmlFor="location"
              placeholder="ex: Brazil"
              onChange={(event) => setLocation(event.target.value)}
              value={location}
              labelTitle={'localização'}
            />
            <FilterInput
              type="text"
              id="language"
              name="language"
              htmlFor="language"
              placeholder="ex: JavaScript(Devs que utilizam majoritariamente)"
              onChange={(event) => setLanguage(event.target.value)}
              value={language}
              labelTitle={'linguagem'}
            />
            <button type="submit">
              Filtrar pesquisa
            </button>
          </div>
        </SearchForm>

        <section>
          {devs.map((dev) => {
            return (
              <MinifiedDevCard
                key={dev.id}
                login={dev.login}
                avatar_url={dev.avatar_url}
                html_url={dev.html_url}
                registered={dev.registered}
              />
            );
          })}

          {
            isLoadingDevs && (
              <>
                <Skeleton width={258} height={214} />
                <Skeleton width={258} height={214} />
                <Skeleton width={258} height={214} />
                <Skeleton width={258} height={214} />
              </>
            )
          }
        </section>
        <section className="recommended-devs-section">
          {recommendedDevs && recommendedDevs !== [] && recommendedDevs.map((dev, key) => {
            return (
              <DevCard
                key={key}
                login={dev?.login}
                avatar_url={dev?.avatar_url}
                html_url={dev?.html_url}
                blog={dev?.blog}
                name={dev?.name}
                location={dev?.location}
                // registered={dev.registered}
              />
            )
          })}

          {
            isLoadingRecommendedDevs && (
              <>
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
              </>
            )
          }
        </section>
        { user && <button type="button" onClick={handleSearchRecommendedUsers}>Pesquisa recomendada</button> }
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      usersIds,
    },
    revalidate: 60,
  };
};
