import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

import toast from "react-hot-toast";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoginButton } from '../components/LoginButton';

import { HomeStyled } from '../styles/Home';

export default function Home() {
  const router = useRouter();
  const { signWithGithub, user } = useAuth();

  useEffect(() => {
    if(user) {
      router.push('/dashboard');
    };
  }, [router, user]);

  async function handleSignWithGithub() {
    try {
      await signWithGithub();

      toast.success("Welcome to W.W.D :)", {
        style: {
          background: "#00c972",
          color: "#FFF",
          fontFamily: "Poppins, sans-serif"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#00c972"
        }
      });

      router.push('/dashboard');
    } catch (error){
      toast.error(`${error}`, {
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
    }
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
        <br />
        <Link href={`/dashboard`} passHref={true}>
          Continue as ghost
        </Link>
      </div>
      <Footer />
    </HomeStyled>
  );
}
