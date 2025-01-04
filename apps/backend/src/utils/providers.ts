import { Discord, GitHub } from 'arctic'
import { env } from './env'

const githubScopes = ['user:email', 'repo']
const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  env.GITHUB_REDIRECT_URI,
)

const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  env.DISCORD_REDIRECT_URI,
)

export { discord, github, githubScopes }
