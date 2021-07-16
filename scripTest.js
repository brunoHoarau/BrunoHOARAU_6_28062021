// Recupération DOM
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

  sectionIndex.innerHTML += ' <section class="card"><a href="/photographer-page.html?id='+photographer.id +'">' +
                                '<img class="card_picture" src="../public/'+photographer.portrait+'">' +
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
