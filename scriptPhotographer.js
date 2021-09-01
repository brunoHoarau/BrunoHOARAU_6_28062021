/* eslint no-console: ["log", { allow: [log] }] */
// Recovery Url params

const queryStringUrlId = window.location.search;
const urlParams = new URLSearchParams(queryStringUrlId);
let paramsId = urlParams.get('id');

// Recovery somes elments & creat tab

const photographerHead = document.getElementById('photographer_header');
const mainPhotographer = document.getElementById('main_photographer');
const articleSortBy = document.getElementById('article_sortBy');
const gallery = document.getElementById('gallery');
const likesElmts = document.getElementsByClassName('lImg_likes');



let allmedia = [];
let arrayImg = [];
let arrayLikes = [];
let firstName;
let pricePhotograph;
let data;


// to fecth to all data and fecht on Only One photographer
function fetchOnePhotographerData(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        let photographer = new Photographer(data.name, data.id, data.city, data.country, data.portrait, data.tagline, data.price, data.tags);
        if ( data.id == paramsId){
          let name = photographer.name;
          firstName = name.split(' ');
          showPhotographerHeader(photographer);
          pricePhotograph = photographer.price;
        }
      }
    })
    .catch(error => alert ('Erreur : ' + error)); // eslint-disable-line no-alert
}
fetchOnePhotographerData();


// creat class to simplify the use of data

class Photographer {
  constructor(name, id, city, country, portrait, tagline, price, tags){
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

// to fecth one photographer specifically

function fetchOnePhotographerMedia(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      getDatas(datas);
      setDatas(datas);

    })
    .catch(error => alert ('Erreur : ' + error)); // eslint-disable-line no-alert
}
fetchOnePhotographerMedia();

// function to loop and extract data
function getDatas(datas){
  for( data of datas.media){
    if ( data.photographerId == paramsId){
      arrayLikes.push(data.likes);
      allmedia.push(data);
      if(data.image){
        arrayImg.push(data.image);
      } else {
        arrayImg.push(data.video);
      }
    }
  }
}

// to exploit data
function setDatas(){
  showTotalLikes();
  let valueSelected = 'Popularité';
  sortBy(valueSelected);
}

// to incrment likes by keydown prop
function keydownIncrement(numb){
  increment(numb);
}

// pattern tp create dom elmts
const elmtFactory = (nodeName, attribute, ...children) => {
  const elmt = document.createElement(nodeName);
    for(key in attribute){
      elmt.setAttribute(key, attribute[key]);
    }

    children.forEach(child => {
      if (typeof child === 'string'){
        elmt.appendChild(document.createTextNode(child));
      } else {
        elmt.appendChild(child);
      }
    });
    return elmt;
  };

// function to sort
function sortBy(valueSelected){
    if(valueSelected == 'Popularité' || '' ){
     allmedia.sort((a, b)=> { return a.likes > b.likes ? -1 : '';});
     imgCardFactory(gallery);
    }
    if(valueSelected == 'Date'){
     allmedia.sort((a, b)=> { return a.date < b.date ? -1 : '';});
     imgCardFactory(gallery);
    }
    if(valueSelected == 'Titre'){
     allmedia.sort((a, b)=> { return a.title < b.title ? -1 : '';});
     imgCardFactory(gallery);
    }
  }

//to show the totals of likes
  function showTotalLikes(){
    let numberTotalLikes = 0;
    let totalLikes;
    allmedia.forEach( elmt => {
      if(elmt.image){
      numberTotalLikes += elmt.likes;
      }
    });
  totalLikes = elmtFactory('article', {class: 'totalLikes'},
    elmtFactory('section', { class: 'totalLikes_section', value: numberTotalLikes}, numberTotalLikes.toString(),
      elmtFactory('img', { src: './public/coeur.svg', id: 'totalLikes_img', alt: 'likes'})),
    elmtFactory('section', { class: 'totalLikes_section_price'}, pricePhotograph.toString() + '€ / jour'),
    );
  photographerHead.appendChild(totalLikes);
}

