// Sticky Element
let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
  // Sticky Element
  if (hoveredEl.classList.contains("sticky")) {
    hoveredElPosition.length < 1 &&
      (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

    hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
    ) {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    }

    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    };
  }
  // End of Sticky Element
};


// Mouse Circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
// End of Mouse Circle

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});


// Mouse Circle Transform
const mouseCircleTransform = (hoveredEl) => {
  if (hoveredEl.classList.contains("pointer-enter")) {
    hoveredEl.onmousemove = () => {
      mouseCircleBool = false;
      mouseCircle.style.cssText = `
      width: ${hoveredEl.getBoundingClientRect().width}px;
      height: ${hoveredEl.getBoundingClientRect().height}px;
      top: ${hoveredEl.getBoundingClientRect().top}px;
      left: ${hoveredEl.getBoundingClientRect().left}px;
      opacity: 1;
      transform: translate(0, 0);
      animation: none;
      border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
      transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
      `;
    };
  

    hoveredEl.onmouseleave = () => {
      mouseCircleBool = true;
    };

    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
      }
    };
  }
};
// End of Mouse Circle Transform

// count up

// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
const easeOutQuad = (t) => t * (2 - t);

// The animation function, which takes an Element
const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++;
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames);
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress);

    // If the current count has changed, update the element
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
  const countupEls = document.querySelectorAll(".countup");
  countupEls.forEach(animateCountUp);
};

// Calculate Age
const birthdate = new Date(1987, 11, 06);
let today = new Date();
let diff = today - birthdate; // This is the difference in milliseconds
const yearsRounded = 1000 * 60 * 60 * 24 * 365.25;
let age = Math.floor(diff / yearsRounded); // Divide by 1000*60*60*24*365.25

function ageCalculation() {
  return age;
}

// Vergangene Tage seit dem letzten Geburtstag berechnen
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
let lastYear = new Date().getFullYear()-1;
const lastBirthDate = new Date(lastYear, 10, 07);

const diffDays = Math.round(Math.abs((today - lastBirthDate) / oneDay));


let my_age = ageCalculation();

let daysInYears = diffDays / 365.25;
let yearsPlusDays = parseFloat(my_age + daysInYears).toFixed(2);

let earthAroundSunRotation = 149600000;
let milliarden = (yearsPlusDays * earthAroundSunRotation) / 1000000000;

let mercuryYear = 0.2408;
let venusYear = 0.6152;
let jupiterYear = 11.8565;
let marsYear = 1.8807;
let saturnYear = 29.4235;
let uranusYear = 83.7474;
let neptuneYear = 163.7232;


let profile, stats;
let camera, controls, scene, renderer;
let info;
let cube;
let sphereTab = [];
let objects = [];
let parent2;
let sun1;
let sun2;
let sun3;
let currentcolor;
let cubeNul;
let earthPivot;
let earthPivot3;
let mesh;
let planetViewed = 0;
init();
animate();
$(window).on("load", function () {
  TweenMax.to($("#profileWelcome"), 1, {
    css: {
      opacity: 1,
    },
    ease: Quad.easeInOut,
  });
  TweenMax.to($("#profileSocial"), 0.5, {
    css: {
      bottom: "20px",
    },
    delay: 0.5,
    ease: Quad.easeInOut,
  });
  TweenMax.to($("#profile-border"), 0.5, {
    css: {
      height: "400px",
    },
    delay: 0.5,
    ease: Quad.easeInOut,
  });
  TweenMax.to($("#profile-border"), 0.5, {
    css: {
      height: "400px",
    },
    delay: 0.5,
    ease: Quad.easeInOut,
  });
});

