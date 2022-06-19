import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectDiscordSession,
  setDiscordSession,
  setDiscordUser,
  setWalletKey,
} from 'redux/modules/common';
import { useWallet } from 'hooks/useWallet';
import AppLayout from 'layouts';
import Routes from 'Routes';
import { connectWallet } from 'services/phantom/provider';
import { oauth as discordOAuth } from 'services/discord/auth';
import { DiscordSession } from 'models/common';
import { EMPTY_DISCORD_SESSION } from 'config/constants';

const App = () => {
  const { provider } = useWallet();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const discordSession = useAppSelector(selectDiscordSession);
  const discordTokenRequestFromCode = _.debounce((code) => {
    discordOAuth
      .tokenRequest({
        code,
        scope: ['identify', 'guilds'],
        grantType: 'authorization_code',
        redirectUri: 'http://localhost:3000/',
      })
      .then((data: DiscordSession) => {
        dispatch(setDiscordSession(data));
      })
      .catch(() => {
        dispatch(setDiscordSession(EMPTY_DISCORD_SESSION));
      });
  }, 1000);
  const discordTokenRequestFromRefreshToken = _.debounce((token) => {
    discordOAuth
      .tokenRequest({
        refreshToken: token,
        grantType: 'refresh_token',
        scope: ['identify', 'guilds'],
      })
      .then((data: DiscordSession) => {
        dispatch(setDiscordSession(data));
      });
  }, 1000);

  useEffect(() => {
    const info = localStorage.getItem('discord'),
      queryCode = searchParams.get('code');
    let refreshToken = '',
      accessToken = '';

    if (info) {
      refreshToken = JSON.parse(info).refresh_token;
      accessToken = JSON.parse(info).access_token;
    }

    if (refreshToken) {
      discordTokenRequestFromRefreshToken(refreshToken);
    } else if (queryCode && accessToken === '') {
      discordTokenRequestFromCode(queryCode);
    }
  }, [
    searchParams,
    discordTokenRequestFromRefreshToken,
    discordTokenRequestFromCode,
  ]);

  useEffect(() => {
    if (discordSession.access_token !== '') {
      discordOAuth
        .getUser(discordSession.access_token)
        .then((data: Record<string, any>) => {
          dispatch(
            setDiscordUser({
              id: data.id,
              avatar: data.avatar,
              username: data.username,
              discriminator: data.discriminator,
            })
          );
        });
    }
  }, [dispatch, discordSession.access_token]);

  useEffect(() => {
    if (provider && localStorage.getItem('walletKey')) {
      connectWallet().then((key) => {
        dispatch(setWalletKey(key));
      });
    }
  }, [dispatch, provider]);

  useEffect(() => {}, []);

  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  );
};

export default App;
