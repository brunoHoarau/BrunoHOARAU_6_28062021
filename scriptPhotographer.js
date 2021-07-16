const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

const urlParams = new URLSearchParams(queryStringUrlId);
console.log(urlParams);

let paramsId = urlParams.get('id');
console.log(paramsId);

const photographerHead = document.getElementById('photographer_header');
let allmedia = [];


function fetchDataOnePhotographer(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.media){
        if ( data.photographerId = paramsId){
          allmedia.push(data);
          let media = new Media(data.id,data.photographerId,data.title,data.image,data.tags,data.likes,data.date,data.price);
        }
      }
    })
    .catch(error => alert ("Erreur : " + error));
}
fetchDataOnePhotographer();

class Media{
  constructor(id,photographerId,title,image,tags,likes,date,price){
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }
}

function showPhotographerHeader(photographer){
  photographerHead.innerHTML += '<h2>'+photographer.name+'</h2>';

}

