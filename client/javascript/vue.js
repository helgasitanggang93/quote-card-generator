var PulseLoader = VueSpinner.PulseLoader
var ClipLoader = VueSpinner.ClipLoader

const app = new Vue({
  el : '#app',
  components: {
    PulseLoader,
    ClipLoader,
  },
  data : {
    quote : null,
    isLoading: false,
  },
  mounted() {
    this.generateQuote()
  },
  methods : {
    generateQuote() {
      this.isLoading = true;
      this.quote = null

      axios({
        method: 'get',
        url: 'https://quota.glitch.me/random'
      })
      .then(({data}) => {
        console.log(data)
        this.quote = data.quoteText
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

  computed : {

  },
})