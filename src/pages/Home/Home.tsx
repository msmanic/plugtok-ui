import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { setWalletKey } from 'redux/modules/common';
import { connectWallet, disconnectWallet } from 'services/phantom/provider';
import { useAppDispatch } from 'redux/hooks';
import { useWallet } from 'hooks/useWallet';

const Home = () => {
  const dispatch = useAppDispatch();
  const { provider, walletKey } = useWallet();

  const handleConnectWallet = async () => {
    const walletKey = await connectWallet();
    dispatch(setWalletKey(walletKey));
  };

  const handleDisconnectWallet = async () => {
    if (walletKey) {
      const disconnected = await disconnectWallet();
      if (disconnected) dispatch(setWalletKey(undefined));
    }
  };

  return (
    <Box sx={{ px: 3, py: 6 }}>
      <Typography variant="h3" align="center">
        Plug Tok
      </Typography>
      <Typography variant="body1" align="center" color="grey.700">
        Welcome to PlugTok
      </Typography>
      <Box sx={{ mt: 2 }}>
        {provider &&
          (!walletKey ? (
            <Button
              variant="contained"
              sx={{ display: 'block', margin: 'auto', fontWeight: 700 }}
              onClick={handleConnectWallet}
            >
              Connect to Phantom Wallet
            </Button>
          ) : (
            <Button
              variant="contained"
              color="warning"
              sx={{ display: 'block', margin: 'auto', fontWeight: 700 }}
              onClick={handleDisconnectWallet}
            >
              Disconnect Wallet
            </Button>
          ))}
        {!provider && (
          <Typography variant="h6">
            No provider found. Install{' '}
            <Link href="https://phantom.app/" target="_blank">
              Phantom Browser extension
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
