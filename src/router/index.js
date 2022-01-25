export const Router = {
  auth: {
    login: '/',
    recover: '/recover/password',
    reset: '/user/password-reset/:token',
    verify: '/user/verify/:token'
  },
  admin: {
    ip: '/admin/intended-parents',
    surrogates: '/admin/surrogates',
    matches: '/admin/matches'
  }
};
