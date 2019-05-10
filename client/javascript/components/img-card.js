Vue.component('card', {
  props: ['image'],
  template: `
  <div class="card" style="padding:10px">
    <img class="card-img-top" v-bind:src="image" alt="Card image cap">
    <div class="card-body">
      <p class="card-text">Share to :</p>
      <a v-bind:href="image" class="fb-share-button" data-href="image" 
      data-layout="button_count"></a>
    </div>
  </div>
  `
})