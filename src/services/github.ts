import axios from "axios";

type searchDevParams = {
  username?: string;
  language?: string;
  location?: string;
  token?: string;
}

export const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchDevs = async ({ username, language, location, token }: searchDevParams) => {
  var query = "";

  username.includes("@")
    ? query = query + `${username.substring(1).trim()} in:login`
    : query = query + `${username.trim()} in:name `;

  if (location) {
    query = query + `location:${location.trim()} `;
  }

  if (language) {
    query = query + `language:${language.trim()} `;
  }

  const result = await api.get(`search/users`, {
    headers: {
      Authorization: `${token ? `token ${token}` : ''}`,
    },
    params: {
      q: query,
    },
  });

  return result;
}