function hideprofileWelcome() {
  TweenMax.to($("#profileWelcome"), 0.5, {
    css: {
      opacity: 0,
    },
    ease: Quad.easeInOut,
  });
  TweenMax.to($("#profileWelcome"), 0.5, {
    css: {
      display: "none",
    },
    delay: 1,
    ease: Quad.easeInOut,
  });
}

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 68;
  controls = new THREE.OrbitControls(camera);
  controls.maxDistance = 300;
  controls.minDistance = 30;
  scene = new THREE.Scene();

  // randomn color
  let randomColor = function () {
    let r = Math.random(),
      g = Math.random(),
      b = Math.random();
    return new THREE.Color(r, g, b);
  };

  // background
  let geoSphere = new THREE.SphereGeometry(Math.random() * 1, 20, 20);
  for (let i = 0; i < 500; i++) {
    randRadius = Math.random() * 30 + 10;
    lumiereS = new THREE.MeshPhongMaterial({
      emissive: randomColor(),
      emissiveIntensity: 0.8,
      specular: 0xffed22,
      shininess: 100,
      shading: THREE.FlatShading,
      transparent: 0.7,
      opacity: 0.5,
    });
    sphereTab.push(
      new THREE.Mesh(
        new THREE.SphereGeometry(Math.random() * 1, 20, 20),
        lumiereS
      )
    );
  }
  let posX = -3000;
  let posY = -3000;
  for (let i = 0; i < sphereTab.length; i++) {
    sphereTab[i].position.set(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    scene.add(sphereTab[i]);
  }

  //////Sun////////
  let pinkMat = new THREE.MeshPhongMaterial({
    color: 0xf66120,
    emissive: 0xf66120,
    specular: 0xffed22,
    shininess: 10,
    shading: THREE.FlatShading,
    transparent: 1,
    opacity: 1,
  });
  let pinkMat2 = new THREE.MeshPhongMaterial({
    color: 0xf66120,
    emissive: 0xf66120,
    specular: 0xffed22,
    shininess: 10,
    shading: THREE.FlatShading,
    transparent: 1,
    opacity: 1,
  });

  let geometry = new THREE.IcosahedronGeometry(3, 1);
  let geometry2 = new THREE.IcosahedronGeometry(2.5, 1);
  let geometry4 = new THREE.IcosahedronGeometry(3, 1);

  // add
  let geometry5 = new THREE.IcosahedronGeometry(3, 1);

  // material
  let material = new THREE.MeshPhongMaterial({
    color: 0xffc12d,
    emissive: 0xffc12d,
    shading: THREE.FlatShading,
  });
  let material2 = new THREE.MeshPhongMaterial({
    color: 0x26d7e7,
    emissive: 0x26d7e7,
    shading: THREE.FlatShading,
  });
  let material4 = new THREE.MeshPhongMaterial({
    color: 0xacacac,
    emissive: 0xacacac,
    shading: THREE.FlatShading,
  });

  //add
  let material5 = new THREE.MeshPhongMaterial({
    color: 0xabcdef,
    emissive: 0xabcdef,
    shading: THREE.FlatShading,
  });

  sun1 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat);
  scene.add(sun1);
  objects.push(sun1);
  sun2 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat2);
  sun2.rotation.x = 1;
  scene.add(sun2);
  objects.push(sun2);
  sun3 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat2);
  sun3.rotation.x = 1;
  scene.add(sun2);
  objects.push(sun3);

  earthPivot3 = new THREE.Object3D();
  sun1.add(earthPivot3);

  let radius = 16;
  let tubeRadius = 0.03;
  let radialSegments = 8 * 10;
  let tubularSegments = 6 * 15;
  let arc = Math.PI * 3;
  let geometry3 = new THREE.TorusGeometry(
    radius,
    tubeRadius,
    radialSegments,
    tubularSegments,
    arc
  );
  let material3 = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    shading: THREE.FlatShading,
  });

  mesh = new THREE.Mesh(geometry3, material3);
  earthPivot3.add(mesh);

  /// planet blue ///
  earthPivot = new THREE.Object3D();
  sun1.add(earthPivot);
  let earth = new THREE.Mesh(geometry, material);
  earth.position.x = 15;
  earthPivot.add(earth);
  objects.push(earth);

  ///// planet green ////
  earthPivot2 = new THREE.Object3D();
  sun1.add(earthPivot2);
  let earth2 = new THREE.Mesh(geometry2, material2);
  earth2.position.x = 20;
  earthPivot2.add(earth2);
  objects.push(earth2);

  ////planet violet ///
  earthPivot4 = new THREE.Object3D();
  sun1.add(earthPivot4);
  let earth3 = new THREE.Mesh(geometry4, material4);
  earth3.position.x = 26;
  earthPivot4.add(earth3);
  objects.push(earth3);

  //add planet
  earthPivot5 = new THREE.Object3D();
  sun1.add(earthPivot5);
  let earth5 = new THREE.Mesh(geometry5, material5);
  earth5.position.x = 34;
  earthPivot5.add(earth5);
  objects.push(earth5);

  // lights
  light = new THREE.DirectionalLight(0x4f4f4f);
  light.position.set(4, 4, 4);
  scene.add(light);
  light = new THREE.DirectionalLight(0x4f4f4f);
  light.position.set(-4, -4, -4);
  scene.add(light);
  //render
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.sortObjects = false;
  // renderer.setClearColor(0x131A3D, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  stats = new Stats();
  profile = document.getElementById("profile");
  profile.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
  info = document.getElementById("profileContentTitle");
  profileSubtitle = document.getElementById("profileSubtitle");
  profileDescription = document.getElementById("profileDescription");
  // let profileUniverse = document.getElementById("profileUniverse");
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function setFromCamera(raycaster, coords, origin) {
  raycaster.ray.origin.copy(camera.position);
  raycaster.ray.direction
    .set(coords.x, coords.y, 0.5)
    .unproject(camera)
    .sub(camera.position)
    .normalize();
}

