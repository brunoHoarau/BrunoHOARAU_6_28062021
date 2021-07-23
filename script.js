

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