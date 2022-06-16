import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { setWalletKey } from 'redux/modules/common';
import { useWallet } from 'hooks/useWallet';
import AppLayout from 'layouts';
import Routes from 'Routes';
import { connectWallet } from 'services/phantom/provider';

const App = () => {
  const { provider } = useWallet();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (provider && localStorage.getItem('walletKey')) {
      connectWallet().then((key) => {
        dispatch(setWalletKey(key));
      });
    }
  }, [dispatch, provider]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
