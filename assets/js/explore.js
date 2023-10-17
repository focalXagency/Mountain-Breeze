







//slider hero

const slidimg= document.querySelectorAll(".slide-img")
const slidecontainer=document.querySelector(".slider-container");
const nextbtn=document.querySelector(".next-btn");
const prevbtn=document.querySelector(".prev-btn");
const dots=document.querySelector(".dots");
const numall=document.querySelector(".all");
const cureentnum=document.querySelector(".cureentnum");


//const
let numImg= slidimg.length;
// numall.innerHTML=slidimg.length
let slideWidth= slidimg[0].clientWidth;
let current = 0;

// set up slider

function inite() {
    slidimg.forEach((img , i)=>{
        img.style.dispaly = "none";
    });

    slidimg[0].classList.add("slider1-active");
}

inite();

//create dots
function createDots() {

    for (let i = 0; i < numImg; i++) {
        const dot= document.createElement("div");
        dot.classList.add("single-dot");
       dots.appendChild(dot)
        dot.addEventListener('click', ()=>{
            getslide(i);
        })
    }

    dots.children[0].classList.add("dot-active");


}

createDots();



function getslide(slidnum){
    slidecontainer.style.dispaly="block";

     current=slidnum;
      setActive();
}


//active slide
function setActive(){
    let cureentA = document.querySelector(".slide-img.slider1-active");
    cureentA.classList.remove("slider1-active");
    slidimg[current].classList.add("slider1-active");


    // set active dot
    let cureentd = document.querySelector(".single-dot.dot-active");
    cureentd.classList.remove("dot-active");
    dots.children[current].classList.add("dot-active");
   
}

let slideIndex = 0;
showSlides();

function showSlides() {

    let cureentA = document.querySelector(".slide-img.slider1-active");
    cureentA.classList.remove("slider1-active");
    slidimg[current].classList.add("slider1-active");
    let cureentd = document.querySelector(".single-dot.dot-active");
    cureentd.classList.remove("dot-active");
    dots.children[current].classList.add("dot-active");
     current++;
     if (current >=6) {
        current=0
        
     }
    // current=slidnum;
   setActive();
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}





//silder-section-item

let sliderSC=document.querySelector(".slider-item");
let sliderInner=document.querySelector(".slider-inner");
let scdot=document.querySelectorAll(".dot-sc")
let pressed = false;
let prevPageX, prevScrollLeft;


sliderSC.addEventListener('mousedown', (e)=>{
  pressed = true;
  prevPageX = e.pageX;
  prevScrollLeft = sliderSC.scrollLeft;
    sliderSC.style.cursor='grabbing'
})


sliderSC.addEventListener('mouseup', ()=>{
    sliderInner.style.cursor='grab'

})
window.addEventListener('mouseup', ()=>{
  pressed = false;
})


sliderSC.addEventListener('mousemove', (e)=>{
    if (!pressed) return;
    e.preventDefault();
    let postionDiff = e.pageX - prevPageX;
    sliderSC.scrollLeft = prevScrollLeft - postionDiff;
})


//get slide

scdot.forEach((i , k) => {
    scdot[0].classList.add('activedot');
    sliderInner.children[0].focus();
   i.addEventListener('click', ()=>{
   

     
       console.log(sliderInner.children[k].clientWidth *  k )
           sliderSC.scrollLeft =  sliderInner.children[k].clientWidth *  k
           sliderInner.children[k].focus();
        
            document.querySelector('.activedot').classList.remove('activedot');
            scdot[k].classList.add('activedot');
            
          
        
});


})

let slide = sliderInner.querySelectorAll(".section-item")
slide.forEach((i , k) => {
   sliderInner.addEventListener('mouseout', ()=>{
        if (i === document.activeElement)
        {
            document.querySelector('.activedot').classList.remove('activedot')
            scdot[k].classList.add('activedot');  
        }
   })


    i.addEventListener('focus', ()=>{
        document.querySelector('.activedot').classList.remove('activedot')
        scdot[k].classList.add('activedot');
    })


   })



