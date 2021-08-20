const queryStringUrlId = window.location.search;
const urlParams = new URLSearchParams(queryStringUrlId);
let paramsTag = urlParams.get('tag');

// Recupération DOM
const main = document.getElementById('article_index');
let headerNav = document.getElementById('navUl');
let tagsNav = document.querySelectorAll('li');
const toContent = document.getElementById('toContent');
console.log(tagsNav)


main.innerHTML = '';
let allPhotographers = [];
let tagsArray = [];

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

function initData(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        allPhotographers.push(data);
      }
    }) 
    .catch(error => alert ("Erreur : " + error));
}


function fetchDataPhotographer(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        allPhotographers.push(data);
        let photographer = new Photographer(data.name,data.id,data.city,data.country,data.portrait,data.tagline,data.price,data.tags);
        createCards(photographer);
        photographer.tags.forEach(value => { getTagsElement(value);})
      }
  showTagsNav();
    })
    .catch(error => alert ("Erreur : " + error));
}

function fetchBytag(){
  fetch('./FishEyeData.json')
    .then(res => res.json())
    .then( function (datas) {
      for( data of datas.photographers){
        allPhotographers.push(data);
        let photographer = new Photographer(data.name,data.id,data.city,data.country,data.portrait,data.tagline,data.price,data.tags);
        if( photographer.tags.includes(paramsTag)){
            createCards(photographer);
          }
        photographer.tags.forEach(value => { getTagsElement(value);})
      }
  showTagsNav();
    })
    .catch(error => alert ("Erreur : " + error));
}

if(paramsTag){
  fetchBytag();
  console.log('Its true');
}else{
  fetchDataPhotographer();
}

function showTagsNav() {
  tagsArray.forEach( tags => { 
    headerNav.innerHTML += tags;
   });
  
}


headerNav.addEventListener('click', (ul) => {
  const liValue = ul.target.getAttribute('value');
 main.innerHTML = "";
  for( photographer of allPhotographers){
    allPhotographers = [];
    if( photographer.tags.includes(liValue)){
      createCards(photographer);
    }
  }
  initData();
})



function getTagsElement(value){
  let brutValue = value;
  value = value.charAt(0).toUpperCase() + value.slice(1);
  value = "<a href='index.html?tag="+brutValue+"'  class='card_ul_li'>#<span>"
  +value+"</span></a>";
        tagsArray.includes(value) ? '' : tagsArray.push(value);
}



function createCards(photographer){
  const sectionCard = elmtFactory(
    "section",
    {class:'card'},
  )

  const head = elmtFactory(
    'a',
    { href:'photographer-page.html?id='+photographer.id},
    elmtFactory('img',{class:'card_picture', src:'./public/'+photographer.portrait, alt:''},),
    elmtFactory('h2',{class:'card_name'},photographer.name),
    elmtFactory('p',{class:'card_location'}, photographer.city+', '+photographer.country),
    elmtFactory('p',{class:'card_slogan'},photographer.tagline),
    elmtFactory('p',{class:'card_price'},photographer.price+'€'),
   )
   
   let ul = elmtFactory(
     'ul',
     {class:'card_ul'},
    )

    let li = photographer.tags.map( (value) => {
      return ("<a href='index.html?tag="+value+"'  class='card_ul_li'>#<span>"
      +value+"</span></a>")});

    li = li.toString().replace(/[, ]+/g, " ").trim();

    main.appendChild(sectionCard);
    sectionCard.appendChild(head);
    sectionCard.appendChild(ul);
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

function liClick(value){
  var getValue = value.getAttribute('value')
  console.log(getValue);
  main.innerHTML = "";
  for( photographer of allPhotographers){
    allPhotographers = [];
    if( photographer.tags.includes(getValue)){
      createCards(photographer);
    }
  }
  initData();
}

// window.addEventListener('scroll', showTopContent)
let vertical = -1;
  window.onscroll =()=>{showTop()};
  function showTop() {
  vertical = window.scrollY;
  if(vertical > 100){
    toContent.style.display = 'block';
    toContent.style.position = 'fixed';
    toContent.style.zIndex = 10;
  } else {
    toContent.style.display = 'none';
    toContent.style.zIndex = 0;
  }
  }
