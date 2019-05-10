const app = new Vue({
  el : '#app',
  data : {
    quote : '',
    image: '',
    file: '',
  },
  methods: {
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
     upload(){
         let fileString = this.image.toString()
         let name = this.file.name.substring(0, this.file.name.indexOf('.'))

         console.log(fileString);
         console.log('======', name);
         let extension =  '.' + fileString.substring(fileString.indexOf('/')+1, fileString.indexOf(';'))

         if(extension === '.') {
           extension = '.png'
         }

         axios({
             url: 'http://localhost:3000/upload',
             method: 'POST',
             data: {
                 image: this.image,
                 name: name,
                 extension: extension,
             }
         })
         .then(({data})=> {
             console.log(data.link)
             this.image= ''
             this.file = ''
         })
         .catch(err =>{
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