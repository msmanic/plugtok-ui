import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { PhantomProvider } from 'services/phantom/provider';

interface CommonState {
  walletKey: PhantomProvider | undefined;
}

const initialState: CommonState = {
  walletKey: undefined,
};

export const { reducer, actions } = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setWalletKey(state, action) {
      state.walletKey = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const getState = (state: RootState) => state.common;

export const selectWalletKey = createSelector(
  getState,
  (state) => state.walletKey
);

export const { setWalletKey } = actions;

export default reducer;
