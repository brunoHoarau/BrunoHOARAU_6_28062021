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
  elmtFactory('div',{class:'profile_div' },elmtFactory('h1',{ id:'h1_profile'},photographer.name), elmtFactory('button',{id:'card_contact', arialabel:'Contact me'},'Contactez-moi')),
  elmtFactory('img',{class:'profile_picture', src:'./public/'+photographer.portrait, alt:''},),
  elmtFactory('p',{class:'card_location'}, photographer.city+', '+photographer.country),
  elmtFactory('p',{class:'card_slogan'},photographer.tagline),
  elmtFactory('p',{class:'card_price'},photographer.price+'€'),
  );
  const contact = elmtFactory('section',{id:"section_contact"},);

  const sortBySection = elmtFactory('section', {id:'sortBy'}, 
  )
  const sortByLabel =   elmtFactory('label', {for:'sortSelect'},"Trier par",
    elmtFactory('select', {id:'sortSelect', name:'Order by', labelledBy:'Order by', onchange:'sortBy(value)'})
  )
  

  sortBySection.appendChild(sortByLabel);
  articleSortBy.appendChild(sortBySection);
  const sortBySelect = document.getElementById('sortSelect');
  const arraySelect = ['Popularité', 'Date', 'Titre' ];
  arraySelect.forEach( elmt => { let option = elmtFactory('option', {value:elmt}, elmt);
    sortBySelect.appendChild(option);
  })

  



  const form =
    elmtFactory('form', {id:'section_form', role:'dialog', ariaDescribedby:'contact'},
      elmtFactory('button',{id:'close_contact'}, 'X'),
      elmtFactory('h2', {id:'section_form_h2'}, "Contactez-moi " + photographer.name),
      elmtFactory('fieldset', {id:'section_form_fieldset'},
        elmtFactory('label', {for:'firstname'},'Prénom'),
        elmtFactory('input', {id:'firstname', required:true, ariaRequired:true},),
        elmtFactory('label', {for:'name'},'Nom'),
        elmtFactory('input', {id:'name', required:true, ariaRequired:true},),
        elmtFactory('label', {for:'email'},'email'),
        elmtFactory('input', {id:'email', required:true, ariaRequired:true},),
        elmtFactory('label', {for:'message'},'Votre message'),
        elmtFactory('textarea', {id:'message', required:true, ariaRequired:true},)
      ),
      elmtFactory('button',{ type:'submit', class:"submit_contact"},'Envoyer'),
    )


  let ulCard = elmtFactory(
     'ul',
     {class:'card_ul'},
    )

  let li = photographer.tags.map( (value) => {
    return ("<li class='card_ul_li' ><a href='index.html?tag="+value+"' ><span>#</span>"
    +value+
    "</a></li>")});
    
    li = li.toString().replace(/[, ]+/g, " ").trim();
    photographerHead.appendChild(head);
    photographerHead.appendChild(contact);
    head.appendChild(ulCard);
    const sectionContact = document.getElementById('section_contact');
    sectionContact.appendChild(form);
    ulCard.innerHTML += (li);
    // Contact Me event
    const contactButton = document.getElementById('card_contact');
     //to Open
    contactButton.addEventListener('click', (e) => {
      sectionContact.style.display='flex';
      sectionContact.setAttribute('aria-hidden','false');
      sectionContact.setAttribute('class', 'section_contact');
      mainPhotographer.setAttribute('aria-hidden','true');
      photographerHead.setAttribute('aria-hidden','true');
      e.preventDefault();
    })

      //to close

    }
    
const lightbox_command = 
elmtFactory('article',{ id:'commandSlider'},
  elmtFactory('button',{ id:'commandSlider_close', class:'botton_close', onclick:'close_lightbox()'},
    elmtFactory(
      'img',
      { src:'./public/close.svg', alt:'Close dialog'}),
  ),
  elmtFactory(
    'a',{id:'lightbox_next' , class:'button_next', onclick:'nextPrev(1)'},
      elmtFactory('img',{ src:'./public/next.svg', alt:'Next image'},)
  ),
  elmtFactory(
    'a',{ id:'lightbox_prev' , class:'button_prev', onclick:'nextPrev(-1)'},
      elmtFactory('img',{ src:'./public/previous.svg', alt:'Previous image'},)
  )
);

mainPhotographer.appendChild(lightbox_command);

function imgCardFactory(element){
      let number = 1;
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
        { class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.image, class:'section_card_img' ,id:'gallery_img', alt:elmt.title+', closeup view', onclick:'showLightbox('+number+')'},
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
          {src:'./public/coeur.svg',class:'lImg_svg', alt:'likes' , value:elmt.likes, onclick:'increment('+numbLike+')'},
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
        {class:'lImg', src:"./public/"+firstName[0]+"/"+elmt.video, class:'section_card_img' ,id:'gallery_img', type:"video/mp4", alt:elmt.title+', closeup view', onclick:'showLightbox('+number+')'},
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
  
  let currentNumberSlide = 0;

  function nextPrev(n){
    showLightbox( currentNumberSlide += n);
  }
  
  function showLightbox(number){
    currentNumberSlide = number;
    if(currentNumberSlide < 1){ currentNumberSlide = galleryElmt.length };
    if(currentNumberSlide > galleryElmt.length){ currentNumberSlide = 1 };
    console.log('entree function: '+currentNumberSlide );
    if(currentNumberSlide < 1){ currentNumberSlide = galleryElmt.length };
    if(currentNumberSlide > galleryElmt.length){ currentNumberSlide = 1 };
    console.log('sotie condition function: '+currentNumberSlide );
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
    galleryElmt[currentNumberSlide-1].style.display='flex';
    galleryElmt[currentNumberSlide-1].setAttribute('id', 'lightbox_section');
    galleryImg[currentNumberSlide-1].setAttribute('id', 'lightbox_img');
    commandSlider.style.display= 'flex';
    gallery.setAttribute('class', 'lightbox');
    console.log('sotie function: '+currentNumberSlide );
    
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

document.addEventListener('keydown', (e)=>{
  e.preventDefault();
  if(e.code === 'ArrowLeft'){
    nextPrev(-1)
  } else if(e.code === 'ArrowRight'){
    nextPrev(1)
  } else if(e.code === 'Escape' ){
    close_lightbox()
  }
})

  
  
  
  
  
  
  