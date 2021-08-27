import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link"

import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { api as githubAPI, searchDevs, isFollowingBack, followingDevs } from "../services/github";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { FilterInput } from '../components/FilterInput';
import { MinifiedDevCard } from "../components/MinifiedDevCard";
import { DevCard } from "../components/DevCard";
import { SearchForm } from "../components/SearchForm";

import { Main, ButtonDarshboardPage, SearchedDevsSection, RecommendedDevsSection, ActionSection } from "../styles/pages/Dashboard";

type User = {
  id: string;
  login: string;
  html_url: string;
  avatar_url?: string;
  followBack?: boolean;
  registered?: boolean;
};

type RecommendedDev = {
  id: string;
  login: string;
  bio: string;
  avatar_url: string;
  html_url?: string;
  blog: string;
  name: string;
  location?: string;
  registered?: boolean;
}

type dashboardProps = {
  usersIds: string[];
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
  const [devsThatFollowYou, setDevsThatFollowYou] = useState([]);

  useEffect(() => {
    getGithubRequestsInfo();
  }, [getGithubRequestsInfo]);

  useEffect(() => {
    var recommendedDevsList = [];
    if(sessionStorage.hasOwnProperty("WWD_RECOMMENDED_DEVS") && sessionStorage.getItem("WWD_RECOMMENDED_DEVS") !== '') {
      recommendedDevsList = JSON.parse(sessionStorage.getItem("WWD_RECOMMENDED_DEVS"));
    }

    setRecommendedDevs(recommendedDevsList);
  }, []);

  async function handleSearchRecommendedUsers(event: FormEvent) {
    event.preventDefault();
    document.body.scrollTop = 350; // For Safari
    document.documentElement.scrollTop = 350; // For Chrome, Firefox, IE and Opera
    setRecommendedDevs([]);
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
    const followingDevsArr = await followingDevs({ login: user.login, getAll: true, token });
    if(followingDevsArr.length === 0) {
      alert('Do you need follow some user to use this function, do you need to follow users that follow more than 10 other users too.');
      return;
    }

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

    const filteredFollowingDevs = followingDevsArr.filter((dev) => filterFollowingDevs(dev));

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
          followingDevsArr.map((followedDev) => {
            if(dev && followedDev.login === dev.login) {
              listOfFollowedDevs.push(followedDev.login);
            };
          });

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

    const RecommendedDevsListFiltered = listOfRecommendedDevs.map((dev) => {
      const filteredDevData = {
        id: dev.id,
        login: dev.login,
        bio: dev.bio,
        avatar_url: dev.avatar_url,
        html_url: dev.html_url,
        blog: dev.blog,
        name: dev.name,
        location: dev.location,
        registered: usersIds.includes(dev.id),
      } as RecommendedDev;

      return filteredDevData;
    });

    const listOfRecommendedDevsInJSON = JSON.stringify(RecommendedDevsListFiltered);
    sessionStorage.setItem('WWD_RECOMMENDED_DEVS', listOfRecommendedDevsInJSON);

    setRecommendedDevs(RecommendedDevsListFiltered);
    getGithubRequestsInfo();
    setIsLoadingRecommendedDevs(false);
  }

  async function handleSearchUser(event: FormEvent) {
    event.preventDefault();
    setDevs([]);
    setDevsThatFollowYou([]);
    setIsLoadingDevs(true);

    const token = sessionStorage.getItem('access_token');

    const result = await searchDevs({
      username,
      language,
      location,
      token
    });

    const usersResponseData = result?.data?.items as User[];

    if (!usersResponseData || usersResponseData?.length === 0) {
      setDevs([]);
      setIsLoadingDevs(false);
      alert('We have not found any developer who has the information provided. Try put others values.');
      return;
    }

    if (!usersIds) {
      setDevs(usersResponseData);
      return;
    }

    const users = await Promise.all(usersResponseData.map(async (dev) => {
      usersIds.includes(dev.id) ? dev.registered = true : dev.registered = false;
      return dev;
    }));

    setDevs(users);
    setIsLoadingDevs(false);
  }

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  async function handleIsFollowingDev() {
    setDevs([]);
    setDevsThatFollowYou([]);
    document.body.scrollTop = 350; // For Safari
    document.documentElement.scrollTop = 350; // For Chrome, Firefox, IE and Opera
    alert('Now you go see the info of the devs who you follow');
    setIsLoadingDevs(true);
    const token = sessionStorage.getItem('access_token');
    const listOfFollowedDevs = await followingDevs({ login: user.login, getAll: true, token });

    const usersThatFollowYou = await Promise.all(listOfFollowedDevs.map(async (dev) => {
      const response = await isFollowingBack({
        login: user.login,
        loginOfFollowed: dev.login,
        getAll: true,
        token
      });

      dev.followBack = response;
      if(usersIds) {
        usersIds.includes(dev.id) ? dev.registered = true : dev.registered = false;
      }
      return dev;
    }));

    setDevsThatFollowYou(usersThatFollowYou);
    setIsLoadingDevs(false);
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
              labelTitle={'location'}
            />
            <FilterInput
              type="text"
              id="language"
              name="language"
              htmlFor="language"
              placeholder="ex: JavaScript(Devs que utilizam majoritariamente)"
              onChange={(event) => setLanguage(event.target.value)}
              value={language}
              labelTitle={'language'}
            />
            <button type="submit">
              Filter Search
            </button>
          </div>
        </SearchForm>

        <SearchedDevsSection>
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

          {devsThatFollowYou.map((dev) => {
            return (
              <MinifiedDevCard
                key={dev.id}
                login={dev.login}
                avatar_url={dev.avatar_url}
                html_url={dev.html_url}
                registered={dev.registered}
                followBack={dev.followBack}
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
        </SearchedDevsSection>
        <RecommendedDevsSection>
          {recommendedDevs && recommendedDevs !== [] && recommendedDevs.map((dev, key) => {
            return (
              <DevCard
                key={key}
                login={dev?.login}
                bio={dev?.bio}
                avatar_url={dev?.avatar_url}
                html_url={dev?.html_url}
                blog={dev?.blog}
                name={dev?.name}
                location={dev?.location}
                registered={dev.registered}
              />
            )
          })}

          {
            isLoadingRecommendedDevs && (
              <>
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
                <Skeleton width={300} height={368} />
              </>
            )
          }
        </RecommendedDevsSection>
        { recommendedDevs.length === 0 && user && <h2>Make your recommended search of devs!</h2> }
        { recommendedDevs.length === 0 && !user && <h2>SignIn and search for recommended devs!</h2>}
        <ActionSection>
          { user &&
            <>
              <ButtonDarshboardPage type="button" onClick={handleSearchRecommendedUsers}>Recommended Search</ButtonDarshboardPage>
              <ButtonDarshboardPage type="button" onClick={handleIsFollowingDev}>Follow info</ButtonDarshboardPage>
            </>
          }
          {!user &&
            <Link href={'/'} passHref={true}>
              <ButtonDarshboardPage type="button">
                SignIn with your GitHub account
              </ButtonDarshboardPage>
            </Link>
          }
        </ActionSection>

        <Footer />
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
