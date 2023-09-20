let bookBtns = [];
let selectedLanguage = localStorage.getItem("selected_language");
// console.log(selectedLanguage)
const bookingFormContainer = document.querySelector(".modal-container");
// console.log(bookingFormContainer)
const finishModal = document.querySelector(".finish__modal");
const bookingForm = document.querySelector("#booking-form");
const closeBtn = document.querySelector("#close-btn");
const pageBody = document.querySelector("#page");
const finalBtn = document.querySelector(".btn--finish");

const body = document.body;

const inputGroups = document.querySelectorAll(".booking__input__group");
// console.log(inputGroups);
inputGroups.forEach((inputGroup) => {
  const input = inputGroup.querySelector(".booking__input");
  inputGroup.addEventListener("focusin", () => {
    const type = input?.getAttribute("type");
    if (type !== "date") inputGroup.classList.add("focus");
  });

  inputGroup.addEventListener("focusout", () => {
    console.log(input.value);
    if (input.value === "") inputGroup.classList.remove("focus");
  });
});

// **** Logic for displaying modal and Hiding it ****

const getBtns = () => {
  bookBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      bookingFormContainer.style.display = "block";
      pageBody.classList.add("blur");
      body.style.overflow = "hidden"; // Hide vertical scrollbar
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === bookingFormContainer) {
      bookingFormContainer.style.display = "none";
      pageBody.classList.remove("blur");
      body.style.overflow = "auto";
    }
  });

  closeBtn.addEventListener("click", () => {
    bookingFormContainer.style.display = "none";
    pageBody.classList.remove("blur");
    body.style.overflow = "auto"; // Restore vertical scrollbar
  });

  bookingForm.addEventListener("submit", (event) => {
    bookingFormContainer.style.display = "none";
    event.preventDefault();
    finishModal.style.display = "flex";
    // console.log(bookingForm.fullName.value);
  });

  finalBtn.addEventListener("click", () => {
    finishModal.style.display = "none";
    pageBody.classList.remove("blur");
    body.style.overflow = "auto";
    bookingForm.reset();
  });
};
// **** End of the logic for displaying modal and hiding it ****

// **** Logic for displaying 3 rooms after fetching data from the backend ***
const roomsContainer = document.querySelector(".rooms__types__container");
let rooms = [];
axios
  .get("https://mountain.lavetro-agency.com/api/dashboard/rooms")
  .then((res) => {
    // console.log(res.data);
    rooms = res.data.data;
    displayAllRooms(rooms.slice(0, 3));
    // console.log(rooms[0]);

    bookBtns = document.querySelectorAll(".btn--book");
    // console.log(bookBtns);

    getBtns();
  });

const displayAllRooms = (rooms) => {
  rooms.forEach((room) => {
    roomsContainer.innerHTML += displayRoom(room);
  });
};