// clips
let width =window.innerWidth

window.addEventListener("resize" , ()=>{


if (window.innerWidth<= 800) {
   document.querySelector("#clips").classList.remove('clips'); 
   document.querySelector("#clips").classList.add('clips1'); 

} 
else{
   
   document.querySelector("#clips").classList.add('clips');
   document.querySelector("#clips").classList.remove('clips1');
}


}) 


if (width <=800) {
   document.querySelector("#clips").classList.add('clips1');
   document.querySelector("#clips").classList.remove('clips');
  }

// 

  let restaurant;
 
  async function restaurant1() {
    const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Restaurant");
    const data = await response.json();
    restaurant = data.data;
    restaurant11( restaurant)
} 
async function restaurant11( restaurant) {
    let card = ""
    let en = document.querySelector(".en")
     
      restaurant.forEach((element, i) => {
  
          card += `
          ${en.classList.contains("active")== true ?` <div class="card2">` : ` <div class="card2 arfont">`}
          <div class="img-card">
              <img src=${element.article_cover} alt="">
          </div>
         <div class="card-text">
             <h1 class="card2-h1" >
              ${en.classList.contains("active") == true ? element.title.en : element.title.ar}
              </h1>
          <p class="card2-p" >
              ${en.classList.contains("active") == true ? element.sub_title.en : element.sub_title.ar}
              </p>
            <div class="card2-p2" >
              ${en.classList.contains("active") == true ? element.description.en : element.description.ar}
              </div>
          </div>
      </div>
       
        `
        
    
      })
  
    
    
    
   
      
  
   
      document.querySelector(".container1").innerHTML = card
      document.querySelector(".ar").addEventListener('click', () => {
        restaurant11(restaurant)
      })
    
      document.querySelector(".en").addEventListener('click', () => {
        restaurant11(restaurant)
      })
      
      
      }
  
      restaurant1();
  
// fetch rome data and show it

  let Chalet;

  async function Chalet1() {
    const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Chalet");
    const data = await response.json();
    Chalet = data.data;
    Chalet11(Chalet) 
  }
  
  async function Chalet11(Chalet) {
    let card = ""

    let en = document.querySelector(".en")
     
    Chalet.forEach((element, i) => {

        card += `
        ${en.classList.contains("active")== true ?` <div class="card1">` : ` <div class="card1 arfont">`}
        <div class="img-card">
            <img src=${element.article_cover} alt="">
        </div>
        <div class="card-text">
              <h1 class="card1-h1" >
              ${en.classList.contains("active")== true ? element.title.en : element.title.ar }
              </h1>
              <p class="card1-p" >
            ${en.classList.contains("active")== true ? element.sub_title.en : element.sub_title.ar}
              </p>
              <div class="card1-p2" >
            ${en.classList.contains("active")== true ? element.description.en : element.description.ar}
              </div>
       
            <div class="book">
                <a href="./booking.html" class="btn--submit">${en.classList.contains("active") == true ?  "Book Now" : "احجز الآن"}</a>
            </div>
        </div>
    </div>
      `
      
  
    })
      document.querySelector(".container2").innerHTML = card
      document.querySelector(".ar").addEventListener('click', () => {
        Chalet11(Chalet)
      })
    
      document.querySelector(".en").addEventListener('click', () => {
        Chalet11(Chalet)
      })
      }
    
      Chalet1()

      // fetch Activity data and show it
      let Activity;

      async function Activity1() {
        const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Activity");
        const data = await response.json();
        Activity = data.data; 
        Activity11(Activity)
      }
      async function Activity11(Activity) {
        let card = ""
       
    let en = document.querySelector(".en")
     
    Activity.forEach((element, i) => {

    
        card += `
        ${en.classList.contains("active")== true ?` <div class="card2">` : ` <div class="card2 arfont">`}
        <div class="img-card">
            <img src=${element.article_cover} alt="">
        </div>
       <div class="card-text">
            <h1 class="card2-h1" >
            ${en.classList.contains("active")== true ? element.title.en : element.title.ar }
            </h1>
            <p class="card2-p" >
            ${en.classList.contains("active")== true ? element.sub_title.en : element.sub_title.ar}
            </p>
            <div class="card2-p2" >
            ${en.classList.contains("active")== true ? element.description.en : element.description.ar}
            </div>
        </div>
    </div>
      `
      
  
    })
          
      
       
          document.querySelector(".container3").innerHTML = card
         
          document.querySelector(".ar").addEventListener('click', () => {
            Activity11(Activity)
          })
        
          document.querySelector(".en").addEventListener('click', () => {
            Activity11(Activity)
          })
          
          }
      
          Activity1();

