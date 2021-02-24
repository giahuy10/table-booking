
const resource = `/${process.env.API_VERSION}`
export default ($axios) => ({
  login(data) {
    return $axios.post(`${resource}/login`, data)
  },
})
