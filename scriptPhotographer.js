const queryStringUrlId = window.location.search;
const urlParams = new URLSearchParams(queryStringUrlId);
let paramsId = urlParams.get('id');

const photographerHead = document.getElementById('photographer_header');
const mainPhotographer = document.getElementById('main_photographer');
const articleSortBy = document.getElementById('article_sortBy');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
let imgCard;
const value = "Popularité";


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


function setDatas(){
  sortBy(value);
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

  function sortBy(value){
    if(value == 'Popularité' || "" ){
     allmedia.sort((a,b)=> { return a.likes > b.likes ? -1 : ""})
     imgCardFactory(gallery);
    }
    if(value == 'Date'){
     allmedia.sort((a,b)=> { return a.date < b.date ? -1 : ""})
     console.log(allmedia)
     imgCardFactory(gallery);
    }
    if(value == 'Titre'){
     allmedia.sort((a,b)=> { return a.title < b.title ? -1 : ""})
     console.log(allmedia)
     imgCardFactory(gallery);
    }
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
  const contact = elmtFactory('section',{id:"section_contact"},);

  const sortBySection = elmtFactory('section', {id:'sortBy'}, 
  )
  const sortByLabel =   elmtFactory('label', {for:'sortSelect'},"trier par",
    elmtFactory('select', {id:'sortSelect', name:'sortSelect', onchange:'sortBy(value)'})
  )
  

  sortBySection.appendChild(sortByLabel);
  articleSortBy.appendChild(sortBySection);

  const sortBySelect = document.getElementById('sortSelect');
  const arraySelect = ['Popularité', 'Date', 'Titre' ];
  arraySelect.forEach( elmt => { let option = elmtFactory('option', {value:elmt}, elmt);
    sortBySelect.appendChild(option);
  })

  



  const form =
    elmtFactory('form', {id:'section_form'},
    elmtFactory('button',{id:'close_contact'}, 'X'),
    elmtFactory('label', {for:'firstname'},'Prénom'),
    elmtFactory('input', {id:'firstname', required:true},),
    elmtFactory('label', {for:'name'},'Nom'),
    elmtFactory('input', {id:'name', required:true},),
    elmtFactory('label', {for:'email'},'email'),
    elmtFactory('input', {id:'email', required:true},),
    elmtFactory('label', {for:'message'},'Votre message'),
    elmtFactory('textarea', {id:'message', required:true},),
    elmtFactory('button',{ type:'submit', class:"submit_contact"},'Envoyer'),
  )

  let ulCard = elmtFactory(
     'ul',
     {class:'card_ul'},
    )
    
    let li = photographer.tags.map( (value) => {
      return ("<li class='card_ul_li'>#"
      +value+
      "</li>")});
      
      li = li.toString().replace(/[, ]+/g, " ").trim();
      photographerHead.appendChild(head);
      photographerHead.appendChild(contact);
      head.appendChild(ulCard);
      const sectionContact = document.getElementById('section_contact');
      sectionContact.appendChild(form);
      ulCard.innerHTML += (li);
      const contactButton = document.getElementById('card_contact');
  contactButton.addEventListener('click', (e) => {
    sectionContact.style.display='flex';
    sectionContact.setAttribute('class', 'section_contact');

    e.preventDefault()
  })
    }
    
    const lightbox_command = elmtFactory(
      'article',
      { id:'commandSlider'},
      elmtFactory(
        'button',
        { id:'lightbox_close', class:'botton_close', onclick:'close_lightbox()'},
        'X',
        ),
        elmtFactory(
          'a',
        { id:'lightbox_next' , class:'button_next', onclick:'nextPrev(1)'},
        '>',
        ),
      elmtFactory(
        'a',
        { id:'lightbox_prev', class:'button_prev', onclick:'nextPrev(-1)'},
        '<',
        )
        );
        mainPhotographer.appendChild(lightbox_command);

let number = 1;
        function imgCardFactory(element){
      let numbLike  = 0;
      element.innerHTML = "";
      allmedia.forEach( elmt => {
      const sectionCard = elmtFactory(
        'section',
        { class:'section_card'}
      );
    if( elmt.image){
      let imgCard = elmtFactory(
        'img',
        { class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.image, class:'section_card_img' ,id:'gallery_img', onclick:'showLightbox('+number+')'},
        );
      let titleImg = elmtFactory(
        'p',
        {class:'lImg_tilte'},
        elmt.title
      )
      const cardFooter = elmtFactory('div',{ class:'card_footer'},)
      const likesGroup = elmtFactory(
        'div',
        {class:'groupHeart'},
      );
      let likes = elmtFactory(
        'p',
        {class:'lImg_likes'},
        elmt.likes.toString(),
        )
        let heart = elmtFactory(
          'img',
          {src:'./public/coeur.svg',class:'lImg_svg' , value:elmt.likes, onclick:'increment('+numbLike+')'},
        )
      
      
      sectionCard.appendChild(imgCard);
      likesGroup.appendChild(likes);
      likesGroup.appendChild(heart);
      element.appendChild(sectionCard)
      sectionCard.appendChild(cardFooter);
      cardFooter.appendChild(titleImg);
      cardFooter.appendChild(likesGroup);

      } else {
        let imgCard = elmtFactory(
          
        'video',
        {class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.video, class:'section_card_img' ,id:'gallery_img', type:"video/mp4", onclick:'showLightbox('+number+')'},
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
        const cardFooter = elmtFactory('div',{ class:'card_footer'},)
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
          {src:'./public/coeur.svg',class:'lImg_svg' , value:elmt.likes, onclick:'increment('+numbLike+')'},
        )
        sectionCard.appendChild(imgCard);
      likesGroup.appendChild(likes);
      likesGroup.appendChild(heart);
      element.appendChild(sectionCard)
      sectionCard.appendChild(cardFooter);
      cardFooter.appendChild(titleImg);
      cardFooter.appendChild(likesGroup);

        
      }
      number += 1; 
      numbLike += 1; 

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
  const galleryElmt = document.getElementsByClassName('section_card');
  const galleryImg = document.getElementsByClassName('section_card_img');
  const commandSlider = document.getElementById('commandSlider');
  const allHeart = document.getElementsByClassName('groupHeart');
  
  function nextPrev(n){
    if(number < 1){ number = galleryElmt.length };
    if(number > galleryElmt.length){ number = 1 };
    console.log("entré nextPrev: " + number)
    console.log("entré nextPrev: " + n)
    showLightbox( number += n);
  }
  
  function showLightbox(number){
    console.log('entree function: '+number );
    if(number < 1){ number = galleryElmt.length };
    if(number > galleryElmt.length){ number = 1 };
    console.log('sotie condition function: '+number );
    let lightboxImg = document.getElementById('lightbox_img');
    let lightboxSection = document.getElementById('lightbox_section');
    lightboxSection ? lightboxSection.removeAttribute('id') : '';
    lightboxImg ? lightboxImg.setAttribute('id', 'gallery_img') : '';
    for( elmt of galleryElmt){
      elmt.style.display = 'none';
    }
    for( elmt of allHeart){
      elmt.style.display ='none'
    }
    galleryElmt[number-1].style.display='flex';
    galleryElmt[number-1].setAttribute('id', 'lightbox_section');
    galleryImg[number-1].setAttribute('id', 'lightbox_img');
    commandSlider.style.display= 'flex';
    gallery.setAttribute('class', 'lightbox');
    console.log('sotie function: '+number );
  }
  
  
function close_lightbox(){
  let lightboxImg = document.getElementById('lightbox_img');
  lightboxImg ? lightboxImg.setAttribute('id', 'gallery_img') : '';
  let lightboxSection = document.getElementById('lightbox_section');
  lightboxSection ? lightboxSection.removeAttribute('id') : '';
  gallery.setAttribute('class', 'gallery');
  // lightboxImg.removeAttribute('id');
    for( elmt of galleryElmt){
      elmt.style.display = '';
      commandSlider.style.display= 'none';

    }
    for( elmt of allHeart){
      elmt.style.display =''
    }
  }

  
  
  
  
  
  
  