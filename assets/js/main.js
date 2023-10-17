
//select arow in learn more page

const dateArow=document.querySelector('#right');
const catogeryArow=document.querySelector('#left');

dateArow.addEventListener("click",()=>{
    document.querySelector('.ho-date-arow').classList.toggle('ho-arow');
})
catogeryArow.addEventListener("click",()=>{
    document.querySelector('.ho-catogery-arow').classList.toggle('ho-arow');
})


// API Learn more articles

let articlesData = [];
let url = 'https://mountain.lavetro-agency.com/api/dashboard/articles?';

const selectDate = document.querySelector('.date-select');
const selectCategory = document.querySelector('.select-catogery');


let newUrl = url ;



selectDate.addEventListener('change', function() {
  if (selectDate.value == ' '&selectCategory.value == ' '){
    newUrl = url
    getData();
  }else if(selectDate.value != ' '&selectCategory.value == ' '){
    newUrl = url +"date=" + selectDate.value;

  getData();
  }else if(selectDate.value != ' '&selectCategory.value!= " "){
    newUrl = url +"date=" + selectDate.value+"&category="+selectCategory.value ;
  
    getData();
  }
  else if(selectDate.value == ' '&selectCategory.value!= ' '){
    newUrl = url +"category=" + selectCategory.value ;
    
    getData(); 

  }
  
});
selectCategory.addEventListener('change', function() {
  if (selectDate.value == ' '&selectCategory.value== ' '){
    newUrl = url
    getData();
  }else if(selectDate.value != ' '&selectCategory.value== ' '){
    newUrl = url +"date=" + selectDate.value ;
    getData();
  }else if(selectDate.value != ' '&selectCategory.value!= ' '){
    newUrl = url +"date=" + selectDate.value +"&category="+ selectCategory.value;
  
    getData();
  }else if(selectDate.value == ' '&selectCategory.value!= ' '){
    newUrl = url +"category=" + selectCategory.value ;
    getData();
  }

  
});

async function getData( ) {
  if (articlesData.length === 0) {
    await fetch(url)
      .then(res => res.json())
      .then(res => articlesData = res.data);
  }else{
    await fetch(newUrl)
      .then(res => res.json())
      .then(res => articlesData = res.data);
  }
  const Cards = document.querySelector('.learn-more');
  Cards.innerHTML = '';
  articlesData.forEach(data => {
    const card = document.createElement("div");
    card.classList.add('ho-article-card');

    const cardImg = document.createElement("img");
    cardImg.src = data.article_cover;
    cardImg.alt = data.category;
    card.appendChild(cardImg);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add('ho-card-info');
    card.appendChild(cardInfo);

    const cardTitle = document.createElement("h3");
    if (document.querySelector(".en").classList.contains("active")) {
      cardTitle.innerHTML = data.title.en;
    } else {
      cardTitle.innerHTML = data.title.ar;
    }
    cardInfo.appendChild(cardTitle);

    const cardContent = document.createElement("p");
    if (document.querySelector(".en").classList.contains("active")) {
      cardContent.innerHTML = data.content.en;
    } else {
      cardContent.innerHTML = data.content.ar;
    }
    cardInfo.appendChild(cardContent);

    const cardDate = document.createElement("h5");
    cardDate.innerHTML = data.date;
    cardInfo.appendChild(cardDate);

    const cardButton = document.createElement("button");
    const cardLink = document.createElement("a");
    cardLink.href = `blog.html`;
    if (document.querySelector(".en").classList.contains("active")) {
      cardLink.innerHTML = 'Read Article';
    } else {
      cardLink.innerHTML = 'أقرأ المقالة';
    }
    cardButton.appendChild(cardLink);
    cardInfo.appendChild(cardButton);

    Cards.appendChild(card);

    if (typeof(Storage) !== "undefined") {
      cardButton.addEventListener("click", () => {
        const url = `https://mountain.lavetro-agency.com/api/dashboard/articles/${data.id}`;
        const catogeryUrl = `https://mountain.lavetro-agency.com/api/dashboard/articles?category=${data.category}&id!=${data.id}`;
        localStorage.setItem("nameId", url);
        localStorage.setItem("catodery", catogeryUrl);
        
       
      });
    } else {
      console.log("عذرًا، مستعرضك لا يدعم Local Storage.");
    }
    
    
  });
}





function reloadGetData() {
  
  getData();
}

const enLang = document.querySelector(".en");
const arLang = document.querySelector(".ar");

arLang.addEventListener('click', reloadGetData);
enLang.addEventListener('click', reloadGetData);
// get category and date filter


async function getDateCatogery( ) {
  if (articlesData.length === 0) {
    await fetch('https://mountain.lavetro-agency.com/api/dashboard/articles')
      .then(res => res.json())
      .then(res => articlesData = res.data);
  }
  
// get date api select
  const selectDate = document.querySelector('.date-select');
  selectDate.innerHTML= '';
  const createDate =document.createElement('option');
 createDate.value = " ";
  selectDate.appendChild(createDate).innerHTML='Date';
  let dates = [...new Set(articlesData.map(ele => ele.date))];
 
  dates.forEach(data =>{
    const createDate =document.createElement('option');
    
    selectDate.appendChild(createDate).innerText = data;
   
    createDate.value = data;

  })
  // get Category api select
  const selectCategory = document.querySelector('.select-catogery');
  selectCategory.innerHTML= '';
  const createCatogery =document.createElement('option');
 createCatogery.value = " ";
  selectCategory.appendChild(createCatogery).innerHTML='Catogery';

  let categories = [...new Set(articlesData.map(ele => ele.category))];
  console.log(categories);
  categories.forEach(data =>{
    const createCatogery =document.createElement('option');
    
    selectCategory.appendChild(createCatogery).innerText = data;

    createCatogery.value = data;

  })

}
getDateCatogery();

// get pagenation for articles