// to show the doata of one photographer by pattern
function showPhotographerHeader(photographer){

  const head = elmtFactory('section', { class: 'profile'},
  elmtFactory('div', {class: 'profile_div' },
  elmtFactory('h1', { id: 'h1_profile', tabIndex: 0}, photographer.name),
  elmtFactory('button', {id: 'card_contact', arialabel: 'Contact me'}, 'Contactez-moi')),
  elmtFactory('img', {class: 'profile_picture', src: './public/Photographers ID Photos/' + photographer.portrait, alt: '', tabIndex: 0 }, ),
  elmtFactory('p', {class: 'card_location', tabIndex: 0}, photographer.city + ', ' + photographer.country),
  elmtFactory('p', {class: 'card_slogan', tabIndex: 0}, photographer.tagline),
  elmtFactory('p', {class: 'card_price', tabIndex: 0}, photographer.price + '€'), );
  const contact = elmtFactory('section', {id: 'section_contact'}, );
  const sortBySection = elmtFactory('section', {id: 'sortBy'}, );

  const sortByLabel = elmtFactory('label', {id: 'sortBy_label', for: 'sortSelect'}, 'Trier par',
  elmtFactory('select', {id: 'sortSelect', name: 'Order by', labelledBy: 'Order by', onchange: 'sortBy(value)'}), );


  sortBySection.appendChild(sortByLabel);
  articleSortBy.appendChild(sortBySection);
  const sortBySelect = document.getElementById('sortSelect');
  const arraySelect = ['Popularité', 'Date', 'Titre' ];
  arraySelect.forEach( elmt => { let option = elmtFactory('option', {value: elmt}, elmt);
    sortBySelect.appendChild(option);
  });
  sortBySelect.firstChild.selected = "true";

// creat the form
  const form =
    elmtFactory('form', {id: 'section_form', role: 'dialog'},
      elmtFactory('button', {id: 'close_contact'},
        elmtFactory('img', { src: './public/closeContact.png', id: 'close_contact_img'})),
      elmtFactory('h1', {id: 'section_form_h1', tabindex: 0}, 'Contactez-moi \n' + photographer.name),
      elmtFactory('fieldset', {id: 'section_form_fieldset'},
        elmtFactory('label', {for: 'firstname'}, 'Prénom'),
        elmtFactory('input', {id: 'firstname', required: true, ariaRequired: true}, ),
        elmtFactory('label', {for: 'name'}, 'Nom'),
        elmtFactory('input', {id: 'name', required: true, ariaRequired: true}, ),
        elmtFactory('label', {for: 'email'}, 'email'),
        elmtFactory('input', {id: 'email', required: true, ariaRequired: true}, ),
        elmtFactory('label', {for: 'message'}, 'Votre message'),
        elmtFactory('textarea', {id: 'message', rows: 8, required: true, ariaRequired: true}, ),
        elmtFactory('button', {type: 'submit', id: 'submit_contact', class: 'submit_contact'}, 'Envoyer'), ), );


// to create list of tags
let ulCard = elmtFactory('ul', {class: 'card_ul'}, );

  let li = photographer.tags.map( (value) => {
    return ('<li class="card_ul_li" ><a href="index.html?tag=' + value + '" ><span>#</span>'
    + value + '</a></li>');});

    li = li.toString().replace(/[, ]+/g, ' ').trim();
    photographerHead.appendChild(head);
    photographerHead.appendChild(contact);
    head.appendChild(ulCard);
    const sectionContact = document.getElementById('section_contact');
    sectionContact.appendChild(form);
    ulCard.innerHTML += (li);
    // Contact Me event
    const contactButton = document.getElementById('card_contact');
     //to Open contact form
    contactButton.addEventListener('click', () => {
      sectionContact.style.display = 'flex';
      sectionContact.setAttribute('aria-hidden', 'false');
      mainPhotographer.setAttribute('aria-hidden', 'true');
      photographerHead.setAttribute('aria-hidden', 'true');
    });

    sectionContact.setAttribute('aria-hidden', 'true');
    const sectionForm = document.getElementById('section_form');
    sectionForm.setAttribute('aria-describedby', 'contact');

//to close contact form
    const closeContact = document.getElementById('close_contact');
    closeContact.addEventListener('click', (e)=> {
      e.preventDefault();
      closeContactFunction();
    });

    function closeContactFunction() {
      sectionContact.style.display = 'none';
      sectionContact.setAttribute('aria-hidden', 'true');
      mainPhotographer.setAttribute('aria-hidden', 'false');
      photographerHead.setAttribute('aria-hidden', 'false');
    }

    // to send ** msg into console
    const buttonSend = document.getElementById('submit_contact');
    buttonSend.addEventListener('click', (e) => {
      e.preventDefault();
      const firstNameContact = document.getElementById('firstname').value;
      console.log('firstname: ' + firstNameContact);
      const nameContact = document.getElementById('name').value;
      console.log('name: ' + nameContact);
      const emailContact = document.getElementById('email').value;
      console.log('email: ' + emailContact);
      const msgContact = document.getElementById('message').value;
      console.log('massage: ' + msgContact);

      closeContactFunction();
    });

    }

