// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      white: "#fff",
      mediumpurple: {
        "100": "#a390fc",
        "200": "rgba(163, 144, 252, 0.2)",
        "300": "rgba(163, 144, 252, 0.5)",
      },
      gainsboro: "rgba(217, 217, 217, 0.3)",
      black: "#000",
      gray: "#1e1e1e",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    borderRadius: {
      xl: "20px",
      "14xl-9": "33.9px",
    },
  },
  fontSize: {
    xl: "20px",
    base: "16px",
    inherit: "inherit",
  },
  screens: {
    lg: {
      max: "1200px",
    },
    mq1050: {
      raw: "screen and (max-width: 1050px)",
    },
    mq750: {
      raw: "screen and (max-width: 750px)",
    },
    mq450: {
      raw: "screen and (max-width: 450px)",
    },
  },
};
export const corePlugins = {
  preflight: false,
};
