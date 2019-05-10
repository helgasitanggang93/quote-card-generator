var PulseLoader = VueSpinner.PulseLoader
var ClipLoader = VueSpinner.ClipLoader

const app = new Vue({
  el : '#app',
  components: {
    PulseLoader,
    ClipLoader,
  },
  data : {

    quote : '',
    textColor : '#ffffff',
    weight: 'normal',
    style: 'normal',
    x: 0,
    y: 0,
    file: [],

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
    },

    saveCard() {
      html2canvas(document.querySelector("#capture"), {
        allowTaint : true, 
        })
        .then(canvas => {
              document.body.appendChild(canvas)
              let card = canvas.toDataURL("image/png")
              console.log(card)
              // window.location.href=card
        })
        .catch(err => {
              console.log(err)
            })
    },

    previewFile() {
      this.file = URL.createObjectURL(this.$refs.myFile.files[0])
    },

    setPosition(input) {
      console.log(input)
      if(input == 'up' && this.x >= -40) this.x-=10
      if(input == 'down' && this.x <= 380) this.x+=10
      if(input == 'right') this.y+=10
      if(input == 'left') this.y-=10
      console.log(this.x, this.y)
    },
  },

  computed : {

  },

  created() {
      // console.log('hai');
      console.log(this.file)
      
  }
})