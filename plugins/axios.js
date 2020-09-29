export default function ({ $axios }) {
//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 400) {
//       error = error.response.data.error
//       return error
//     }
//   })

  $axios.onRequest(config => {
    config.withCredentials  = true
    return config
  })
}

