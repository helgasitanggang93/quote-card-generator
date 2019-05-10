const app = new Vue({
  el : '#app',
  data : {
    quote : '',

  },

  methods : {
    generateQuote() {
      axios({
        method: 'get',
        url: 'https://quota.glitch.me/random'
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

  computed : {

  },

  created() {
      console.log('hai');
      
  }
})