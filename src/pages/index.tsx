import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { signWithGithub } = useAuth();
  return (
    <div>
      <h1>World wide dev</h1>
      <h2>To devs from devs</h2>
      <button onClick={signWithGithub}>Login github</button>
    </div>
  );
}
