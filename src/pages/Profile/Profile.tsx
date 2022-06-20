import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { selectDiscordUser } from 'redux/modules/common';
import { useAppSelector } from 'redux/hooks';
import { useWallet } from 'hooks/useWallet';

const Profile = () => {
  const { provider, walletKey } = useWallet();
  const user = useAppSelector(selectDiscordUser);

  return (
    <Box sx={{ px: 3, py: 6 }}>
      <Typography variant="h3" align="center">
        Plug Tok
      </Typography>
      <Typography variant="body1" align="center" color="grey.700">
        Welcome to PlugTok
      </Typography>
      <Stack spacing={2} alignItems="center" sx={{ mt: 8 }}>
        {provider &&
          (!walletKey ? (
            <Typography variant="h6" align="center">
              Wallet not connected
            </Typography>
          ) : (
            <Typography variant="h6" align="center">
              Wallet: <strong>{walletKey.toString()}</strong>
            </Typography>
          ))}
        {user ? (
          <Typography variant="h6" align="center">
            Discord username: <strong>{user.username}</strong>
          </Typography>
        ) : (
          <Typography variant="h6" align="center">
            User not authenticated
          </Typography>
        )}
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

export default Profile;
