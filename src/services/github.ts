import axios from "axios";

type Dev = {
  id?: string;
  login: string;
  bio?: string;
  avatar_url?: string;
  html_url?: string;
  blog?: string;
  name?: string;
  location?: string;
  registered?: boolean;
  linksInBioInfo?: Array<LinksOnBio>;
}

type LinksOnBio = {
  linkTitle: string;
  href: string;
}

type searchDevParams = {
  username?: string;
  language?: string;
  location?: string;
  token?: string;
}

type followingDevsParams = {
  login: string;
  page?: number;
  per_page?: number;
  token?: string;
  getAll?: boolean;
}

type isFollowingBackParams = {
  login: string;
  loginOfFollowed: string;
  page?: number;
  per_page?: number;
  token?: string;
  getAll?: boolean;
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

export const followingDevs = async ({ login, page, per_page, token, getAll }: followingDevsParams) => {
  const indexOfPage = page ? page : 1;
  const numberPerPage = per_page ? per_page : 100;

  var stopCondition = false;
  var accumalator = 0;

  const request = async () => await api.get(`users/${login}/following`, {
    headers: {
      Authorization: `${token ? `token ${token}` : ''}`,
    },
    params: {
      page: indexOfPage + accumalator,
      per_page: numberPerPage
    },
  });

  const followingDevs = [];

  if(getAll) {
    while(stopCondition === false) {
      const devs = await request();

      if(devs?.data?.length === 0) {
        stopCondition = true;
        break;
      }

      followingDevs.push(...devs.data);

      accumalator++;
    }
  } else {
    const devs = await request();
    followingDevs.push(...devs.data);
  }

  return followingDevs;
}

export const isFollowingBack = async ({ login, loginOfFollowed, page, per_page, token, getAll }: isFollowingBackParams) => {
  const followingDevsList = await followingDevs({ login: loginOfFollowed, page, per_page, token, getAll });

  var isFollowed = false;
  followingDevsList.map((dev) => {
    if(dev.login === login) {
      isFollowed = true;
    };
  });

  return isFollowed;
}

type linksInBioInfo = {
  href: string;
  linkTitle: string;
}

export const getLinksOnBio = (bio: string) => {
  const linksInBio: linksInBioInfo[] = [];

  function getLinks(bioFunction) {
    if(bioFunction) {
      const filterUserConditions = ['.', ',', '|', '_', '~', '—', ';', '@'];
      const splitBio = bioFunction.split(' ');
      splitBio.map((element) => {
        if(!element.includes('@')) {
          return;
        };

        var getUser = element;
        filterUserConditions.map((letter) => {
          getUser = getUser.replaceAll(letter, '');
        });


        linksInBio.push({ linkTitle: `@${getUser}`, href: `https://github.com/${getUser}` });
        if(splitBio[splitBio.length - 1].includes('@')) {
          getLinks(splitBio[splitBio.length]);
        }
      })

      return linksInBio;
    }

    return;
  }

  return getLinks(bio);
}

export const getFullInfoProfile = async (dev: Dev, token: string) => {
  const { data } = await api.get(`/users/${dev.login}`, {
    headers: {
      Authorization: `${token ? `token ${token}` : ''}`,
    },
  });

  if(data.blog && !data.blog.includes('://')) {
    data.blog = (`https://${data.blog}`);
  };

  return data;
}

export const getDevsOfInterest = async (
  user: Dev,
  token: string,
  followingDevsArr: Array<Dev>,
  selectedFollowedDevs, shuffleArray
) => {
  // A function to filter Devs of Interest, this function remove people that follow the user
  function filterDevsOfInterest(dev: Dev) {
    const listOfFollowedDevs = [];
    followingDevsArr.map((followedDev: Dev) => {
      if(dev && followedDev.login === dev.login) {
        listOfFollowedDevs.push(followedDev.login);
      };
    });

    if(listOfFollowedDevs.includes(dev.login)) {
      return false;
    } else {
      return dev.login !== user.login;
    }
  }

  const parsedDevsOfInterest: Array<Dev[]> = await Promise.all(
    selectedFollowedDevs.map(async (dev: Dev) => {
      const { data } = await api.get(`/users/${dev.login}/following`, {
        headers: {
          Authorization: `${token ? `token ${token}` : ''}`,
        },
      });

      const filteredDevsOfInterest = data.filter((dev: Dev) => filterDevsOfInterest(dev));

      // Remove duplicated devs in the variable: filteredDevsOfInterest
      const DevsOfInterest = filteredDevsOfInterest.reduce((unico, item) => {
        return unico.includes(item) ? unico : [...unico, item];
      }, []);

      if(DevsOfInterest.length >= 3) {
        const shuffleredPointsOfInterest = shuffleArray(DevsOfInterest);
        return [shuffleredPointsOfInterest[0], shuffleredPointsOfInterest[1], shuffleredPointsOfInterest[2]];
      }

      return DevsOfInterest;
    })
  );

  const DevsOfInterest = [];
  // Agroup all data in one unique Array(DevsOfInterest)
  await parsedDevsOfInterest.map((element: Dev[]) => {
    element.map((dev: Dev) => {
      DevsOfInterest.push(dev);
    })

    return;
  });

  const filteredDevsOfInterest = DevsOfInterest.filter((dev, i) => {
    return DevsOfInterest.indexOf(dev) === i;
  });

  return filteredDevsOfInterest;
}