// creat lightbox command
const lightboxCommand = elmtFactory('article', { id: 'commandSlider'},
  elmtFactory('button', { id: 'commandSlider_close', class: 'botton_close', onclick: 'closeLightbox()'},
    elmtFactory('img', { src: './public/close.svg', alt: 'Close dialog'}),
  ),
  elmtFactory(
    'a', {id: 'lightbox_next', class: 'button_next', onclick: 'nextPrev(1)'},
      elmtFactory('img', { src: './public/next.svg', alt: 'Next image'}, ),
  elmtFactory(
    'a', { id: 'lightbox_prev', class: 'button_prev', onclick: 'nextPrev(-1)'},
      elmtFactory('img', { src: './public/previous.svg', alt: 'Previous image'}, )
  )
));



mainPhotographer.appendChild(lightboxCommand);



// create to show image
function imgCardFactory(element){

      let number = 1;
      let numbLike = 0;
      element.innerHTML = '';
      allmedia.forEach( elmt => {
      const sectionCard = elmtFactory(
        'section',
        { class: 'section_card'}
      );
    if( elmt.image){
      let imgCard = elmtFactory(
        'img',
        { class: 'lImg', src: './public/' + firstName[0] + '/' + elmt.image, class: 'section_card_img', id: 'gallery_img', alt: elmt.title +', closeup view', onclick: 'showLightbox(' + number + ')', onkeydown: "if(event.code === 'Enter'){showLightbox(" + number + ")}", tabIndex: 0},
        );
      let titleImg = elmtFactory('p', {class: 'lImg_tilte', tabIndex: 0}, elmt.title);
      const cardFooter = elmtFactory('div', { class: 'card_footer'}, );
      const likesGroup = elmtFactory('div', {class: 'groupHeart'}, );
      let likes = elmtFactory('p', {class: 'lImg_likes', tabIndex: 0}, elmt.likes.toString(), );
        let heart = elmtFactory('img', {src: './public/coeur.svg', class: 'lImg_svg', alt: 'likes', value: elmt.likes, onclick: 'increment(' + numbLike + ')', onkeydown: "if(event.code === 'Space'){keydownIncrement(" + numbLike + ")}", tabIndex: 0}, );


      sectionCard.appendChild(imgCard);
      likesGroup.appendChild(likes);
      likesGroup.appendChild(heart);
      element.appendChild(sectionCard);
      sectionCard.appendChild(cardFooter);
      cardFooter.appendChild(titleImg);
      cardFooter.appendChild(likesGroup);

      } else {
        let videoCard = elmtFactory(
        'video',
        {class: 'lImg', src: './public/' + firstName[0] + '/' + elmt.video, class: 'section_card_img', id: 'gallery_img', type: 'video/mp4', alt: elmt.title +', closeup view', onclick: 'showLightbox(' + number + ')', onkeydown: "if(event.code === 'Enter'){showLightbox(" + number + ")}", tabIndex: 0},
        elmtFactory(
          'p', {class: 'lImg_tilte', tabIndex: 0}, elmt.title), );
        let titleImg = elmtFactory(
          'p',
          {class: 'lImg_tilte', tabIndex: 0},
          elmt.title
        );
        const cardFooter = elmtFactory('div', { class: 'card_footer'}, );
        const likesGroup = elmtFactory(
          'div',
          {class: 'groupHeart'},
        );
        let likes = elmtFactory(
          'p',
          {class: 'lImg_likes', tabIndex: 0},
          elmt.likes.toString(), );
        let heart = elmtFactory(
          'img',
          {src: './public/coeur.svg', class: 'lImg_svg', value: elmt.likes, onclick: 'increment(' + numbLike + ')', onkeydown: "if(event.code === 'Space'){keydownIncrement(" + numbLike + ")}", tabIndex: 0},
        );
        sectionCard.appendChild(videoCard);
      likesGroup.appendChild(likes);
      likesGroup.appendChild(heart);
      element.appendChild(sectionCard);
      sectionCard.appendChild(cardFooter);
      cardFooter.appendChild(titleImg);
      cardFooter.appendChild(likesGroup);

      }
      number += 1; 
      numbLike += 1;

    });

  }

