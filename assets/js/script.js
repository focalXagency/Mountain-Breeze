let bookBtns = [];
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
    const type = input.getAttribute("type");
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
  });
};
// **** End of the logic for displaying modal and hiding it ****

// **** Logic for displaying 3 rooms after fetching data from the backend ***
const roomsContainer = document.querySelector(".rooms__types__container");
let rooms = [];
axios
  .get("https://mountain.lavetro-agency.com/api/dashboard/rooms")
  .then((res) => {
    console.log(res.data);
    rooms = res.data.data;
    displayAllRooms(rooms.slice(0, 3));
    console.log(rooms[0]);

    bookBtns = document.querySelectorAll(".btn--book");
    console.log(bookBtns);

    getBtns();
  });

const displayAllRooms = (rooms) => {
  rooms.forEach((room) => {
    roomsContainer.innerHTML += displayRoom(room);
  });
};

const displayRoom = (room) => {
  // console.log(room.images[0].path);
  let selectedLanguage = document.querySelector(".lang .active").innerHTML;
  console.log(room)
  return `<div class="room__type">
  ${
    room.images[0]?.path
      ? `<img src=${room.images[0].path} alt="" class="room__type__image"/>`
      : ""
  }
  <div class="room__type__body">
    <h3 class="room__type__heading">${selectedLanguage === "En" ? room.name.en : room.name.ar}</h3>
    <div class="room__type__short__desc">
      ${room.floor} floors suitable for families
    </div>
    <p class="room__type__desc">
      ${selectedLanguage === "En" ? room.content.en :room.content.ar}
    </p>
    <div class="room__type__features">
      <div class="room__type__feature">
        <img src="./assets/img/person.svg" alt="" class="feature__icon" />
        <div class="feature__desc">${room.guests_number} Persons</div>
      </div>
        ${
          room.room_services
            ? `
          <div class="room__type__feature">
            <img src="./assets/img/meal.svg" alt="" class="feature__icon" />
            <div class="feature__desc">Room Services</div>
          </div>
        `
            : ""
        }
        ${
          room.bed
            ? `
      <div class="room__type__feature">
      <img src="./assets/img/beds.svg" alt="" class="feature__icon" />

        <div class="feature__desc">Kingsize Bed</div>
      </div>
      `
            : ""
        }
     ${
       room.TV
         ? `<div class="room__type__feature">
        <img src="./assets/img/TV.svg" alt="" class="feature__icon" />
        <div class="feature__desc">TV</div>
      </div>`
         : ""
     }
    </div>
    <div class="room__type__booking">
      <button class="btn--submit btn--book" type="submit">
        Book Now
      </button>
      <div class="room__type__price__period">
        <span class="room__type__price">${room.price}$</span>
        <span class="room__type__period">Per Night</span>
      </div>
    </div>
  </div>
</div>`;
};

// **** End of the logic for displaying 3 rooms ****

// **** Logic for displaying all rooms ***
const displayAllBtn = document.querySelector("#see-all-rooms");
displayAllBtn.addEventListener("click", () => {
  displayAllRooms(rooms.slice(3));
});
// **** End of the Logic for displaying all rooms ***

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
  const data = {
    full_name: name,
    phone: phone,
    email: email,
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    room_type: roomType,
    guests_number: guestsNumber,
    content: desc,
  };

  axios
    .post("https://mountain.lavetro-agency.com/api/dashboard/books", data)
    .then((response) => {
      console.log("Data sent successfully:", response.data, response.status);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
});

// **** Logic for filtering rooms ****
const suggestRoom = document.querySelector("#suggest-room");
console.log(suggestRoom);
suggestRoom.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = suggestRoom.querySelector("#room-option-price").value;
  const floor = suggestRoom.querySelector("#room-option-floor").value;
  const type = suggestRoom.querySelector("#room-option-type").value;

  axios
    .get("https://mountain.lavetro-agency.com/api/dashboard/rooms", {
      params: {
        type: type,
        // guests_number: floor,
        max_price: price,
      },
    })
    .then((res) => {
      roomsContainer.innerHTML = "";
      rooms = res.data.data;
      displayAllRooms(res.data.data);
    });

  // console.log(price, floor, type);
});
