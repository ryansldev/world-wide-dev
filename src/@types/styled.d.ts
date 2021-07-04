import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      secondary: string;
      title: string;
      subtitle: string;
      heading: string;
      background: string;
      placeholder: string;
    };
    fonts: {
      title: string;
      subtitle: string;
      heading500: string;
      heading400: string;
    };
  }
}
