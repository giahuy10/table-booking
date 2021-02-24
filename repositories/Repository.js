import AuthRepository from '~/repositories/Auth'
export default ($axios) => ({
  auth: AuthRepository($axios),
})
