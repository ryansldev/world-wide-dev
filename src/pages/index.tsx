import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

import toast from "react-hot-toast";

import { Header } from '../components/Header';
import { LoginButton } from '../components/LoginButton';

import { HomeStyled } from '../styles/Home';

export default function Home() {
  const router = useRouter();
  const { user, signWithGithub } = useAuth();

  async function handleSignWithGithub() {
    if(!user) {
      signWithGithub()
      .then(() => {
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
      })
      .catch((error) => {
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
      });
    } else {
      toast.success("You already logged in!", {
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
      </div>
    </HomeStyled>
  );
}