function onMouseDown(event) {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
  setFromCamera(raycaster, mouse, camera);
  let intersects = raycaster.intersectObjects(objects);
  currentcolor = intersects[0].object.material.color.getHex();
  if (intersects.length > 0) {
    // console.log(currentcolor);
    switch (intersects[0].object.geometry.type) {
      case "IcosahedronGeometry":
        if (currentcolor == 0xf66120) {
          if (planetViewed == 0) {
            hideprofileWelcome();
            planetViewed = 1;
            TweenMax.from($("#profileContent"), 0.5, {
              css: {
                left: "-500px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });

            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });

            info.innerHTML = `
            <span>Welten</span> erkunden...
            </br>
            </br>
            <p>Klick auf die Planeten:</p>
            `;

            profileDescription.innerHTML = profileDescription.innerHTML = `
            <p>
            <p class="dot" style="background-color: rgb(255,193,45);">
            </p>
            <p>Alter</p>
            </br>
            <p class="dot" style="background-color: rgb(0,255,255)">
            </p>
            <p>Zertifikate</p>
            </br>
            <p class="dot" style="background-color: rgb(192,192,192);">
            </p>
            <p>Skills</p>
            </br>
            <p class="dot" style="background-color: rgb(189,226,255);">
            </p>
            <p>Hobbies</p>
            </p>
            </br>
               `;
          }
          if (
            planetViewed == 2 ||
            planetViewed == 3 ||
            planetViewed == 4 ||
            planetViewed == 5
          ) {
            planetViewed = 1;
            TweenMax.from($("#profileContent"), 0.5, {
              css: {
                left: "-500px",
              },
              ease: Quad.easeInOut,
            });
            TweenMax.to($("#profile-border"), 0.2, {
              css: {
                height: "400px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });
            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });

            TweenMax.to($("#main-button-skills"), 0.5, {
              css: {
                width: "0px",
                height: "0px",
              },
            });

            TweenMax.to($("#profile-hobbies-img"), 0.5, {
              css: {
                height: "0px",
              },
            });

            info.innerHTML = `
            <span>Welten</span> erkunden...
            </br>
            </br>
            <p>Klick auf die Planeten:</p>
            `;

            profileDescription.innerHTML = profileDescription.innerHTML = `
              <p>
              <p class="dot" style="background-color: rgb(255,193,45);">
              </p>
              <p>Alter</p>
              </br>
              <p class="dot" style="background-color: rgb(0,255,255)">
              </p>
              <p>Zertifikate</p>
              </br>
              <p class="dot" style="background-color: rgb(192,192,192);">
              </p>
              <p>Skills</p>
              </br>
              <p class="dot" style="background-color: rgb(189,226,255);">
              </p>
              <p>Hobbies</p>
              </p>
              </br>
              `;
          }
        }
        if (currentcolor == 0x26d7e7) {
          if (
            planetViewed == 1 ||
            planetViewed == 3 ||
            planetViewed == 4 ||
            planetViewed == 5
          ) {
            planetViewed = 2;
            info.innerHTML = `<span id='couleur'>Zertifikate</span>`;

            document.getElementById("couleur").style.color = "#26d7e7";

            profileDescription.innerHTML = `
              </br>
              <p>
              <p style="color:rgb(0,255,255)";>
              Diplomierter Software Developer
              </p>
              Zertifikat (BFI Tirol)
              </br>
              </p>
              <br/>
              <p>
              <p style="color:rgb(0,255,255)";>
              Responsive Web Design
              </p>
              Developer Certification
              </p>
              </br>
              <p>
              <p style="color:rgb(0,255,255)";>
              JavaScript Algorithms and Data Structures</p>
              Developer Certification
              </p>
              </br>
              <ul>
              <li><span onclick=runAnimations() class="countup" style="color:rgb(0,255,255);">486</span>
              </br> 
              Punkte auf 
              <span style="color:rgb(0,255,255")>freeCodeCamp</span>
              </li> 
            	</ul>
              </br>
              <span style="color:rgb(0,255,255)">Bereise</span> die anderen Planeten
              <br/>
              ...um noch mehr zu erfahren.</div>
              `;

            TweenMax.from(
              $("#profileContent"),
              0.5,
              {
                css: {
                  left: "-500px",
                },
                ease: Quad.easeInOut,
              },
              runAnimations()
            );

            TweenMax.to($("#profile-border"), 0.2, {
              css: {
                height: "400px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });

            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });

            TweenMax.to($("#main-button-skills"), 0.5, {
              css: {
                width: "13px",
                height: "13px",
              },
            });

            TweenMax.to($("#profile-hobbies-img"), 0.5, {
              css: {
                height: "0px",
                width: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });
          }
        }
        if (currentcolor == 0xffc12d) {
          if (
            planetViewed == 1 ||
            planetViewed == 2 ||
            planetViewed == 4 ||
            planetViewed == 5
          ) {
            planetViewed = 3;
            info.innerHTML = "<span id='couleur'>Alter</span> Schwede...";

            profileDescription.innerHTML = `
            </br>
            Ich bin <span style="color: rgb(255,193,45)";>${my_age}</span> 🌍 Jahre  und 
            <span onclick="runAnimations()" style="color: rgb(255,193,45)" class="countup">${diffDays}</span> Tage alt. 
              </br>
              </br>  
              <strong><span style="color: rgb(255,193,45)">Fun Fact:</span></strong><div>Dies entspricht etwa:
              <br/> 
              <br/> 
                - <span style="color: rgb(255,193,45)">${(
                  yearsPlusDays / mercuryYear
                ).toFixed(2)}
                </span> Merkur Jahren
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / venusYear
                 ).toFixed(2)}</span> Venus Jahren 
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / jupiterYear
                 ).toFixed(2)}</span> Jupiter Jahren
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / marsYear
                 ).toFixed(2)}</span> Mars Jahren
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / saturnYear
                 ).toFixed(2)}</span> Saturn Jahren
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / uranusYear
                 ).toFixed(2)}</span> Uranus Jahren
                <br/>
                 - <span style="color: rgb(255,193,45)">${(
                   yearsPlusDays / neptuneYear
                 ).toFixed(2)}
                </span> Neptun Jahren
              <span>  
              </div>
            <div>
            <br/>
            ... oder einer Reise von ca. 
            <span style="color: rgb(255,193,45)">${milliarden.toFixed(2)} 
            </span>
            Milliarden Kilometern um die <span style="color: rgb(255,193,45)">Sonne</span>.
            </br>
            </br>
            <span style="color: rgb(255,193,45)">Bereise</span> die anderen Planeten
            </br>
            ... um noch mehr zu erfahren.
            </br> 
            <div>`;

            document.getElementById("couleur").style.color = "#ffc12d";

            TweenMax.from(
              $("#profileContent"),
              0.5,
              {
                css: {
                  left: "-500px",
                },
                ease: Quad.easeInOut,
              },
              runAnimations()
            );

            TweenMax.to($("#profile-border"), 0.2, {
              css: {
                height: "400px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });
            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });

            TweenMax.to($("#main-button-skills"), 0.5, {
              css: {
                width: "0px",
                height: "0px",
              },
            });

            TweenMax.to($("#profile-hobbies-img"), 0.5, {
              css: {
                height: "0px",
              },
            });
          }
        }
        if (currentcolor == 0xacacac) {
          if (
            planetViewed == 1 ||
            planetViewed == 2 ||
            planetViewed == 3 ||
            planetViewed == 5
          ) {
            planetViewed = 4;
            info.innerHTML = `<span id="couleur">Skills</span>`;
            document.getElementById("couleur").style.color = "#acacac";

            profileDescription.innerHTML = `
            <div>
            <h4>„Die einzige Konstante im Universum ist die Veränderung.“</h4>
            <p>— Heraklit (griechischer vorsokratischer Philosoph)</p>
            </br>
            </br>
            <div>Im expandierenden World Wide Web und Entwickler Kosmos überschreiten die unzähligen Möglichkeiten den Ereignishorizont!</div>
            </br>
            <div>Bisher konnte ich in folgende Welten eintauchen...</div>
            </br>
            <div class="skills-circle-wrap">
                <div class="skills-circle">
            <div class="skill-orbit">
                <div class="skill-planet"><span>Full-Stack</span></div>
            </div>
                <div class="skill-orbit">
            <div class="skill-planet"><span>Frontend</span></div>
            </div>
            <div class="skill-orbit">
              <div class="skill-planet"><span>Backend</span></div>
            </div>
              <div class="skill-orbit">
              <div class="skill-planet"><span>Responsive Web Design</span></div>
            </div>
              <div class="skill-orbit">
          <div class="skill-planet"><span>Web Applikationen</span></div>
        </div>
      </div>
      <div class="skills-top-circle panel"></div>
    </div>

            <div>
            <span>Bereise</span> die anderen Planeten
            <br/>
            ...um noch mehr zu erfahren.</div>
            `;

            TweenMax.from($("#profileContent"), 0.5, {
              css: {
                left: "-500px",
              },
              ease: Quad.easeInOut,
            });

            TweenMax.to($("#profile-border"), 0.1, {
              css: {
                height: "400px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });
            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });
            TweenMax.to($("#profile-hobbies-img"), 0.5, {
              css: {
                height: "0px",
              },
            });

            TweenMax.to($("#main-button-skills"), 0.5, {
              css: {
                width: "13rem",
                height: "13rem",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });
          }
        }
        // add planet
        if (currentcolor == 0xabcdef) {
          if (
            planetViewed == 1 ||
            planetViewed == 2 ||
            planetViewed == 3 ||
            planetViewed == 4
          ) {
            planetViewed = 5;
            info.innerHTML = `
            <span id="couleur">Hobbies</span>
            <div>...über den Bildschirmrand blicken</div>
            `;
            document.getElementById("couleur").style.color = "#ABCDEF";

            profileDescription.innerHTML = `
            `;

            TweenMax.from($("#profileContent"), 0.5, {
              css: {
                left: "-500px",
              },
              ease: Quad.easeInOut,
            });

            TweenMax.to($("#profile-border"), 0.1, {
              css: {
                height: "500px",
              },
              delay: 1,
              ease: Quad.easeInOut,
            });
            TweenMax.from($("#profile-border"), 0.5, {
              css: {
                height: "0px",
              },
              delay: 0.5,
              ease: Quad.easeInOut,
            });
            TweenMax.to($("#main-button-skills"), 0.5, {
              css: {
                width: "0px",
                height: "0px",
              },
            });

            TweenMax.to($("#profile-hobbies-img"), 0.5, {
              css: {
                padding: "40px",
                height: "650px",
                width: "300px",
              },
            });
          }
        }
        break;
    }
  }
  // console.log("Down");
}
document.addEventListener("mousedown", onMouseDown, false);

function animate() {
  let timer = 0.00001 * Date.now();
  for (let i = 0, il = sphereTab.length; i < il; i++) {
    let sfere = sphereTab[i];
    sfere.position.x = 400 * Math.sin(timer + i);
    sfere.position.z = 500 * Math.sin(timer + i * 1.1);
    sfere.position.z = 400 * Math.sin(timer + i * 1.1);
  }
  sun1.rotation.x += 0.008;
  sun2.rotation.y += 0.008;
  sun3.rotation.z += 0.008;
  earthPivot.rotation.z += 0.006;
  earthPivot2.rotation.z += 0.01;
  earthPivot3.rotation.y += 0.007;
  earthPivot4.rotation.z += 0.008;
  earthPivot5.rotation.z += 0.004;
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  // }
  renderer.render(scene, camera);
}