// fetch Nature data and show it
let Nature;

async function Nature1() {
  const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Nature");
  const data = await response.json();
  Nature = data.data; 
  Nature11(Nature)
}
async function Nature11(Nature) {
  let card = ""
  let en = document.querySelector(".en")
     
  Nature.forEach((element, i) => {

 
    card += `
    ${en.classList.contains("active")== true ?` <div class="card2">` : ` <div class="card2 arfont">`}
        <div class="img-card">
        <img src=${element.article_cover} alt="">
        </div>
     <div class="card-text">
         <h1 class="card2-h1" >
         ${en.classList.contains("active")== true ? element.title.en : element.title.ar }
         </h1>
         <p class="card2-p" >
         ${en.classList.contains("active")== true ? element.sub_title.en : element.sub_title.ar}
         </p>
         <div class="card2-p2" >
         ${en.classList.contains("active")== true ? element.description.en : element.description.ar}
         </div>
     </div>
</div>
  `
    

  })
    

 
    document.querySelector(".container4").innerHTML = card
    document.querySelector(".ar").addEventListener('click', () => {
        Nature11(Nature)
      })
    
      document.querySelector(".en").addEventListener('click', () => {
        Nature11(Nature)
      })
    
    }

    Nature1();
    // fetch Pool data and show it
let Pool;

async function Pool1() {
  const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Pool");
  const data = await response.json();
  Pool = data.data; 
  Pool11(Pool)
}
async function Pool11(Pool) {
  let card = ""

   let en = document.querySelector(".en")
     
   Pool.forEach((element, i) => {

    
    card += `
    ${en.classList.contains("active")== true ?` <div class="card2">` : ` <div class="card2 arfont">`}
          <div class="img-card">
              <img src=${element.article_cover} alt="">
          </div>
         <div class="card-text">
              <h1 class="card2-h1" >
              ${en.classList.contains("active")== true ? element.title.en : element.title.ar }
              </h1>
              <p class="card2-p" >
              ${en.classList.contains("active")== true ? element.sub_title.en : element.sub_title.ar}
              </p>
              <div class="card2-p2" >
              ${en.classList.contains("active")== true ? element.description.en : element.description.ar}
              </div>
          </div>
      </div>
  `
    

  })
 
    document.querySelector(".container5").innerHTML = card
   
    document.querySelector(".ar").addEventListener('click', () => {
        Pool11(Pool)
      })
    
      document.querySelector(".en").addEventListener('click', () => {
        Pool11(Pool)
      })
    
    
    
    }

    Pool1();


