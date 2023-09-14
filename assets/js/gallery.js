const servicesHeader = document.querySelector(".services__header");

const sections = document.querySelectorAll(".section");
const circles = document.querySelectorAll(".circle");

const sectionsArr = Array.from(sections);
const circlesArr = Array.from(circles);
// console.log(circlesArr);

sections.forEach((section) => {
  section.addEventListener("click", () => {
    sections.forEach((section) => {
      section.classList.remove("section--selected");
    });
    section.classList.add("section--selected");

    circles.forEach((circle) => {
      circle.classList.remove("circle--active");
    });
    let index = sectionsArr.indexOf(section);
    circlesArr[index].classList.add("circle--active");

    const sectionName = section.dataset.section;
    changeSection(sectionName);
    getImagesAndVideos(sectionName)
  });
});

const changeSection = (section) => {
  // console.log(sectionName);
  const lastHeader = servicesHeader.getElementsByTagName("h2")[0];
  const lastPragraph = servicesHeader.getElementsByTagName("p")[0];
  const newHeader = document.createElement("h2");
  const newPragraph = document.createElement("p");

  changeSectionHeaderAndParagraph(section, newHeader, newPragraph);

  // console.log(newHeader, newPragraph)
  servicesHeader.replaceChild(newHeader, lastHeader);
  servicesHeader.replaceChild(newPragraph, lastPragraph);
};

const changeSectionHeaderAndParagraph = (value, header, paragraph) => {
  if (value === "Restaurant") {
    header.innerText = "Our Restaurants";
    paragraph.innerText = "Take a look on our restaurants";
  }
  if (value === "Chalet") {
    header.innerText = "Our Chalets";
    paragraph.innerText =
      "Welcome to our cozy chalet where comfort and relaxation await.";
  }
  if (value === "Activity") {
    header.innerText = "Our Activities";
    paragraph.innerText = "Never stop your daily activity. ";
  }
  if (value === "Nature") {
    header.innerText = "The Nature";
    paragraph.innerText = "Nature is a source of wonder and inspiration.";
  }
  if (value === "Events") {
    header.innerText = "Our Events";
    paragraph.innerText = "Experience unforgettable moments with us.";
  }
};

// **** Logic for scrolling ****
const sectionsContainer = document.querySelector(".sections-container");
// console.log(sectionsContainer);

let isDragStart = false;
let prevPageX, prevScrollLeft;

sectionsContainer.addEventListener("mousedown", (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = sectionsContainer.scrollLeft;
});

sectionsContainer.addEventListener("mousemove", (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  let postionDiff = e.pageX - prevPageX;
  sectionsContainer.scrollLeft = prevScrollLeft - postionDiff;
});

sectionsContainer.addEventListener("mouseup", () => {
  isDragStart = false;
});

// **** End of logic for scrolling ****

const getImagesAndVideos = (sectionName) => {
  axios
  .get("https://mountain.lavetro-agency.com/api/dashboard/galary", {params: {
    type: sectionName
  }})
  .then((res) => console.log(res.data));

};
