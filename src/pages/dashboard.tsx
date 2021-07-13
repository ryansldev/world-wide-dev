import { GetStaticProps } from "next";
import Head from "next/head";
import { useState, FormEvent } from "react";

import { api as githubAPI } from "../services/github";

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { FilterInput } from '../components/FilterInput';
import { MinifiedDevCard } from "../components/MinifiedDevCard";
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

export default function Home({ usersIds }: dashboardProps) {
  const [devs, setDevs] = useState<User[]>([]);

  /* FORM */
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  async function handleSearchUser(event: FormEvent) {
    event.preventDefault();

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
        </section>
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