const heartElmts = document.getElementsByClassName('lImg_svg');

function increment(numb){
  var plus = heartElmts[numb].getAttribute('value');
  plus++;
  likesElmts[numb].innerHTML = plus;
  heartElmts[numb].setAttribute('value', '' + plus + '');
  const totalLikesSection = document.getElementsByClassName('totalLikes_section')[0];
  const totalLikesImg = document.getElementById('totalLikes_img');
  let totalLikesValue = document.getElementsByClassName('totalLikes_section')[0].getAttribute('value');
  totalLikesValue++;
  totalLikesSection.setAttribute('value', totalLikesValue);
  totalLikesSection.innerHTML = totalLikesValue.toString();
  totalLikesSection.appendChild(totalLikesImg);
}

const galleryElmt = document.getElementsByClassName('section_card');
const galleryImg = document.getElementsByClassName('section_card_img');
const commandSlider = document.getElementById('commandSlider');
const allHeart = document.getElementsByClassName('groupHeart');

let currentNumberSlide = 0;

function nextPrev(n){
  showLightbox( currentNumberSlide += n);
}

// to show ligthbox - slider
  function showLightbox(number){
    currentNumberSlide = number;
    if(currentNumberSlide < 1){ currentNumberSlide = galleryElmt.length; }
    if(currentNumberSlide > galleryElmt.length){ currentNumberSlide = 1; }
    let lightboxImg = document.getElementById('lightbox_img');
    let lightboxSection = document.getElementById('lightbox_section');
    lightboxSection ? lightboxSection.removeAttribute('id') : '';
    lightboxImg ? lightboxImg.setAttribute('id', 'gallery_img') : '';
    for( elmt of galleryElmt){
      elmt.style.display = 'none';
    }
    for( elmt of allHeart){
      elmt.style.display = 'none';
    }
    galleryElmt[currentNumberSlide - 1].style.display='flex';
    galleryElmt[currentNumberSlide - 1].setAttribute('id', 'lightbox_section');
    galleryImg[currentNumberSlide - 1].setAttribute('id', 'lightbox_img');
    commandSlider.style.display = 'flex';
    gallery.setAttribute('class', 'lightbox');
  }

// to close lightbox - slider
function closeLightbox(){
  let lightboxImg = document.getElementById('lightbox_img');
  lightboxImg ? lightboxImg.setAttribute('id', 'gallery_img') : '';
  let lightboxSection = document.getElementById('lightbox_section');
  lightboxSection ? lightboxSection.removeAttribute('id') : '';
  gallery.setAttribute('class', 'gallery');
  // lightboxImg.removeAttribute('id');
    for( elmt of galleryElmt){
      elmt.style.display = '';
      commandSlider.style.display = 'none';

    }
    for( elmt of allHeart){
      elmt.style.display =''
    }
  }

// evnt when keydow
document.addEventListener('keydown', (e)=>{
  if(e.code === 'Space'){
    e.stopPropagation();
    e.preventDefault();
  }
  if(e.code === 'ArrowLeft'){
    nextPrev(-1);
  } else if(e.code === 'ArrowRight'){
    nextPrev(1);
  } else if(e.code === 'Escape' ){
    closeLightbox();
  }
}
);