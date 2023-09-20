const servicesHeader = document.querySelector(".services__header");
const photosAndvideosContainer = document.querySelector(".photos");
console.log(photosAndvideosContainer);

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
    getImagesAndVideos(sectionName);
    // console.log(sectionName);
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
  let selectedLanguage = document.querySelector(".lang .active").innerHTML;
  // console.log(selectedLanguage);

  if (selectedLanguage == "AR") {
    header.style.fontFamily = "'Tajawal', sans-serif";
    paragraph.style.fontFamily = "'Tajawal', sans-serif";
  }

  if (value === "Restaurant") {
    header.setAttribute("data-tr", "resort-resturants-title");
    paragraph.setAttribute("data-tr", "resort-resturants-para");
    // console.log(selectedLanguage);

    if (selectedLanguage === "En") {
      header.innerText = "Our Restaurants";
      paragraph.innerText = "Take a look on our restaurants";
    }
    if (selectedLanguage === "AR") {
      header.innerText = "مطاعمنا";
      paragraph.innerText = "تمتع بأجواء هادئة وومتعة برفقة من تحب";
    }
  }
  if (value === "Chalet") {
    header.setAttribute("data-tr", "resort-chalets-title");
    paragraph.setAttribute("data-tr", "resort-chalets-para");
    // console.log(selectedLanguage);
    if (selectedLanguage === "En") {
      header.innerText = "Our Chalets";
      paragraph.innerText =
        "Welcome to our cozy chalet where comfort and relaxation await.";
    }

    if (selectedLanguage === "AR") {
      header.innerText = "شاليهاتنا";
      paragraph.innerText = "يسعدنا خدمتك ونأمل أن تحظى بتجربة طعام رائعة";
    }
  }
  if (value === "Activity") {
    header.setAttribute("data-tr", "resort-activity-title");
    paragraph.setAttribute("data-tr", "resort-activity-para");
    if (selectedLanguage === "En") {
      header.innerText = "Our Activities";
      paragraph.innerText = "Never stop your daily activity.";
    }

    if (selectedLanguage === "AR") {
      header.innerText = "النشاطات";
      paragraph.innerText =
        "استمتع ضمن أنشطة مسلية مع أصدقائك في منتجع نسمة جبل";
    }
  }
  if (value === "Nature") {
    header.setAttribute("data-tr", "resort-nature-title");
    paragraph.setAttribute("data-tr", "resort-nature-para");

    if (selectedLanguage === "En") {
      header.innerText = "The Nature";
      paragraph.innerText = "Nature is a source of wonder and inspiration.";
    }

    if (selectedLanguage === "AR") {
      header.innerText = "طبيعتنا";
      paragraph.innerText =
        "الطبيعة دائماَ تخطف الأنفاس لكنها تتميز بسحر إضافي في نسمة جبل";
    }
  }
  if (value === "Events") {
    header.setAttribute("data-tr", "resort-events-title");
    paragraph.setAttribute("data-tr", "resort-events-para");

    if (selectedLanguage === "En") {
      header.innerText = "Our Events";
      paragraph.innerText = "Experience unforgettable moments with us.";
    }

    if (selectedLanguage === "AR") {
      header.innerText = "فعالياتنا";
      paragraph.innerText = "عش اللحظات التي لا تنسى معنا";
    }
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
let imagesAndVideos = [];
const getImagesAndVideos = (sectionName) => {
  photosAndvideosContainer.innerHTML = "";
  axios
    .get("https://mountain.lavetro-agency.com/api/dashboard/gallary", {
      params: {
        type: sectionName,
      },
    })
    .then((res) => {
      imagesAndVideos = [];
      if (res.data.data[0]?.images) {
        imagesAndVideos = [...imagesAndVideos, ...res.data.data[0].images];
        // console.log(imagesAndVideos)
      }
    });

  axios
    .get("https://mountain.lavetro-agency.com/api/dashboard/videos", {
      params: {
        type: sectionName,
      },
    })
    .then((res) => {
      imagesAndVideos = [...imagesAndVideos, ...res.data.data];

      imagesAndVideos.forEach((asset) => {
        // console.log(asset);
        if ("id" in asset) {
          // console.log(asset.link)
          const iframe = document.createElement("iframe");
          const startSlicingAt = asset.link.indexOf("=");
          const link =
            "https://www.youtube.com/embed/" + asset.link.slice(startSlicingAt + 1);
          console.log(link);
          iframe.setAttribute("src", link);
          iframe.classList.add("photo");
          iframe.classList.add("video");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute(
            "allow",
            "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          );
          iframe.setAttribute("frameborder", "0");
          console.log(iframe);

          photosAndvideosContainer.appendChild(iframe);
        } else {
          const photo = document.createElement("img");
          photo.setAttribute("src", asset.path);
          photo.classList.add("photo");
          // console.log(photo);
          photosAndvideosContainer.appendChild(photo);
        }
      });

      // console.log(photosAndvideosContainer);
      // console.log(imagesAndVideos);
    });
};
getImagesAndVideos("Restaurant");

{
  /* <iframe
width="560"
height="315"
src="https://www.youtube.com/embed/Tt0arZN6EBM?si=coEMhAl5c2FHMVaG"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
></iframe> */
}
