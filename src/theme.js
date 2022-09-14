import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "Circular, sans-serif",
  heading: "Circular, sans-serif",
  mono: "Circular, sans-serif",
};

const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "1366px",
  "3xl": "1440px",
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
    primary: {
      50: "#b4dccc",
      100: "#99cfba",
      200: "#7bc1a5",
      300: "#57b08c",
      400: "#2a9b6e",
      500: "#008751",
      600: "#004d28",
      700: "#004d28",
      800: "#001b08",
      900: "#001b08",
    },
  },
  fonts,
  breakpoints,
  components: {
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            _placeholder: {
              color: "#97A3AD",
            },
          },
        }),
      },
      defaultProps: { focusBorderColor: "primary.400" },
      baseStyle: {
        borderRadius: "0.5rem",
      },
      sizes: {
        lg: {
          h: "52px",
        },
      },
    },
    Select: {
      variants: {
        outline: (props) => ({
          field: {
            _placeholder: {
              color: "#97A3AD",
            },
          },
        }),
      },
      defaultProps: { focusBorderColor: "primary.400" },
      baseStyle: {
        borderRadius: "0.5rem",
      },
      sizes: {
        lg: {
          h: "52px",
        },
      },
    },
    Textarea: {
      variants: {
        outline: (props) => ({
          field: {
            _placeholder: {
              color: "#97A3AD",
            },
          },
        }),
      },
      defaultProps: { focusBorderColor: "primary.400" },
    },
  },
});

export default theme;
