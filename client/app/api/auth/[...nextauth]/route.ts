import NextAuth from 'next-auth';
import DropboxProvider from 'next-auth/providers/dropbox';

export const authOptions = {
  providers: [
    DropboxProvider({
      clientId: process.env.DROPBOX_CLIENT_ID || '',
      clientSecret: process.env.DROPBOX_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'files.content.write files.content.read sharing.write',
          token_access_type: 'offline',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.provider = token.provider;
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