// fetch event data and show it
      let events1;

  async function events() {
    const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Events");
    const data = await response.json();
    events1 = data.data;
    events11(events1)
       // display none for all card expet fisrt tow 
   let  cards =   document.querySelector(".container6").querySelectorAll('.card3')
   for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    if (index > 1) {
      element.style.display = "none"
 
    }
   } 
  }
  async function events11(events1){
    let card = ""
    let card1=""
    let imge =""
    let en = document.querySelector(".en")
    events1.forEach((e) => {
     let category =   e.category
  
 
    if (category  == "Resort Events" ){

          card += `    
          ${en.classList.contains("active")== true ?` <div class="card3">` : ` <div class="card3 arfont">`}
              <div class="img-card">
                  <div class="slider slider2" id="2">
                      <button class="prev-btn pbtn2">
                          <img src="./assets/img/icion/nextaroww.png" alt="prev">
                      </button>
                      <button class="next-btn nbtn2">
                          <img src="./assets/img/icion/prevaroww.png" alt="next">
                      </button>
              
                      <div class="slider-container sc2">
                         ${e.images?.forEach((m) =>{
                            imge +=`<div class="slide-img1 simg2">
                              <img src=${m.path} alt="">
                          </div>`} )}
                          ${document.querySelector(".sc2").innerHTML = imge}
                       
                      </div>
          
              
                      <div class="num1">
                          <p style="direction: ltr;"><span class="cureentnum"></span> of <span class=" all"></span></p>
                      </div>
                  </div>
              </div>
              <div class="card-text">
                    <h1 class="card3-h1" >
                    ${en.classList.contains("active")== true ? e.title.en : e.title.ar }
                    </h1>
                    <p class="card3-p" >
                  ${en.classList.contains("active")== true ? e.sub_title.en : e.sub_title.ar}
                    </p>
                  <div class="card3-p2" >
                  ${en.classList.contains("active")== true ? e.description.en : e.description.ar}
                  </div>
              </div>
            
          </div>

        `
 
    
    
      }})


 
document.querySelector(".ar").addEventListener('click', () => {
    events11(events1)
  })

  document.querySelector(".en").addEventListener('click', () => {
    events11(events1)
  })
   
    
  document.querySelector(".container6").innerHTML = card

           //slider card img
       let allcard = document.querySelectorAll(".card3")
              for (let i = 0; i < allcard.length; i++) {
           const slidimg3= allcard[i].querySelectorAll(".slide-img1")
           const slidecontainer3=allcard[i].querySelector(".slider-container");
           const nextbtn3=allcard[i].querySelector(".prev-btn");
           const prevbtn3=allcard[i].querySelector(".next-btn ");
           const numall3=allcard[i].querySelector(".all");
           const cureentnum3=allcard[i].querySelector(".cureentnum");
           //const
           let numImg3= slidimg3.length;
           numall3.innerHTML=slidimg3.length;
           let current3 = 0;
           // set up slider
           function inite3() {
               slidimg3.forEach((img , i)=>{
                   img.style.left = i * 100 + "%";
               });
           
               slidimg3[0]?.classList.add("active");
           }
           inite3();
           //next button
           nextbtn3.addEventListener("click", ( )=>{
               if (current3 < numImg3-1) {
                   current3=current3 +1
               }
               else current3 = 0;
               getslide3(current3)
               slidenum3();
           
           })
           //prev button
           prevbtn3.addEventListener("click", ( )=>{
            
               if (current3 <= 0) {
                  getslide3(numImg3 -1)
                 return;
               }
               else current3= current3 -1;
               
               getslide3(current3)
               slidenum3();
           
           })
           function getslide3(slidnum3){
               slidecontainer3.style.transform="translateX(-" + 100 * slidnum3 + "%";
           
                current3=slidnum3;
               setActive3();
               slidenum3();
           }
           //active slide
           function setActive3(){
               let cureentA3 = allcard[i].querySelector(".slide-img1.active");
               cureentA3?.classList.remove("active");
               slidimg3[current3]?.classList.add("active");
           } 
           //num slide
           
           
           function slidenum3(){
               cureentnum3.innerHTML=current3 +1;
              
           }
           
           slidenum3();
           
       }

      
  
      }
   
      events()

 //view more Resort Events 
 document.querySelector(".view").addEventListener('click', ()=>{
  let  cards =  document.querySelector(".container6").querySelectorAll('.card3')
  for (let index = 0; index < cards.length; index++) {
   const element = cards[index];
   if (index > 1 ) {
  
     element.style.display = "flex"
      
   }
   
  }

})
      


