

//clips
let width = window.innerWidth



window.addEventListener("resize", () => {


  if (window.innerWidth <= 800) {
    document.querySelector("#clips").classList.remove('clips');
    document.querySelector("#clips").classList.add('clips1');

  }
  else {

    document.querySelector("#clips").classList.add('clips');
    document.querySelector("#clips").classList.remove('clips1');
  }


})


if (width <= 800) {
  document.querySelector("#clips").classList.add('clips1');
  document.querySelector("#clips").classList.remove('clips');
}


// get room data && show last 2 or 3
let room;
async function rooms1() {
  const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/rooms");
  const data = await response.json();
  room = data.data;
  rooms11(room)
}
async function rooms11(room) {

  let card = ""
  let card1 = ""
  let en = document.querySelector(".en")
  let n = 2
  room.slice(-n).forEach((element, i) => {

    card += `
        ${en.classList.contains("active") == true ? `<div class="card1"` : `<div class="card1 arfont"`}>
        <div class="img-card">
            <img src=${element.images[0]?.path} alt="">
        </div>
        <div class="card-text">
        <h1 class="card1-h1" > 
            ${en.classList.contains("active") == true ? element.title.en : element.title.ar}
            </h1>
            <p class="card1-p" >
             ${en.classList.contains("active") == true ? element.sub_title.en : element.sub_title.ar}
             </p>
           <div class="card1-p2" >
            ${en.classList.contains("active") == true ? element.content.en : element.content.ar}
            </div>
            <div class="Advantages">
            ${element.guests_number > 0 == true ? `<div class="Advantage">
                    <img src="./assets/img/icion/person.png" alt="">
                    <p>${element.guests_number}${en.classList.contains("active") == true ? "Persons" : " اشخاص"} </p>
                </div>`: " "}
               ${element.room_services > 0 == true ? `<div class="Advantage">
                    <img src="./assets/img/icion/room.png" alt="">
                    <p>${en.classList.contains("active") == true ? "Room Services" : "خدمة الغرف"}</p>
                </div>`: " "}
                ${element.bed > 0 == true ? `<div class="Advantage">
                    <img src="./assets/img/icion/bed.png" alt="">
                    <p> ${en.classList.contains("active") == true ? " Kingsize Bed" : "أسرة ذو حجم كبير"}</p>
                </div>`: " "}
                ${element.TV > 0 == true ? `<div class="Advantage">
                    <img src="./assets/img/icion/tv.png" alt="">
                    <p>${en.classList.contains("active") == true ? "TV" : "تلفاز"}</p>
                </div>`: " "}
            </div>
            <div class="book">
                <a href="./booking.html" class="btn--submit">${en.classList.contains("active") == true ? "Book Now" : "احجز الآن"}</a>
                <p><span>$${element.price}</span>${en.classList.contains("active") == true ? "Per Night" : "لكل ليلة"}</p>
            </div>
        </div>
    </div>
      `


  })

  //for card room top page
  n = 3
  room.slice(-n).forEach((element, i) => {

    card1 += `   ${en.classList.contains("active") == true ? `<div class="card"` : `<div class="card arfont"`}>
          <div class="card-img">
              <img src=${element.images[0]?.path} alt="Room Img">
          </div>
          <div class="content">
              <h2 class="card-h2" >
              ${en.classList.contains("active") == true ? element.title.en : element.title.ar}
              </h2>
            <p class="card-p" >
              ${en.classList.contains("active") == true ? element.sub_title.en : element.sub_title.ar
      }</p>
              <div class="card-bottom">
                  <a class="btn--submit " href="./booking.html">${en.classList.contains("active") == true ? "Book Now" : "احجز الآن"}</a>
                  <div class="priceber">
                      <p class="price">$${element.price}</p>
                      <p class="time">${en.classList.contains("active") == true ? "Per Night" : "لكل ليلة"}</p>
                  </div>
              </div>
          </div>
      </div> 
        `


  })






  document.querySelector(".container1").innerHTML = card
  document.querySelector(".be-roomCard").innerHTML = card1



  document.querySelector(".ar").addEventListener('click', () => {


    rooms11(room)

  })


  document.querySelector(".en").addEventListener('click', () => {
    rooms11(room)
  })


}

rooms1();

//get video and show it
let video;
async function vedio() {
  const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/videos");
  const data = await response.json();
  video = data.data;
  const iframe = document.createElement("iframe")
  const start = video[0].link.indexOf("=")
  iframe.setAttribute("width", "560")
  iframe.setAttribute("height", "315")
  const link = "https://www.youtube.com/embed/" + video[0].link.slice(start + 1);
  iframe.setAttribute("src", link);
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share ")
  iframe.setAttribute("allowfullscreen", "")
  iframe.setAttribute("frameborder", "0")
  document.querySelector(".video").appendChild(iframe)



}
vedio();


// get resturant data and show it
let restaurant;


async function restaurantt() {
  const response = await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores?category=Restaurant");
  const data = await response.json()
  restaurant = (data.data)

  restaurant1(restaurant)
}

async function restaurant1(restaurant) {
  let card = ""
  let en = document.querySelector(".en")


  let n = 2
  restaurant.slice(-n).forEach((element, i) => {

    card += `
    ${en.classList.contains("active") == true ? ` <div class="card2">` : ` <div class="card2 arfont">`}
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

  document.querySelector(".container2").innerHTML = card

  //ar or en

  document.querySelector(".ar").addEventListener('click', () => {
    restaurant1(restaurant)
  })

  document.querySelector(".en").addEventListener('click', () => {
    restaurant1(restaurant)
  })
}


restaurantt()





