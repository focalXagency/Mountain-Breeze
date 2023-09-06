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
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}





//silder-section-item

let sliderSC=document.querySelector(".slider-item");
let sliderInner=document.querySelector(".slider-inner");
let scdot=document.querySelectorAll(".dot-sc")
let pressed = false;
let startx;
let x;

sliderInner.addEventListener('mousedown', (e)=>{
    pressed =true;
    startx=e.offsetX - sliderInner.offsetLeft;

    // sliderSC.style.cursor='grabbing'
})

sliderInner.addEventListener('mouseenter', ()=>{
    sliderInner.style.cursor='grab'
})
sliderInner.addEventListener('mouseup', ()=>{
    sliderInner.style.cursor='grab'
})
window.addEventListener('mouseup', ()=>{
    pressed= false
})


sliderSC.addEventListener('mousemove', (e)=>{
    if(!pressed)return;
    e.preventDefault();
    x = e.offsetX;
    console.log(sliderInner.offsetLeft);
    sliderInner.style.left = `${x - startx }px`;
   cheakboundary();
   dacvtivedot(sliderInner.offsetLeft);
})

function cheakboundary() {
    let outer = sliderSC.getBoundingClientRect();
    let inner = sliderInner.getBoundingClientRect();
    if(parseInt(sliderInner.style.left) > 0){
        sliderInner.style.left='0px'
    }else if (inner.right < outer.right) {
        sliderInner.style.left = `-${inner.width - outer.width }px`
     
    }


}
cheakboundary();

//get slide

scdot.forEach((i , k) => {
    scdot[0].classList.add('activedot');
    sliderInner.children[0].focus();
   i.addEventListener('click', ()=>{
   
  
         console.log(k);
     
       
           sliderInner.style.left = `-${k * 70}px`
           sliderInner.children[k].focus();
        
            document.querySelector('.activedot').classList.remove('activedot');
            scdot[k].classList.add('activedot');
            
          
        
});


})

function dacvtivedot(b) {

            
    };
   
 

//slidercard1
const slidimg1= document.querySelectorAll(".simg1")
const slidecontainer1=document.querySelector(".sc1");
const nextbtn1=document.querySelector(".pbtn1");
const prevbtn1=document.querySelector(".nbtn1");
const dots1=document.querySelector(".dots1");
const numall1=document.querySelector(".all1");
const cureentnum1=document.querySelector(".cureentnum1");

//const
let numImg1= slidimg1.length;
numall1.innerHTML=slidimg1.length
// let slideWidth1= slidimg1[0].clientWidth;
let current1 = 0;

// set up slider

function inite1() {
    slidimg1.forEach((img , i)=>{
        img.style.left = i * 100 + "%";
    });

    slidimg1[0].classList.add("active");
}

inite1();



//next button

nextbtn1.addEventListener("click", ( )=>{
 
    if (current1 < numImg1-1) {
        current1=current1 +1
    }
    else current1 = 0;
    console.log(cureentnum1);
    getslide1(current1)

})
//prev button
prevbtn1.addEventListener("click", ( )=>{
 
    if (current1 <= 0) {
       getslide1(numImg1 -1)
      return;
    }
    else current1= current1 -1;
    
    getslide1(current1)
    slidenum1();

})

function getslide1(slidnum1){
    slidecontainer1.style.transform="translateX(-" + 100 * slidnum1 + "%";

     current1=slidnum1;
    setActive1();
    slidenum1();
}


//active slide
function setActive1(){
    let cureentA1 = document.querySelector(".simg1.active");
    cureentA1.classList.remove("active");
    slidimg1[current1].classList.add("active");



}


//num slide


function slidenum1(){
    cureentnum1.innerHTML=current1 +1;
   
}

slidenum1();





//slide card 2
const slidimg2= document.querySelectorAll(".simg2")
const slidecontainer2=document.querySelector(".sc2");
const nextbtn2=document.querySelector(".pbtn2");
const prevbtn2=document.querySelector(".nbtn2");
const numall2=document.querySelector(".all2");
const cureentnum2=document.querySelector(".cureentnum2");


//const
let numImg2= slidimg2.length;
numall2.innerHTML=slidimg2.length
// let slideWidth1= slidimg1[0].clientWidth;
let current2 = 0;

// set up slider

function inite2() {
    slidimg2.forEach((img , i)=>{
        img.style.left = i * 100 + "%";
    });

    slidimg2[0].classList.add("active");
}

inite2();



//next button

nextbtn2.addEventListener("click", ( )=>{
 
    if (current2 < numImg2-1) {
        current2=current2 +1
    }
    else current2 = 0;
    getslide2(current2)

})
//prev button
prevbtn2.addEventListener("click", ( )=>{
 
    if (current2 <= 0) {
       getslide2(numImg2 -1)
      return;
    }
    else current2= current2 -1;
    
    getslide2(current2)
    slidenum2();

})

function getslide2(slidnum2){
    slidecontainer2.style.transform="translateX(-" + 100 * slidnum2 + "%";

     current2=slidnum2;
    setActive2();
    slidenum2();
}


//active slide
function setActive2(){
    let cureentA2 = document.querySelector(".simg2.active");
    cureentA2.classList.remove("active");
    slidimg2[current2].classList.add("active");



}


//num slide


function slidenum2(){
    cureentnum2.innerHTML=current2 +1;
   
}

slidenum2();









//slide card 3
const slidimg3= document.querySelectorAll(".simg3")
const slidecontainer3=document.querySelector(".sc3");
const nextbtn3=document.querySelector(".pbtn3");
const prevbtn3=document.querySelector(".nbtn3");
const numall3=document.querySelector(".all3");
const cureentnum3=document.querySelector(".cureentnum3");


//const
let numImg3= slidimg3.length;
numall3.innerHTML=slidimg3.length
// let slideWidth1= slidimg1[0].clientWidth;
let current3 = 0;

// set up slider

function inite3() {
    slidimg3.forEach((img , i)=>{
        img.style.left = i * 100 + "%";
    });

    slidimg3[0].classList.add("active");
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
    let cureentA3 = document.querySelector(".simg3.active");
    cureentA3.classList.remove("active");
    slidimg3[current3].classList.add("active");



}


//num slide


function slidenum3(){
    cureentnum3.innerHTML=current3 +1;
   
}

slidenum3();


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






