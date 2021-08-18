

// Recupération DOM
const sectionIndex = document.getElementById('article_index');
let headerNav = document.getElementById('navUl');
let dataTab = [];
let tabTags = [];

fetch('./FishEyeData.json')
.then(res => res.json())
.then( function (datas) { 
  
  console.log(datas.photographers.length)
  //parcourir les données JSON
  for( let data of datas.photographers){   
    
    dataTab = new Photographer(data.name,data.city,data.country,data.portrait,data.tagline,data.tags);    
    
    dataTab.tags.forEach( elmt => { 
      if(elmt != 'sports'){
        tagsNav(elmt);
      }
    });
    showCards(dataTab);
  };// Recupération DOM
  const sectionIndex = document.getElementById('article_index');
  let headerNav = document.getElementById('navUl');
  sectionIndex.innerHTML = '';
  let allPhotographers = [];
  let tagsArray = [];
  
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
          showCardsPhotographers(photographer);
        }
    showTagsNav();
      })
      .catch(error => alert ("Erreur : " + error));
  }
  fetchDataPhotographer();
  
  function showCardsPhotographers(photographer){
    let ulSection = "<ul class='card_ul'>";
    photographer.tags.forEach(value => {
      ulSection += "<li class='card_ul_li'>#"+value+"</li>";
      getTagsElement(value);
    })
  
    sectionIndex.innerHTML += ' <section class="card"><a href="photographer-page.html?id='+photographer.id +'">' +
                                  '<img class="card_picture" src="./public/'+photographer.portrait+'">' +
                                  '<h2 class="card_name">'+photographer.name+'</h2>'
                                   + '<p class="card_location">'+photographer.city+', '+photographer.country+'</p>' + '<p class="card_slogan">'+photographer.tagline+'</p>' + '<p class="card_price">'+photographer.price+' €/jour</p>' + ulSection +'</ul></a></section>';
  }
  
  function showTagsNav() {
    tagsArray.forEach( tags => { headerNav.innerHTML += tags })
  }
  
  
  headerNav.addEventListener('click', (ul) => {
    const liValue = ul.target.getAttribute('value');
    sectionIndex.innerHTML = "";
    for( photographer of allPhotographers){
      allPhotographers = [];
      if( photographer.tags.includes(liValue)){
        showCardsPhotographers(photographer);
      }
    }
    initData();
  })
  
  function getTagsElement(value){
    let brutValue = value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
          value = "<li class='nav_ul_li' value="+brutValue+" >#"+value+"</li>";
          tagsArray.includes(value) ? '' : tagsArray.push(value);
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
  
  
  //Nav tab affichage tags
  tabTags.forEach( tags => { headerNav.innerHTML += tags })
} )
.catch(error => alert ("Erreur : " + error));

class Photographer {
  constructor(name,city,country,portrait,tagline,tags){
    this.name = name; 
    this.city = city; 
    this.country = country; 
    this.portrait = portrait; 
    this.tagline = tagline; 
    this.tags = tags;
  }

    addInArray(){
    const datArray = [];

  }

}const queryStringUrlId = window.location.search;
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
  } else {
    toContent.style.display = 'none';
    toContent.style.zIndex = 0;
  }
  }


function tagsNav(elmt){
  elmt = elmt.charAt(0).toUpperCase() + elmt.slice(1);
        elmt = "<li class='nav_ul_li' value="+elmt+" >#"+elmt+"</li>";
        tabTags.includes(elmt) ? '' : tabTags.push(elmt);
} 

function showCards(dataTab){
  const name = '<h2 class="card_name">'+dataTab.name+'</h2>';
  const img = '<img class="card_picture" src="../public/'+dataTab.portrait+'">';
  const location = '<p class="card_location">'+dataTab.city+', '+dataTab.country+'</p>';
  const slogan = '<p class="card_slogan">'+dataTab.tagline+'</p>';
  const price = '<p class="card_price">'+dataTab.price+' €/jour</p>';
  let ulSection = "<ul class='card_ul'>";
  // const liNav = document.getElementsByClassName('nav_ul_li');    
  dataTab.tags.forEach(value => {
      ulSection += "<li class='card_ul_li'>#"+value+"</li>";
    });
    
    ulSection += "</ul>";
    
    sectionIndex.innerHTML += ' <section class="card">' +
    img + name + location + slogan + price + ulSection +'</section>'; 
}

headerNav.addEventListener('click', (ul) => showSelected(ul));

function showSelected(ul){
  const liValue = ul.target.getAttribute('value');
  dataTab.tags.includes(liValue) ? "" : console.log(ul.index) ;
  console.log(liValue);
}