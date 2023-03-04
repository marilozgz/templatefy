import { handleAuth } from '@auth0/nextjs-auth0';
secret:process.env.SECRET

export default handleAuth();