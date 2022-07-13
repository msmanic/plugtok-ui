import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { selectDiscordUser } from 'redux/modules/common';
import { useAppSelector } from 'redux/hooks';
import { useWallet } from 'hooks/useWallet';

const Profile = () => {
  const { provider, walletKey } = useWallet();
  const user = useAppSelector(selectDiscordUser);

  return (
    <>
      <Box
        sx={{
          height: '200px',
          background: 'no-repeat url(assets/wallpaper.jpg)',
          backgroundSize: 'cover',
        }}
      />
      <Box sx={{ pl: 30, pr: 10, py: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Avatar
              variant="square"
              sx={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                left: '-180px',
                top: '-75px',
              }}
            />
            <Stack>
              <Typography variant="h5">Moon Sphere</Typography>
              <Typography variant="body1" color="gray.800">
                Communication
              </Typography>
              <Stack direction="row">
                <Link href="#">
                  <i className="fa-brands fa-discord"></i>
                </Link>
              </Stack>
            </Stack>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'info.main',
                '&:hover': { cursor: 'pointer', color: 'info.light' },
              }}
            >
              <EditIcon sx={{ width: '20px', height: '20px', mr: 1 }} />
              Edit Profile
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Alex is a senior full stack developer with 7+ years of experience in
            modern technologies. Since starting the career as a developer, he's
            architected and built 10+ user-facing web applications. Specialized
            in front end development and his expertise includes React/Redux,
            TypeScript and Vue, but also great at taking responsibilities of
            full stack part. Recently, became interested in blockchain and
            participated in developing smart contracts, minting NFTs, building
            marketplaces and so on.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
