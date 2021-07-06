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

    if(username) {
      query = query+`${username} in:name `;
    }

    if(location) {
      query = query+`location:${location} `;
    }

    if(language) {
      query = query+`language:${language} `;
    }

    const result = await githubAPI.get(`search/users`, {
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
            placeholder="Put a name of a developer"
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
              placeholder="ex: JavaScript"
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
