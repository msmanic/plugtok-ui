declare module '@mui/material/styles' {
  interface Palette {
    gray: {
      300: string;
      800: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    gray?: {
      300?: string;
    };
  }
}

const palette = {
  gray: {
    300: '#e0e0e0',
    800: '#424242',
  },
};

export default palette;
