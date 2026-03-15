import axios from "axios"

const api = axios.create({
  baseURL: "http://13.127.82.84:4000"
})

api.interceptors.request.use((config)=>{

  const token = localStorage.getItem("token")

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})

export default api