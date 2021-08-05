import { useState, useEffect, createContext, ReactNode } from "react";
import { firebase, auth, database } from "../services/firebase";
import { api as githubApi } from "../services/github";

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

type GithubApiInfo = {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

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
  isLoading: boolean;
  user: User | undefined;
  githubApiInfo: GithubApiInfo | undefined;
  signWithGithub: () => Promise<void>;
  getGithubRequestsInfo: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type CredentialGithub = firebase.auth.AuthCredential & {
  accessToken: string;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [githubApiInfo, setGithubApiInfo] = useState<GithubApiInfo>();

  useEffect(() => {
    setIsLoading(true);

    async function loadUserAndRequestsInfo() {
      await getGithubRequestsInfo();
      await getAuthenticatedUserData();
      setIsLoading(false);
    }

    loadUserAndRequestsInfo();
  }, []);

  async function signWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider);
    const { accessToken } = result.credential as CredentialGithub;
    sessionStorage.setItem('access_token', accessToken);

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
      throw new Error("Missing information from GitHub Account.");
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

  async function getGithubRequestsInfo() {
    const token = sessionStorage.getItem('access_token');

    const response = await githubApi.get("rate_limit", {
      headers: {
        Authorization: `${token ? `token ${token}` : ''}`,
      },
    });

    if(!response?.data?.rate) {
      return;
    }
    
    const { limit, remaining, reset, used }: GithubApiInfo = response?.data?.rate;

    setGithubApiInfo({
      limit, 
      remaining, 
      reset, 
      used
    });
  }

  async function getAuthenticatedUserData() {
    auth.onAuthStateChanged( async (user) => {
      if(!user) {
        return;
      }

      const { uid } = user;

      const userRef = await database.ref(`users`).get();
      const firebaseUsers: User[] = userRef.val();

      if(!firebaseUsers) {
        return;
      }

      const userProps = Object.entries(firebaseUsers).map(([key, values]) => {
        return {
          key: key,
          ...values
        }
      });

      const authenticatedUser = userProps.find((user) => user.uid === uid);

      setUser(authenticatedUser);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        githubApiInfo,
        signWithGithub,
        getGithubRequestsInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthConsumer };
