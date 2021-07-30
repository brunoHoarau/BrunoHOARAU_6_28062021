const queryStringUrlId = window.location.search;
const urlParams = new URLSearchParams(queryStringUrlId);
let paramsId = urlParams.get('id');

const photographerHead = document.getElementById('photographer_header');
const main = document.getElementsByTagName('main');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
let imgCard;
let number = 0;



let allmedia = [];
let arrayImg =elmt = [];
let firstName; 

function fetchOnePhotographerData(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        let photographer = new Photographer(data.name,data.id,data.city,data.country,data.portrait,data.tagline,data.price,data.tags);
        if ( data.id == paramsId){
          let name = photographer.name;
          firstName = name.split(' ');
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
      getDatas(datas);
      setDatas(datas)
      
    }
    
    
    )
    .catch(error => alert ("Erreur : " + error));
  }
fetchOnePhotographerMedia();


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

function getDatas(datas){
  for( data of datas.media){
    if ( data.photographerId == paramsId){
      allmedia.push(data);
      if(data.image){
        arrayImg.push(data.image);
      } else {
        arrayImg.push(data.video);
      }
      
    }
  }
}

console.log(allmedia)


function showGallery(){
  imgCardFactory(gallery);
  }

function setDatas(){
  showGallery();
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

function showPhotographerHeader(photographer){

  const head = elmtFactory('section',{ class:'profile'},
  
  elmtFactory('h1',{ class:'h1_page'},photographer.name),
  elmtFactory('img',{class:'profile_picture', src:'./public/'+photographer.portrait},),
  elmtFactory('p',{class:'card_location'}, photographer.city+', '+photographer.country),
  elmtFactory('p',{class:'card_slogan'},photographer.tagline),
  elmtFactory('p',{class:'card_price'},photographer.price+'€'),
  elmtFactory('button',{id:'card_contact'},'Contactez-moi'),
  );
  const contactfactory = elmtFactory('section',{id:"section_contact"},);

  const form = elmtFactory('form', {class:'section_form'},
    elmtFactory('label', {for:'firstname'},'Prénom'),
    elmtFactory('input', {id:'firstname', required:true},),
    elmtFactory('label', {for:'name'},'Nom'),
    elmtFactory('input', {id:'name', required:true},),
    elmtFactory('label', {for:'email'},'email'),
    elmtFactory('input', {id:'email', required:true},),
    elmtFactory('label', {for:'message'},'Votre message'),
    elmtFactory('textarea', {id:'message', required:true},),

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
      photographerHead.appendChild(contactfactory);
      const sectionContact = document.getElementById('section_contact');
      sectionContact.appendChild(form);
      ul.innerHTML += (li);
      const contactButton = document.getElementById('card_contact');
  contactButton.addEventListener('click', (e) => {
    sectionContact.style.display='flex';
    e.preventDefault()
  })
    }
    
    
    function imgCardFactory(element){
      let numb = 0;
      let number = 1;
      let totalLike;
      allmedia.forEach( elmt => {
      const sectionCard = elmtFactory(
        'section',
        { class:'section_card'}
      );
    console.log(elmt.likes)
    // let totalLike = ;
    if( elmt.image){
      let imgCard = elmtFactory(
        'img',
        { class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.image, class:'gallery_img', onclick:'showLightbox('+number+')'},
        );
      let titleImg = elmtFactory(
        'p',
        {class:'lImg_tilte'},
        elmt.title
      )
      const likesGroup = elmtFactory(
        'div',
        {class:'groupHeart'},
      );
      let likes = elmtFactory(
        'p',
        {class:'lImg_likes'},
        elmt.likes.toString()
      ,)
      let heart = elmtFactory(
        'img',
        {src:'./public/coeur.svg',class:'lImg_svg' , value:elmt.likes, onclick:'increment('+numb+')'},
      )
      sectionCard.appendChild(imgCard);
      sectionCard.appendChild(titleImg);
      likesGroup.appendChild(heart);
      likesGroup.appendChild(likes);
      element.appendChild(sectionCard)
      sectionCard.appendChild(likesGroup)

      } else {
        let imgCard = elmtFactory(
          
        'video',
        {class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.video, class:'gallery_img', type:"video/mp4", onclick:'showLightbox('+numb+')'},
        elmtFactory(
          'p',
          {class:'lImg_tilte'},
          elmt.title
        ),

        );
        let titleImg = elmtFactory(
          'p',
          {class:'lImg_tilte'},
          elmt.title
        )
        const likesGroup = elmtFactory(
          'div',
          {class:'groupHeart'},
        );
        let likes = elmtFactory(
          'p',
          {class:'lImg_likes'},
          elmt.likes.toString()
        ,)
        let heart = elmtFactory(
          'img',
          {src:'./public/coeur.svg',class:'lImg_svg' , value:elmt.likes, onclick:'increment('+numb+')'},
        )
        element.appendChild(imgCard);
        sectionCard.appendChild(imgCard);
        sectionCard.appendChild(titleImg);
        likesGroup.appendChild(heart);
        likesGroup.appendChild(likes);
        element.appendChild(sectionCard)
        sectionCard.appendChild(likesGroup)

        
      }
      number += 1; 
      numb += 1; 

    }
    
    )
    
  }
  
  const likesElmts = document.getElementsByClassName('lImg_likes');  
  const heartElmts = document.getElementsByClassName('lImg_svg');

  function increment(numb){
    var plus = heartElmts[numb].getAttribute('value');
    plus ++;
    likesElmts[numb].innerHTML = plus;
    heartElmts[numb].setAttribute('value', ''+plus+'');
    
  }
  
  const galleryModal = document.getElementById('gallery');
  const galleryFactory = elmtFactory(
    'article',
    { id:'commandSlider'},
    elmtFactory(
      'button',
      { id:'lightbox_close', class:'botton_close', onclick:'close_lightbox()'},
      'X',
      ),
      elmtFactory(
        'button',
      { id:'lightbox_next' , class:'button_next', onclick:'nextPrev(1)'},
      '>',
      ),
    elmtFactory(
      'button',
      { id:'lightbox_prev', class:'button_prev', onclick:'nextPrev(-1)'},
      '<',
      )
  );
  galleryModal.appendChild(galleryFactory);
  

  


  function nextPrev(n){
    showLightbox( number += n);
  }

  const galleryElmt = document.getElementsByClassName('gallery_img');
  const commandSlider = document.getElementById('commandSlider');
  const allHeart = document.getElementsByClassName('groupHeart');
  function showLightbox(number){
    console.log(galleryElmt.length);
  if(number < 1){ number = galleryElmt.length };
  if(number>galleryElmt.length){ number = 1 };
  for( elmt of galleryElmt){
    elmt.style.display = 'none';
  }
  for( elmt of allHeart){
    elmt.style.display ='none'
  }
  galleryElmt[number-1].style.display= 'block';
  galleryModal.setAttribute('class', 'lightbox')
  commandSlider.style.display= 'flex';
  }

  function close_lightbox(){
    galleryModal.setAttribute('class','gallery');
    for( elmt of galleryElmt){
      elmt.style.display = 'flex';
      commandSlider.style.display= 'none';
    }
    for( elmt of allHeart){
      elmt.style.display ='flex'
    }
  }

  
  
  
  
  
  
  