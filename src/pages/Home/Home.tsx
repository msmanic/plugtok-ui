import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useWallet } from 'hooks/useWallet';

const Home = () => {
  const { provider } = useWallet();

  return (
    <Box sx={{ px: 20, py: 5, overflow: 'hidden' }}>
      <Grid container>
        <Grid item md={6}>
          <Box sx={{pr: {md: 3}}}>
            <Typography variant="h3" sx={{ color: 'gray.700', mt: 10 }}>
              Welcome to
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: 'primary.main', fontWeight: 700 }}
            >
              Plug Tok
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <img
            src="/assets/wallpaper.jpg"
            height="400px"
            style={{
              clipPath: 'url("#myCurve")',
            }}
          />
          <svg width="0" height="0">
            <defs>
              <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
                <path d="M 0.999 0.43 C 0.986 0.782 0.912 1 0.485 0.988 C -0.019 0.903 -0.011 0.676 0.005 0.26 C 0.015 0.013 0.22 0.042 0.523 0.007 C 0.899 -0.038 1 0.141 0.999 0.43" />
              </clipPath>
            </defs>
          </svg>
        </Grid>
      </Grid>

      <Stack spacing={2} alignItems="center" sx={{ mt: 8 }}>
        {!provider && (
          <Typography variant="h6" align="center">
            No provider found. Install{' '}
            <Link href="https://phantom.app/" target="_blank">
              Phantom Browser extension
            </Link>
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
