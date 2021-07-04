import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary300: string;
      primary400: string;
      secondary: string;
      title: string;
      subtitle: string;
      heading: string;
      background: string;
      placeholder: string;
      white: string;
    };
    fonts: {
      title: string;
      subtitle: string;
      heading500: string;
      heading400: string;
    };
  }
}