//FRTCH SPORT EVENTS
  async function eventsS() {
    const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Events");
    const data = await response.json();
    events1 = data.data;
    eventsS11(events1)
  }
  async function eventsS11(events1){
    
    let card1=""
    let imge =""
    let en = document.querySelector(".en")
    events1.forEach((e) => {
     let category =   e.category
    if (category  == "Sport Events" ){
 
    card1 += `    
     ${en.classList.contains("active")== true ?` <div class="card3">` : ` <div class="card3 arfont">`}
              <div class="img-card">
                  <div class="slider slider2" id="2">
                      <button class="prev-btn pbtn2">
                          <img src="./assets/img/icion/nextaroww.png" alt="prev">
                      </button>
                      <button class="next-btn nbtn2">
                          <img src="./assets/img/icion/prevaroww.png" alt="next">
                      </button>
              
                      <div class="slider-container sc2">
                      ${e.images?.forEach((m) =>{
                        imge +=`<div class="slide-img1 simg2">
                          <img src=${m.path} alt="">
                      </div>`} )}
                      ${document.querySelector(".sc2").innerHTML = imge}
                       
                       
                      </div>
          
              
                      <div class="num1">
                          <p style="direction: ltr;"><span class="cureentnum"></span> of <span class=" all"></span></p>
                      </div>
                  </div>
              </div>
              <div class="card-text">
                    <h1 class="card3-h1" >
                    ${en.classList.contains("active")== true ? e.title.en : e.title.ar }
                    </h1>
                  <p class="card3-p" >
                  ${en.classList.contains("active")== true ? e.sub_title.en : e.sub_title.ar}
                  </p>
                  <div class="card3-p2" >
                  ${en.classList.contains("active")== true ? e.description.en : e.description.ar}
                  </div>
              </div>
            
          </div>
`   
}})


 
document.querySelector(".ar").addEventListener('click', () => {
    events11(events1)
  })

  document.querySelector(".en").addEventListener('click', () => {
    events11(events1)
  })

            document.querySelector(".container7").innerHTML = card1
           //slider card img
           let allcard = document.querySelectorAll(".card3")
           for (let i = 0; i < allcard.length; i++) {
               const slidimg3= allcard[i].querySelectorAll(".slide-img1")
               const slidecontainer3=allcard[i].querySelector(".slider-container");
               const nextbtn3=allcard[i].querySelector(".prev-btn");
               const prevbtn3=allcard[i].querySelector(".next-btn ");
               const numall3=allcard[i].querySelector(".all");
               const cureentnum3=allcard[i].querySelector(".cureentnum");
               //const
               let numImg3= slidimg3.length;
               numall3.innerHTML=slidimg3.length;
               let current3 = 0;
               // set up slider
               function inite3() {
                   slidimg3.forEach((img , i)=>{
                       img.style.left = i * 100 + "%";
                   });
               
                   slidimg3[0]?.classList.add("active");
               }
               
               inite3();
               //next button
               nextbtn3.addEventListener("click", ( )=>{
                
                   if (current3 < numImg3-1) {
                       current3=current3 +1
                   }
                   else current3 = 0;
                   getslide3(current3)
                   slidenum3();
               
               })
               //prev button
               prevbtn3.addEventListener("click", ( )=>{
                
                   if (current3 <= 0) {
                      getslide3(numImg3 -1)
                     return;
                   }
                   else current3= current3 -1;
                   
                   getslide3(current3)
                   slidenum3();
               })
               
               function getslide3(slidnum3){
                   slidecontainer3.style.transform="translateX(-" + 100 * slidnum3 + "%";
               
                    current3=slidnum3;
                   setActive3();
                   slidenum3();
               }
               //active slide
               function setActive3(){
                   let cureentA3 = allcard[i].querySelector(".slide-img1.active");
                   cureentA3?.classList.remove("active");
                   slidimg3[current3]?.classList.add("active");
               }
               //num slide
               function slidenum3(){
                   cureentnum3.innerHTML=current3 +1;
                  
               }
               
               slidenum3();
               
           }    

      }
   
      eventsS()





