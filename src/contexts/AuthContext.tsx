import { useState, createContext, ReactNode } from "react";
import { firebase, auth, database } from "../services/firebase";

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

type FirebaseResultProfile = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: string | null;
  html_url: string;
  id: string;
  location: string | null;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
};

type AuthContextType = {
  user: User | undefined;
  signWithGithub: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  async function signWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (!result?.user || !result?.additionalUserInfo?.profile) {
      throw new Error("Missing information from Google Account.");
    }

    const { uid, email } = result.user;
    const {
      id: githubId,
      login,
      name,
      avatar_url,
      bio,
      blog,
      company,
      location,
    } = result?.additionalUserInfo?.profile as FirebaseResultProfile;

    if (!uid || !email || !githubId || !login || !name || !avatar_url) {
      throw new Error("Missing information from Google Account.");
    }

    const user = {
      uid,
      email,
      githubId,
      login,
      name,
      avatar_url,
      bio,
      blog,
      company,
      location,
    };

    setUser(user);

    if (result?.additionalUserInfo?.isNewUser) {
      const userRef = database.ref("users");

      const firebaseUser = await userRef.push(user);

      if (!firebaseUser) {
        alert("Fail to save on databse");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthConsumer };
