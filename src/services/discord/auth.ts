import { discordRedirectURI } from 'config';

const DiscordOAuth = require('discord-oauth2');

export const oauth = new DiscordOAuth({
  clientId: process.env.REACT_APP_DISCORD_CLIENT_ID,
  clientSecret: process.env.REACT_APP_DISCORD_CLIENT_SECRET,
  redirectUri: discordRedirectURI,
});
