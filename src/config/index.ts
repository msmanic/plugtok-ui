export const discordRedirectURI = window.location.href.includes('localhost')
  ? 'http://localhost:3000/'
  : process.env.REACT_APP_DISCORD_REDIRECT_URI;

export const discordAuthorizationLink = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(
  process.env.REACT_APP_DISCORD_CLIENT_ID || ''
)}&redirect_uri=${encodeURIComponent(
  discordRedirectURI || ''
)}&response_type=code&scope=email%20identify`;

export const discordCredentials = Buffer.from(
  `${process.env.REACT_APP_DISCORD_CLIENT_ID}:${process.env.REACT_APP_DISCORD_CLIENT_SECRET}`
).toString('base64');
