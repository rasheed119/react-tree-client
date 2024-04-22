import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "serif"].join(","),
  },
  unstable_strictMode: true,
});

export default theme;
