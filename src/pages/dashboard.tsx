import Head from "next/head";
import { useState, FormEvent } from "react";

import { useAuth } from '../hooks/useAuth';
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
};

export default function Home() {
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

    if(username.includes('@')) {
      query = query+`${username.substring(1).trim()} in:login`
    } else {
      query = query+`${username.trim()} in:name `;
    }

    if(location) {
      query = query+`location:${location.trim()} `;
    }

    if(language) {
      query = query+`language:${language.trim()} `;
    }

    const result = await githubAPI.get(`search/users`, {
      headers: {
        Authorization: `${token ? `token ${token}` : ''}`,
      },
      params: {
        q: query,
      },
    });

    setDevs(result?.data?.items || []);
  }

  function handleShowFilter() {
    if(showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }

  return (
    <>
      <Head>
        <title>WWD - world wide dev</title>
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
              />
            );
          })}
        </section>
      </Main>
    </>
  );
}
