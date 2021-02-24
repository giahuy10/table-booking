export default $axios => resource => ({
  index(params) {
    return $axios.request({
      method: "get",
      url: `${resource}`,
      params
    })
  },

  show(id) {
    return $axios.get(`${resource}/${id}`)
  },

  store(payload) {
    return $axios.post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.put(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