const displayRoom = (room) => {
  // console.log(room.images[0].path);
  // let selectedLanguage = document.querySelector(".lang .active").innerHTML;
  // console.log(selectedLanguage);
  // console.log(room.id);
  return `<div class="room__type">
  ${
    room.images[0]?.path
      ? `<img src=${room.images[0].path} alt="" class="room__type__image"/>`
      : ""
  }
  <div class="room__type__body" ${
    selectedLanguage === "en" ? "" : "style='font-family: Tajawal, sans-serif;'"
  }>
    <h3 class="room__type__heading">${
      selectedLanguage === "en" ? room.title.en : room.title.ar
    }</h3>
    <div class="room__type__short__desc">
    ${selectedLanguage === "en" ? room.sub_title.en : room.sub_title.ar}
    </div>
    <p class="room__type__desc">
      ${selectedLanguage === "en" ? room.content.en : room.content.ar}
    </p>
    <div class="room__type__features">
      <div class="room__type__feature">
        <img src="./assets/img/person.svg" alt="" class="feature__icon" />
        <div class="feature__desc">${room.guests_number} <span>${
    selectedLanguage === "en" ? "Persons" : "أشخاص"
  }</div>
      </div>
        ${
          room.room_services
            ? `
          <div class="room__type__feature">
            <img src="./assets/img/meal.svg" alt="" class="feature__icon" />
            <div class="feature__desc">${
              selectedLanguage === "en" ? "Room Services" : "خدمة الغرف"
            }</div>
          </div>
        `
            : ""
        }
        ${
          room.bed
            ? `
      <div class="room__type__feature">
      <img src="./assets/img/beds.svg" alt="" class="feature__icon" />

        <div class="feature__desc">${
          selectedLanguage === "en" ? "Kingsize Bed" : "أسرة ذو حجم كبيرة"
        }</div>
      </div>
      `
            : ""
        }
     ${
       room.TV
         ? `<div class="room__type__feature">
        <img src="./assets/img/TV.svg" alt="" class="feature__icon" />
        <div class="feature__desc">${
          selectedLanguage === "en" ? "TV" : "تلفاز"
        }</div>
      </div>`
         : ""
     }
    </div>
    <div class="room__type__booking">
      <button class="btn--submit btn--book" type="submit" ${
        selectedLanguage === "en"
          ? ""
          : "style='font-family: Tajawal, sans-serif;'"
      }>
        ${selectedLanguage === "en" ? "Book Now" : "احجز الآن"}
      </button>
      <div class="room__type__price__period">
        <span class="room__type__price">${room.price}$</span>
        <span class="room__type__period">        ${
          selectedLanguage === "en" ? "Per Night" : "لكل ليلة"
        }
        </span>
      </div>
    </div>
  </div>
</div>`;
};

// **** End of the logic for displaying 3 rooms ****

// **** Logic for displaying all rooms ***
const displayAllBtn = document.querySelector("#see-all-rooms");
displayAllBtn.addEventListener("click", () => {
  roomsContainer.innerHTML = "";
  displayAllRooms(rooms);
});
// **** End of the Logic for displaying all rooms ***

const arabicLanguage = document.querySelector(".ar");
const englishLanguage = document.querySelector(".en");
arabicLanguage.addEventListener("click", () => {
  const selects = document.querySelectorAll(".room__suggestions__select");
  selects.forEach((select) => {
    select.style.fontFamily = "Tajawal, sans-serif";
  });
  roomsContainer.innerHTML = "";
  selectedLanguage = "Ar";
  displayAllRooms(rooms.slice(0, 3));
});

englishLanguage.addEventListener("click", () => {
  roomsContainer.innerHTML = "";
  selectedLanguage = "en";
  displayAllRooms(rooms.slice(0, 3));
});
// **** Logic for Booking a room ****
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = bookingForm.querySelector("#booking-full-name").value;
  const phone = bookingForm.querySelector("#booking-phone-number").value;
  const email = bookingForm.querySelector("#booking-email-address").value;
  const checkInDate = bookingForm.querySelector("#booking-check-in").value;
  const checkOutDate = bookingForm.querySelector("#booking-check-out").value;
  const guestsNumber = bookingForm.querySelector(
    "#booking-guests-number"
  ).value;
  const roomType = bookingForm.querySelector("#booking-room-type").value;
  const desc = bookingForm.querySelector("#booking-desc").value;

  console.log(phone);

  axios
    .post("https://mountain.lavetro-agency.com/api/dashboard/books", {
      full_name: name,
      phone: phone,
      email: email,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      room_type: roomType,
      guests_number: guestsNumber,
      content: desc,
    })
    .then((response) => {
      console.log("Data sent successfully:", response.data, response.status);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
});

const suggestRoom = document.querySelector("#suggest-room");
suggestRoom.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = parseInt(suggestRoom.querySelector("#room-option-price").value);
  const floor = parseInt(suggestRoom.querySelector("#room-option-floor").value);
  const type = suggestRoom.querySelector("#room-option-type").value;
  // console.log(floor, tprice, type)
  // console.log(typeof(type))
  const newRoomsArray = rooms.filter((room) => {
    if (room.price < price && room.floor === floor && room.type === type)
      return room;
  });
  console.log(newRoomsArray);
  roomsContainer.innerHTML = "";

  displayAllRooms(newRoomsArray);
});
