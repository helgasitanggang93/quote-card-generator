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
    cards: [],
    textColor : '#ffffff',
    weight: 'normal',
    style: 'normal',
    x: 0,
    y: 0,
    file: [],
    isLoading: false,
    image: '',
  },
  mounted() {
    this.getCards()
  },
  methods: {
    getCards() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/cards'
      })
      .then(({data}) => {
        this.cards = data
      })
      .catch(err => {
        console.log(err)
      })
    },
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
              //document.body.appendChild(canvas)
              let card = canvas.toDataURL("image/png")
              console.log(typeof card)
              this.upload(card)
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

     onFileChange(e){
         let files = e.target.files || e.dataTransfer.files;
             if (!files.length)
                 return;
             this.createImage(files[0]);
             this.file = this.$refs.file.files[0]
     },
     createImage(file) {
         let reader = new FileReader();
         reader.onload = (e) => {
             this.image = e.target.result;
             console.log(this.image);
         };
         reader.readAsDataURL(file);
     },
     upload(card){
         this.isLoading = true;
         let fileString = card.toString()
         let extension =  '.' + fileString.substring(fileString.indexOf('/')+1, fileString.indexOf(';'))

         if(extension === '.') {
           extension = '.png'
         }

         axios({
             url: 'http://localhost:3000/upload',
             method: 'POST',
             data: {
                 image: card,
                 name: '',
                 extension: extension,
             }
         })
         .then(({data})=> {
            this.getCards()
            this.cards.unshift(data.card)
            this.file = []
            this.quote = ''
            this.isLoading = false;
            window.location.href='http://localhost:8080/#cardlist'
         })
         .catch(err =>{
             console.log(err)
         })
     }
  },
  computed : {

  },

  created() {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }
})