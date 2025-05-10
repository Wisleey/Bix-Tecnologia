import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      success: string;
      error: string;
      warning: string;
      text: string;
      textLight: string;
      background: string;
      card: string;
      sidebar: string;
      border: string;
      borderLight: string;
      hover: string;
      disabled: string;
      inputBg: string;
      gradientStart: string;
      gradientEnd: string;
      [key: string]: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
