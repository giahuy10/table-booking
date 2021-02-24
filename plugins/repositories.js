import createRepository from '~/repositories/Repository'
export default (ctx, inject) => {
  inject('repo', createRepository(ctx.$axios))
}