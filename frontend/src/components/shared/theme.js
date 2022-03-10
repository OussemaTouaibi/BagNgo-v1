import { createTheme } from '@mui/material/styles';


const bngBlack ="#24262b";
const bngRed ="#e91e63";

export default createTheme({
  palette: {
    common: {
      black: `${bngBlack}`,
      red: `${bngRed}`
    },
    primary: {
      main: `${bngBlack}`
    },
    secondary: {
      main: `${bngRed}`
    },
  },
});