// Recupération DOM
const sectionIndex = document.getElementById('article_index');
let headerNav = document.getElementById('navUl');
let datArray = [];
let arrayId = []
let tabTags = [];

fetch('./FishEyeData.json')
.then(res => res.json())
.then( function (datas) { 
  datArray.push(datas.photographers);
  console.log(datArray);

  //parcourir les données JSON
  for( let data of datas.photographers){  
    arrayId.push(data.id);
    let photographer = new Photographer(data.name,data.id,data.city,data.country,data.portrait,data.tagline,data.tags);
    //show tags into nav
    photographer.tags.forEach( elmt => { 
      if(elmt != 'sports'){
        tagsNav(elmt);
      }
    });
    // showCards(photographer);
    if(arrayId.includes(data.id)){
      console.log(arrayId)
      showCards(data);}
    
  };
  
  // Nav tab affichage tags
  tabTags.forEach( tags => { headerNav.innerHTML += tags })
} )
.catch(error => alert ("Erreur : " + error));

class Photographer {
  constructor(name,id,city,country,portrait,tagline,tags){
    this.name = name;
    this.id = id;
    this.city = city; 
    this.country = country; 
    this.portrait = portrait; 
    this.tagline = tagline; 
    this.tags = tags; 
  }
}

// function showCards(photographer){
// 
// }

function tagsNav(elmt){
  elmt = elmt.charAt(0).toUpperCase() + elmt.slice(1);
        elmt = "<li class='nav_ul_li' value="+elmt+" >#"+elmt+"</li>";
        tabTags.includes(elmt) ? '' : tabTags.push(elmt);
} 

headerNav.addEventListener('click', (e) => choosedCards(e));

function choosedCards(data){

  if(arrayId.includes(data.id)){
  console.log(arrayId)
  showCards(data);
}

}

headerNav.addEventListener('click', (ul) => showSelected(ul));

function showSelected(ul){
  const num = [195];//
  arrayId = [ ...num]
  console.log(arrayId)
}

function showCards(photographer){
  const name = '<h2 class="card_name">'+photographer.name+'</h2>';
  const img = '<img class="card_picture" src="../public/'+photographer.portrait+'">';
  const location = '<p class="card_location">'+photographer.city+', '+photographer.country+'</p>';
  const slogan = '<p class="card_slogan">'+photographer.tagline+'</p>';
  const price = '<p class="card_price">'+photographer.price+' €/jour</p>';
  let ulSection = "<ul class='card_ul'>";
  photographer.tags.forEach(value => {
      ulSection += "<li class='card_ul_li'>#"+value+"</li>";
    });
    
    ulSection += "</ul>";
    
    sectionIndex.innerHTML += ' <section class="card">' +
    img + name + location + slogan + price + ulSection +'</section>'; 
}