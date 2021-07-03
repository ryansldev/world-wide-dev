import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      title: string;
      subtitle: string;
      heading: string;
      background: string;
    };
    fontsFamily: {
      title: string;
      subtitle: string;
      heading500: string;
      heading400: string;
    };
  }
}
