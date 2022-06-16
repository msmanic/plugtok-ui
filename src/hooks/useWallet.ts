import { useState, useEffect } from 'react';
import { PhantomProvider, getProvider } from 'services/phantom/provider';
import { useAppSelector } from 'redux/hooks';
import { selectWalletKey } from 'redux/modules/common';

export const useWallet = () => {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const walletKey = useAppSelector(selectWalletKey);

  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  return { provider, walletKey };
};
