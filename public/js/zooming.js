// ImageZoom

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize =
    img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition =
      "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
// End of imageZoom

// Dispöay Info
function displayInfo () {
    document.getElementById("infos").innerHTML = 
    `
    <div class="tab">
      <button class="tablinks pointer-enter" onmouseover="openCity(event, 'London')">
        Mehr erfahren
      </button>
    </div>
    <div id="London" class="tabcontent">
      <h3>Hubble Ultra Deep Field (HUDF)</h3>
      <p>Das HUDF ist ein Bild einer kleinen Himmelsregion.</p>
      <p>
        Der Durchmesser des gewählten Himmelsausschnitts stellt ungefähr
      </br>
        ein Vierzigmillionstel des gesamten Himmels dar.
      </p>
      <p>Es wurde vom Hubble-Weltraumteleskop aufgenommen.</p>
      <h4>
        Das HUDF enthält rund 10.000 Galaxien und große kosmische Objekte.
      </h4>
      <p>
        Quelle: Wikipedia 2021,
        https://de.wikipedia.org/wiki/Hubble_Ultra_Deep_Field

        <p>Quelle: Bild...</p>
      </p>
    </div>
    <div class="clearfix"></div>
    `
  }

    function display () {
      imageZoom("myimage", "myresult");
      displayInfo();
    }
    // Initiate zoom effect:
    document.getElementById('myimage').addEventListener("mouseover", display); 

    function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }

// End of Display Info