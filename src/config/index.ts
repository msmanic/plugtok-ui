export const discordAuthorizationLink = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(
  process.env.REACT_APP_DISCORD_CLIENT_ID || ''
)}&redirect_uri=${encodeURIComponent(
  process.env.REACT_APP_DISCORD_REDIRECT_URI || ''
)}&response_type=code&scope=identify%20guilds`;

export const discordCredentials = Buffer.from(
  `${process.env.REACT_APP_DISCORD_CLIENT_ID}:${process.env.REACT_APP_DISCORD_CLIENT_SECRET}`
).toString('base64');
