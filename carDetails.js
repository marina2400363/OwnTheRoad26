const bookNowBtn = document.getElementById("bookNowBtn");
const backBtn = document.getElementById("backBtn");
const carImage = document.getElementById("carImage");
const relatedCarsGrid = document.getElementById("relatedCarsGrid");

const thumb1 = document.getElementById("thumb1");
const thumb2 = document.getElementById("thumb2");
const thumb3 = document.getElementById("thumb3");

/* Cars database */
const cars = [
  {
    id: 1,
    name: "Mercedes S-Class",
    category: "Premium",
    price: 6500,
    image: "S-class-exterior.jpeg",
    gallery: ["S-class-exterior.jpeg", "S-class-interior.png"],
    description: "The Mercedes S-Class is a premium luxury sedan that delivers top-level comfort, advanced technology, and a refined driving experience.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "3 Bags",
    color: "Black"
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 5000,
    image: "bmw-x5-exterior.png",
    gallery: ["bmw-x5-exterior.png", "bmw-x5-interior.png"],
    description: "The BMW X5 is a powerful luxury SUV.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "3 Bags",
    color: "Black"
  },
  {
    id: 3,
    name: "Renault Kadjar",
    category: "SUV",
    price: 1800,
    image: "renault-kadjar-exterior.jpeg",
    gallery: ["renault-kadjar-exterior.jpeg", "renault-kadjar-interior.png"],
    description: "The Renault Kadjar is a practical SUV.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "2 Bags",
    color: "Red"
  },
  {
    id: 4,
    name: "BYD Song Plus",
    category: "Electric",
    price: 2100,
    image: "BYD-exterior.jpeg",
    gallery: ["BYD-exterior.jpeg", "BYD-interior.png"],
    description: "Modern electric SUV.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    doors: 4,
    luggage: "2 Bags",
    color: "White"
  },
  {
    id: 5,
    name: "Skoda Octavia",
    category: "Sedan",
    price: 4800,
    image: "skoda-octavia-exterior.png",
    gallery: ["skoda-octavia-exterior.png", "skoda-octavia-interior.png"],
    description: "Comfortable sedan.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "3 Bags",
    color: "Grey"
  }
];

/* Get selected car name only */
const selectedCarName = localStorage.getItem("selectedCarName");

/* Find selected car */
let selectedCar = cars.find(function (car) {
  return car.name === selectedCarName;
});

/* Fallback */
if (!selectedCar) {
  selectedCar = cars[0];
}

/* Show car details */
document.getElementById("carName").textContent = selectedCar.name;
document.getElementById("carCategory").textContent = selectedCar.category;
document.getElementById("carPrice").textContent = selectedCar.price;
document.getElementById("carImage").src = selectedCar.image;
document.getElementById("carImage").alt = selectedCar.name;
document.getElementById("carDescription").textContent = selectedCar.description;
document.getElementById("carSeats").textContent = selectedCar.seats;
document.getElementById("carTransmission").textContent = selectedCar.transmission;
document.getElementById("carFuel").textContent = selectedCar.fuel;
document.getElementById("carDoors").textContent = selectedCar.doors;
document.getElementById("carLuggage").textContent = selectedCar.luggage;
document.getElementById("carColor").textContent = selectedCar.color;

/* Gallery */
const galleryImages = selectedCar.gallery || [selectedCar.image];
const thumbs = [thumb1, thumb2, thumb3];

thumbs.forEach(function (thumb) {
  if (thumb) {
    thumb.style.display = "none";
    thumb.classList.remove("active-thumb");
  }
});

galleryImages.forEach(function (img, i) {
  if (thumbs[i]) {
    thumbs[i].src = img;
    thumbs[i].alt = selectedCar.name + " image " + (i + 1);
    thumbs[i].style.display = "block";
  }
});

if (galleryImages.length > 0) {
  carImage.src = galleryImages[0];
  if (thumb1) {
    thumb1.classList.add("active-thumb");
  }
}

thumbs.forEach(function (thumb) {
  if (thumb) {
    thumb.addEventListener("click", function () {
      if (thumb.style.display !== "none") {
        carImage.src = thumb.src;

        thumbs.forEach(function (t) {
          if (t) {
            t.classList.remove("active-thumb");
          }
        });

        thumb.classList.add("active-thumb");
      }
    });
  }
});

/* Book now */
if (bookNowBtn) {
  bookNowBtn.addEventListener("click", function () {
    localStorage.setItem("bookingCar", selectedCar.name);
    window.location.href = "m.html";
  });
}

/* Back */
if (backBtn) {
  backBtn.addEventListener("click", function () {
    window.history.back();
  });
}

/* Related cars */
function renderRelatedCars() {
  if (!relatedCarsGrid) {
    return;
  }

  const relatedCars = cars.filter(function (car) {
    return car.name !== selectedCar.name;
  }).slice(0, 3);

  relatedCarsGrid.innerHTML = "";

  relatedCars.forEach(function (car) {
    const card = document.createElement("div");
    card.className = "related-card";

    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}">
      <div class="related-card-info">
        <h3>${car.name}</h3>
        <p class="related-card-type">${car.category}</p>
        <p class="related-card-price">${car.price} LE / day</p>
        <a href="#" class="related-btn">View Details</a>
      </div>
    `;

    const button = card.querySelector(".related-btn");
    button.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("selectedCarName", car.name);
      window.location.href = "carDetails.html";
    });

    relatedCarsGrid.appendChild(card);
  });
}

renderRelatedCars();