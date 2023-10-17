
let articleData =[];


async function getDataArticle() {
    if (articleData.length === 0) {
      await fetch(localStorage.getItem("nameId"))
        .then(res => res.json())
        .then(res => articleData = res.data);
    }
    const catogeryName = document.querySelector('.ho-hero-about');
    catogeryName.innerHTML='';
    const createCatogery = document.createElement('h2');
    createCatogery.classList.add('test');
    catogeryName.appendChild(createCatogery).innerHTML = articleData.category;
    const articleBody = document.querySelector('.ho-about');
    articleBody.innerHTML = '';
    const articleTitle = document.createElement('div');
    articleTitle.classList.add('ho-title-about');
    articleBody.appendChild(articleTitle);
    
    const newArticleTitle = document.createElement('h3');
    if (document.querySelector(".en").classList.contains("active")) {
      newArticleTitle.innerHTML = articleData.title.en;
    } else {
      newArticleTitle.innerHTML = articleData.title.ar;
    }
    articleTitle.appendChild(newArticleTitle);
    const dateArticle = document.createElement('p');
    articleTitle.appendChild(dateArticle).innerHTML = articleData.date;
    
    const nweArticleBody = document.createElement('p');
    if (document.querySelector(".en").classList.contains("active")) {
      nweArticleBody.innerHTML = articleData.content.en;
    } else {
      nweArticleBody.innerHTML = articleData.content.ar;

    }
    articleBody.appendChild(nweArticleBody);
    const articleTag = document.createElement('h5');

    articleData.tags.forEach(ele => {
      var spanTag = document.createElement("span");
      spanTag.innerHTML = ele.name;
      articleTag.appendChild(spanTag);
    });
    
    articleBody.appendChild(articleTag);
    console.log(articleBody);
    const imagesArticles =document.querySelector('.ho-photo-article');
    imagesArticles.innerHTML= "";
    const newImageArticles = document.createElement ('img');
   articleData.images.forEach(ele=>{
    imagesArticles.appendChild(newImageArticles).src = ele.path;
    newImageArticles.alt = "";

   })
   
  }

  

function reloadGetData() {
  
  getDataArticle();
}

const enLang = document.querySelector(".en");
const arLang = document.querySelector(".ar");

arLang.addEventListener('click', reloadGetData);
enLang.addEventListener('click', reloadGetData);
getDataArticle();
// get Related Articles

  // getRelatedArticle();
  // async function getRelatedArticle() {
  //   await fetch('https://mountain.lavetro-agency.com/api/dashboard/articles')
  //     .then(res => res.json())
  //     .then(res => relatedArtcles = res.data);
  // }   
  // getRelatedArticle();
  // console.log(relatedArtcles);
  let articlesData = [];
console.log(localStorage.getItem("catodery"));
  async function getData() {
    if (articlesData.length === 0  ) {
      await fetch(localStorage.getItem("catodery"))
        .then(res => res.json())
        .then(res => articlesData = res.data);
    }
    // articlesData.length < 4;
    const cards = document.querySelector('.ho-related-article-cards');
    cards.innerHTML ="";
    articlesData.forEach(data =>{
      const card = document.createElement('div');
      card.classList.add('ho-article-card');
      const imgCard = document.createElement('img');
      imgCard.src = data.article_cover;
      imgCard.alt=data.category;
      card.appendChild(imgCard);
      const infoCard = document.createElement('div');
      infoCard.classList.add('ho-card-info');
      card.appendChild(infoCard);
      const titleCard = document.createElement('h3');
      if (document.querySelector(".en").classList.contains("active")) {
        titleCard.innerHTML = data.title.en;
      } else {
        titleCard.innerHTML = data.title.ar;
      }
      infoCard.appendChild(titleCard);
      const bodyCard =document.createElement('p');
      if (document.querySelector(".en").classList.contains("active")) {
        bodyCard.innerHTML = data.content.en;
      } else {
        bodyCard.innerHTML = data.content.ar;
      }
      infoCard.appendChild(bodyCard);
      const dateCard =document.createElement('h5');
      dateCard.innerHTML = data.date;
      infoCard.appendChild(dateCard);
      const cardButton = document.createElement("button");
      const cardLink = document.createElement("a");
      cardLink.href = `blog.html`;
      if (document.querySelector(".en").classList.contains("active")) {
        cardLink.innerHTML = 'Read Article';
      } else {
        cardLink.innerHTML = 'أقرأ المقالة';
      }
      
      cardButton.appendChild(cardLink);
      infoCard.appendChild(cardButton);
  
      cards.appendChild(card);
  
      if (typeof(Storage) !== "undefined") {
        cardButton.addEventListener("click", () => {
          const url = `https://mountain.lavetro-agency.com/api/dashboard/articles/${data.id}`;
          localStorage.setItem("nameId", url);
         
        });
      }
      console.log(card);
     
    })
    
    

    
  
  
  
    console.log(articlesData);
    
  }
  function reloadGetDataRelated() {
  
    getData();
  }
  

  
  arLang.addEventListener('click', reloadGetDataRelated);
  enLang.addEventListener('click', reloadGetDataRelated);
  getData();
