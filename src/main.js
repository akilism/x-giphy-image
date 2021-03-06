(function(){


  xtag.register('x-giphy-image', {
    prototype: Object.create(HTMLDivElement.prototype),
    lifecycle: {
  		created: function(){
        this.apiUrl = 'http://api.giphy.com/v1/gifs/';
        this.apiKey = 'dc6zaTOxFJmzC';
        this.fetchGifs();
  		},
      attributeChanged: function(){
        this.fetchGifs();
      }
  	},
  	events: {
      click: function() { //load next image.
        var type = this.type.toLowerCase();
        if(type === 'random' || type === 'translate') { this.fetchGifs(); return; }
        this.i = (this.i + 1 === this.gifs.length) ? 0 : this.i + 1;
        var giphyImage = this;
        xtag.queryChildren(this, '.x-giphy-image').forEach(function(img) {
          img.src = giphyImage.gifs[giphyImage.i];
        });
      }
    },
  	accessors: {
      type: { //random, search, translate, trending
        attribute: { }
      },
      term: { //the search term, translate term, or random tag to filter by.
        attribute: {}
      },
      rating: { //y,g, pg, pg-13 or r
        attribute: {}
      },
      random: { //Return a random image from the results.
        attribute: { boolean: true }
      }
    },
  	methods: {
      fetchGifs: function() {
        this.apiRating = this.rating || 'r';
        this.gifs = [];
        this.i = 0;
        url = this.buildRequestUrl();
        this.makeRequest(url);
      },
      buildRequestUrl: function() {
        switch(this.type.toLowerCase()) {
          case 'search':
            return this.getSearchUrl();
          case 'translate':
            return this.getTranslateUrl();
          case 'trending':
            return this.getTrendingUrl();
          default:
            return this.getRandomUrl();
        }
      },
      getSearchUrl: function() {
        if(this.term) {
          return this.apiUrl + 'search?api_key=' + this.apiKey + '&q=' + encodeURIComponent(this.term) + '&rating=' + this.apiRating;
        }
      },
      getTranslateUrl: function() {
        if(this.term) {
          return this.apiUrl + 'translate?api_key=' + this.apiKey + '&s=' + encodeURIComponent(this.term) + '&rating=' + this.apiRating;
        }
      },
      getTrendingUrl: function() {
        return this.apiUrl + 'trending?api_key=' + this.apiKey + '&rating=' + this.apiRating;
      },
      getRandomUrl: function() {
        if(this.term) {
          return this.apiUrl + 'random?api_key=' + this.apiKey + '&tag=' + encodeURIComponent(this.term) + '&rating=' + this.apiRating;
        } else {
          return this.apiUrl + 'random?api_key=' + this.apiKey + '&rating=' + this.apiRating;
        }
      },
      makeRequest: function(url) {
        var giphyRequest = new XMLHttpRequest();
        var giphyImage = this;

        giphyRequest.onload = function handleResponse() {
          var responseData = JSON.parse(this.responseText);
          giphyImage.gifs = giphyImage.getGifFromResponse(responseData);
          giphyImage.loadGif();
        };

        giphyRequest.open('get', url, true);
        giphyRequest.send();
      },
      getGifFromResponse: function(responseData) {
        switch(this.type.toLowerCase()) {
          case 'random':
            return [responseData.data.image_original_url];
          case 'translate':
            return [responseData.data.images.original.url];
          default:
            return responseData.data.map(function(gif) {
              return gif.images.original.url;
            });
        }
      },
      loadGif: function() {
        var gifSrc = this.getGif();
        this.innerHTML =  '<img class="x-giphy-image" src=' + gifSrc + '>';
        this.innerHTML += '<img class="giphy-logo" src="../src/giphy.png">';
      },
      getGif: function() {
        this.i = this.random ? idx = Math.floor(Math.random() * this.gifs.length) : 0;
        return this.gifs[this.i] || '';
      }
    }
  });


})();
