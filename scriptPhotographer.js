const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

const urlParams = new URLSearchParams(queryStringUrlId);
console.log(urlParams);

let paramsId = urlParams.get('id');
console.log(paramsId);

const photographerHead = document.getElementById('photographer_header');
let allmedia = [];


function fetchOnePhotographerData(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        let photographer = new Photographer(data.name,data.id,data.city,data.country,data.portrait,data.tagline,data.price,data.tags);
        if ( data.id == paramsId){
          showPhotographerHeader(photographer);
        }
      }
    })
    .catch(error => alert ("Erreur : " + error));
}
fetchOnePhotographerData();

function fetchOnePhotographerMedia(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.media){
        if ( data.photographerId = paramsId){
          allmedia.push(data);
          let media = new Media(data.id,data.photographerId,data.title,data.image,data.tags,data.likes,data.date,data.price);
          showImgCards(media);
        }
      }
    })
    .catch(error => alert ("Erreur : " + error));
}
fetchOnePhotographerMedia();

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

class Photographer {
  constructor(name,id,city,country,portrait,tagline,price,tags){
    this.name = name;
    this.id = id;
    this.city = city; 
    this.country = country; 
    this.portrait = portrait; 
    this.tagline = tagline; 
    this.price = price;
    this.tags = tags; 
  }
}

function showPhotographerHeader(photographer){
  const head = elmtFactory('section',{},
  
  elmtFactory('h1',{},photographer.name),
  elmtFactory('img',{class:'card_picture', src:'./public/'+photographer.portrait},),
  elmtFactory('h2',{class:'card_name'},photographer.name),
  elmtFactory('p',{class:'card_location'}, photographer.city+', '+photographer.country),
  elmtFactory('p',{class:'card_slogan'},photographer.tagline),
  elmtFactory('p',{class:'card_price'},photographer.price+'€')
  
  )
   let ul = elmtFactory(
     'ul',
     {class:'card_ul'},
    )

    let li = photographer.tags.map( (value) => {
      return ("<li class='card_ul_li'>#"
      +value+
    "</li>")});

    li = li.toString().replace(/[, ]+/g, " ").trim();
   photographerHead.appendChild(head);
   photographerHead.appendChild(ul);
   ul.innerHTML += (li);
}

const elmtFactory = (nodeName, attribute, ...children) => {
  const elmt = document.createElement(nodeName)

  for(key in attribute){
    elmt.setAttribute(key, attribute[key])
  }

  children.forEach(child => {
    if (typeof child === 'string'){
      elmt.appendChild(document.createTextNode(child))
    } else {
      elmt.appendChild(child)
    }
  })
  return elmt;
}

function showImgCards(media){
  const sectionImg = document.getElementById('photographer_pictures');
  console.log(sectionImg);
  const imgCard = elmtFactory(
    'img',
    { src:"./public/"+media.image, class:'pictures_img'},
  )
   sectionImg.appendChild(imgCard);


}




