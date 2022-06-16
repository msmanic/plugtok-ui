import { PublicKey, Transaction } from '@solana/web3.js';

type DisplayEncoding = 'utf8' | 'hex';
type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged';
type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};

export const connectWallet = async () => {
  // @ts-ignore
  const { solana } = window;

  if (solana) {
    try {
      const response = await solana.connect();
      console.log('wallet account ', response.publicKey.toString());
      return response.publicKey.toString();
    } catch (err) {
      return undefined;
    }
  }
};

export const disconnectWallet = async () => {
  // @ts-ignore
  const { solana } = window;

  if (solana) {
    try {
      await (solana as PhantomProvider).disconnect();
      return true;
    } catch (err) {}
  }

  return false;
};
