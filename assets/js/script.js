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
  inputGroup.addEventListener("focusin", () => {
    inputGroup.classList.add("focus");
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

  // const bookNowBtn = document.querySelector(".booking__footer #booking-btn");
  // console.log(bookNowBtn);

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

// **** Logic for displaying rooms after fetching data from the backend ***
const roomsContainer = document.querySelector(".rooms__types__container");

axios
  .get("https://mountain.lavetro-agency.com/api/dashboard/rooms")
  .then((res) => {
    const rooms = res.data.data;
    displayAllRooms(rooms);
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
  console.log(room.images[0].path);

  return `<div class="room__type">
  <img src="${room.images[0].path}" alt="" class="room__type__image" />
  <div class="room__type__body">
    <h3 class="room__type__heading">${room.name.en}</h3>
    <div class="room__type__short__desc">
      ${room.floor} floors suitable for families
    </div>
    <p class="room__type__desc">
      ${room.content.en}
    </p>
    <div class="room__type__features">
      <div class="room__type__feature">
        <img src="./assets/img/person.svg" alt="" class="feature__icon" />
        <div class="feature__desc">${room.guests_number} Persons</div>
      </div>
        ${
          room.room_services &&
          `
          <div class="room__type__feature">
            <img src="./assets/img/meal.svg" alt="" class="feature__icon" />
            <div class="feature__desc">Room Services</div>
          </div>
        `
        }
        ${
          room.bed &&
          `
      <div class="room__type__feature">
      <img src="./assets/img/beds.svg" alt="" class="feature__icon" />

        <div class="feature__desc">Kingsize Bed</div>
      </div>
      `
        }
     ${
       room.TV &&
       `<div class="room__type__feature">
        <img src="./assets/img/TV.svg" alt="" class="feature__icon" />
        <div class="feature__desc">TV</div>
      </div>`
     }
    </div>
    <div class="room__type__booking">
      <button class="btn--submit btn--book" type="submit">
        Book Now
      </button>
      <div class="room__type__price__period">
        <span class="room__type__price">${room.price}</span>
        <span class="room__type__period">Per Night</span>
      </div>
    </div>
  </div>
</div>`;
};

// **** End of the logic for displaying rooms ****

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
