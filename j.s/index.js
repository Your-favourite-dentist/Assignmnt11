const Allinks = document.querySelectorAll("nav a")
const Allsections = document.querySelectorAll("section")

Allinks.forEach((link) => {
  link.addEventListener("click", function () {
    Allsections.forEach((sec) => {
      sec.classList.add("hidden")
    })

    document
      .getElementById(link.getAttribute("data-section"))
      .classList.remove("hidden")
  })
})
  
   
const NASA_API_KEY = "wNqTdQNmAlRSEugaGgmOWUg0bicYVMb02a4omJpP"

const apodDateInput = document.getElementById("apod-date-input")
const apodImage = document.getElementById("apod-image")
const apodTitle = document.getElementById("apod-title")
const apodExplanation = document.getElementById("apod-explanation")
const apodDate = document.getElementById("apod-date");


apodDateInput.addEventListener("change", function () {
  this.nextElementSibling.textContent = new Date(this.value).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
});

async function getApod(date) {
  try {
    let url = "https://api.nasa.gov/planetary/apod?api_key=" + NASA_API_KEY;

    if (date) {
      url += "&date=" + date;
    }

    let response = await fetch(url)
    let data = await response.json()

    if (data.media_type === "image") {
      apodImage.src = data.url;
    } else {
      apodImage.src = "./assets/images/placeholder.webp"
    }

    apodTitle.textContent = data.title;
    apodExplanation.textContent = data.explanation;
    apodDate.textContent = data.date;
    apodDateInput.value = data.date;

  } catch (error) {
    console.log("Error:", error);
  }
}

getApod();


async function getLaunches() {
  try {
    let url =
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10";

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    let launches = data.results;

    launchesGrid.innerHTML = "";

    launches.forEach(function (launch) {
      launchesGrid.innerHTML += 
        `<div
          class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
        >
          <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
            <img
              src="${launch.image}"
              class="w-full h-full object-cover"
              alt="${launch.name}"
            />
          </div>

          <div class="p-5">
            <h4 class="font-bold text-lg mb-2">
              ${launch.name}
            </h4>

            <p class="text-sm text-slate-400 mb-3">
              ${launch.launch_service_provider?.name || "Unknown"}
            </p>

            <div class="space-y-2 text-sm">
              <p>
                <i class="fas fa-calendar text-slate-500"></i>
                ${new Date(launch.net).toLocaleDateString()}
              </p>

              <p>
                <i class="fas fa-clock text-slate-500"></i>
                ${new Date(launch.net).toLocaleTimeString()}
              </p>

              <p>
                <i class="fas fa-rocket text-slate-500"></i>
                ${launch.rocket?.configuration?.name || "Unknown"}
              </p>

              <p>
                <i class="fas fa-map-marker-alt text-slate-500"></i>
                ${launch.pad?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>`
      ;
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

const launchesGrid = document.getElementById("launches-grid");

getLaunches();

document.getElementById("load-date-btn").addEventListener("click", function () {
  let date = apodDateInput.value;

  if (date) {
    getApod(date);
  }
});

document.getElementById("today-apod-btn").addEventListener("click", function () {
  apodDateInput.value = "";
  getApod();
});

const planetsData = {
  mercury: {
    name: "Mercury",
    distance: "57,900,000",
    radius: "2,439.7",
    mass: "3.3 × 10^23",
    density: "5.43",
    orbital: "88.00",
    rotation: "1407.6",
    moons: 0,
    gravity: "3.7"
  },
  venus: {
    name: "Venus",
    distance: "108,200,000",
    radius: "6,051.8",
    mass: "4.87 × 10^24",
    density: "5.24",
    orbital: "224.70",
    rotation: "5832.5",
    moons: 0,
    gravity: "8.87"
  },
  earth: {
    name: "Earth",
    distance: "149,600,000",
    radius: "6,371",
    mass: "5.97 × 10^24",
    density: "5.51",
    orbital: "365.25",
    rotation: "24",
    moons: 1,
    gravity: "9.8"
  },
  mars: {
    name: "Mars",
    distance: "227,900,000",
    radius: "3,389.5",
    mass: "6.42 × 10^23",
    density: "3.93",
    orbital: "687.00",
    rotation: "24.6",
    moons: 2,
    gravity: "3.71"
  },
  jupiter: {
    name: "Jupiter",
    distance: "778,600,000",
    radius: "69,911",
    mass: "1.90 × 10^27",
    density: "1.33",
    orbital: "4331.00",
    rotation: "9.9",
    moons: 79,
    gravity: "24.79"
  },
  saturn: {
    name: "Saturn",
    distance: "1,433,500,000",
    radius: "58,232",
    mass: "5.68 × 10^26",
    density: "0.69",
    orbital: "10747.00",
    rotation: "10.7",
    moons: 82,
    gravity: "10.44"
  },
  uranus: {
    name: "Uranus",
    distance: "2,872,500,000",
    radius: "25,362",
    mass: "8.68 × 10^25",
    density: "1.27",
    orbital: "30589.00",
    rotation: "17.2",
    moons: 27,
    gravity: "8.69"
  },
  neptune: {
    name: "Neptune",
    distance: "4,495,100,000",
    radius: "24,622",
    mass: "1.02 × 10^26",
    density: "1.64",
    orbital: "59800.00",
    rotation: "16.1",
    moons: 14,
    gravity: "11.15"
  }
};

document.querySelectorAll(".planet-card").forEach(function (card) {
  card.addEventListener("click", function () {
    let planetId = this.getAttribute("data-planet-id");
    let data = planetsData[planetId];

    if (!data) {
      return;
    }

    document.getElementById("planet-detail-image").src = `img/${planetId} (1).png`;
    document.getElementById("planet-detail-name").textContent = data.name;
    document.getElementById("planet-distance").textContent = data.distance + " km";
    document.getElementById("planet-radius").textContent = data.radius + " km";
    document.getElementById("planet-mass").textContent = data.mass + " kg";
    document.getElementById("planet-density").textContent = data.density + " g/cm³";
    document.getElementById("planet-orbital-period").textContent = data.orbital + " days";
    document.getElementById("planet-rotation").textContent = data.rotation + " hours";
    document.getElementById("planet-moons").textContent = data.moons;
    document.getElementById("planet-gravity").textContent = data.gravity + " m/s²";
  });
});