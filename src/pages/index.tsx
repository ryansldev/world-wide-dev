import { useAuth } from "../hooks/useAuth";

import { HomeStyled } from '../styles/Home';

import { Header } from '../components/Header';
import { LoginButton } from '../components/LoginButton';

export default function Home() {
  const { signWithGithub } = useAuth();
  return (
    <HomeStyled>
      <Header />
      <div className="container">
        <LoginButton onClick={signWithGithub} />
        <p>
          Connect with other devs, learn
          <br />
          with other developers! :D
        </p>
      </div>
    </HomeStyled>
  );
}
