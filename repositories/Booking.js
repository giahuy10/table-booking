
const resource = '/api/additional-budget'
export default ($axios) => ({
  request_approval(id) {
    return $axios.put(`${resource}/${id}/request`)
  },
  cancel_request_approval(id) {
    return $axios.put(`${resource}/${id}/cancel-request`)
  },
  approve(id, data) {
    return $axios.put(`${resource}/${id}/approve`, data)
  },
  reject(id, data) {
    return $axios.put(`${resource}/${id}/reject`, data)
  },
})
