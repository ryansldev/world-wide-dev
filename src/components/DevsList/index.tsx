import { ReactNode } from "react";
import { List } from "./styles";

import { MinifiedDevCard } from "../MinifiedDevCard";

type Dev = {
  id: string;
  login: string;
  html_url?: string;
  avatar_url?: string;
}

type DevsListProps = {
  devs: Dev[];
  children?: ReactNode;
};

export function DevsList({ devs, children }: DevsListProps) {
  return (
    <List>
      { children }
      <div>
        {
          devs.map((dev) => <MinifiedDevCard key={dev.id} login={dev.login} avatar_url={dev.avatar_url} html_url={dev.html_url} />)
        }
      </div>
    </List>
  );
}