document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});



// Projects
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";

    document.removeEventListener("scroll", scrollFn);

    mouseCircle.style.opacity = 0;

    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      document.addEventListener("scroll", scrollFn);

      progressBarFn();
    };
  });
  // End of Big Project Image

  i >= 3 && (project.style.cssText = "display: none; opacity: 0");
});

// Projects Button
const section3 = document.querySelector(".my-projects");
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHideBool = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);

  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  showHideBool
    ? (projectsBtnText.textContent = "Weniger anzeigen")
    : (projectsBtnText.textContent = "Mehr anzeigen");

  projects.forEach((project, i) => {
    i >= 3 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, i));
  });
  showHideBool = !showHideBool;
});
// End of Projects Button
// End of Projects