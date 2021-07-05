import Head from "next/head";
import { useState, FormEvent } from "react";

import { api as githubAPI } from "../services/github";

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { MinifiedDevCard } from "../components/MinifiedDevCard";

import { Main } from "../styles/pages/Dashboard";

type User = {
  id: string;
  login: string;
  html_url: string;
  avatar_url?: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [devs, setDevs] = useState<User[]>([]);

  async function handleSearchUser(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const result = await githubAPI.get(`search/users`, {
      params: {
        q: `${search} in:name`,
      },
    });

    setDevs(result?.data?.items || []);
  }

  return (
    <>
      <Head>
        <title>WWD - world wide dev</title>
      </Head>
      <Header />
      <Main>
        <form action="GET" onSubmit={handleSearchUser}>
          <SearchBar
            type="text"
            placeholder="Put a name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>

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
