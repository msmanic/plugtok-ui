import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { PhantomProvider } from 'services/phantom/provider';
import { DiscordSession, DiscordUser } from 'models/common';
import { EMPTY_DISCORD_SESSION } from 'config/constants';

interface CommonState {
  walletKey: PhantomProvider | undefined;
  discord: {
    session: DiscordSession;
    user: DiscordUser | null;
  };
}

const initialState: CommonState = {
  walletKey: undefined,
  discord: {
    session: EMPTY_DISCORD_SESSION,
    user: null,
  },
};

export const { reducer, actions } = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setWalletKey(state, action) {
      state.walletKey = action.payload;
      if (action.payload) localStorage.setItem('walletKey', action.payload);
      else localStorage.removeItem('walletKey');
    },
    setDiscordSession(state, action) {
      state.discord.session = {
        ...state.discord.session,
        ...action.payload,
      };
      localStorage.setItem('discord', JSON.stringify(state.discord.session));
    },
    setDiscordUser(state, action) {
      state.discord.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const getState = (state: RootState) => state.common;

export const selectWalletKey = createSelector(
  getState,
  (state) => state.walletKey
);

export const selectDiscordSession = createSelector(
  getState,
  (state) => state.discord.session
);

export const selectDiscordUser = createSelector(
  getState,
  (state) => state.discord.user
);

export const { setWalletKey, setDiscordSession, setDiscordUser } = actions;

export default reducer;
