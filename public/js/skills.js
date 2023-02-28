document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});

// Skills
document.querySelectorAll(".service-btn").forEach((service) => {
    service.addEventListener("click", (e) => {
      e.preventDefault();
  
      const serviceText = service.nextElementSibling;
      serviceText.classList.toggle("change");
  
      const rightPosition = serviceText.classList.contains("change")
        ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
        : 0;
  
      service.firstElementChild.style.right = rightPosition;
    });
  });
  // Skills

  