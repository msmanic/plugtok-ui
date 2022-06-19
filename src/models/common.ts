export type DiscordSession = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type DiscordUser = {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
};
