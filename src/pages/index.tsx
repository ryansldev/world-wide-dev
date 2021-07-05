import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

import { HomeStyled } from '../styles/Home';

import { Header } from '../components/Header';
import { LoginButton } from '../components/LoginButton';

export default function Home() {
  const router = useRouter();
  const { user, signWithGithub } = useAuth();

  async function handleSignWithGithub() {
    if(!user) {
      await signWithGithub();
    }

    router.push('/dashboard');
  }

  return (
    <HomeStyled>
      <Head>
        <title>WWD - world wide dev</title>
      </Head>
      <Header />
      <div className="container">
        <LoginButton onClick={handleSignWithGithub} />
        <p>
          Connect with other devs, learn
          <br />
          with other developers! :D
        </p>
      </div>
    </HomeStyled>
  );
}
