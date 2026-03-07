import axios from "axios"

const api = axios.create({
  baseURL: "http://13.127.82.84:4000"
})

export default api