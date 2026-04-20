const bookNowBtn = document.getElementById("bookNowBtn");
const backBtn = document.getElementById("backBtn");
const carImage = document.getElementById("carImage");
const relatedCarsGrid = document.getElementById("relatedCarsGrid");

const thumb1 = document.getElementById("thumb1");
const thumb2 = document.getElementById("thumb2");
const thumb3 = document.getElementById("thumb3");

/* Cars database matching Student 2 */
const cars = [
  {
    id: 1,
    name: "Mercedes S-Class",
    category: "Premium",
    price: 6500,
    image: "S-class-exterior.jpeg",
    gallery: ["S-class-exterior.jpeg", "S-class-interior.png"],
    description: "The Mercedes S-Class is a premium luxury sedan that delivers top-level comfort, advanced technology, and a refined driving experience for elegant city and highway trips.",
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
    description: "The BMW X5 is a powerful luxury SUV that combines strong road performance, advanced safety features, and premium comfort for every kind of journey.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "3 Bags",
    color: "White"
  },
  {
    id: 3,
    name: "Renault Kadjar",
    category: "SUV",
    price: 1800,
    image: "renault-kadjar-exterior.jpeg",
    gallery: ["renault-kadjar-exterior.jpeg", "renault-kadjar-interior.png"],
    description: "The Renault Kadjar is a practical SUV that offers good comfort, a smooth ride, and affordable daily rental value for families and everyday travel.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "2 Bags",
    color: "Gray"
  },
  {
    id: 4,
    name: "BYD Song Plus",
    category: "Electric",
    price: 2100,
    image: "BYD-exterior.jpeg",
    gallery: ["BYD-exterior.jpeg", "BYD-interior.png"],
    description: "The BYD Song Plus is a modern electric SUV with smart design, eco-friendly driving, and a smooth comfortable experience for urban and long-distance trips.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    doors: 4,
    luggage: "2 Bags",
    color: "Blue"
  },
  {
    id: 5,
    name: "Skoda Octavia",
    category: "Sedan",
    price: 4800,
    image: "skoda-octavia-exterior.png",
    gallery: ["skoda-octavia-exterior.png", "skoda-octavia-interior.png"],
    description: "The Skoda Octavia is a spacious sedan with a premium feel, solid performance, and excellent comfort for business trips and daily driving.",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: "3 Bags",
    color: "Silver"
  }
];

/* Get selected car from localStorage */
let selectedCar = JSON.parse(localStorage.getItem("selectedCar"));

/* Default fallback car */
if (!selectedCar) {
  selectedCar = cars[0];
}

/* If selected car only has partial data, match it with full database */
const matchedCar = cars.find(function (car) {
  return car.name === selectedCar.name;
});

if (matchedCar) {
  selectedCar = matchedCar;
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

/* Reset thumbnails */
thumbs.forEach(function (thumb) {
  thumb.style.display = "none";
  thumb.classList.remove("active-thumb");
});

/* Show only available images */
galleryImages.forEach(function (imageSrc, index) {
  if (thumbs[index]) {
    thumbs[index].src = imageSrc;
    thumbs[index].alt = selectedCar.name + " Image " + (index + 1);
    thumbs[index].style.display = "block";
  }
});

/* Set first image as active */
if (galleryImages.length > 0) {
  carImage.src = galleryImages[0];
  thumb1.classList.add("active-thumb");
}

/* Thumbnail click behavior */
thumbs.forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    if (thumb.style.display !== "none") {
      carImage.src = thumb.src;

      thumbs.forEach(function (t) {
        t.classList.remove("active-thumb");
      });

      thumb.classList.add("active-thumb");
    }
  });
});

/* Book now */
if (bookNowBtn) {
  bookNowBtn.addEventListener("click", function () {
    localStorage.setItem("bookingCar", JSON.stringify(selectedCar));
    window.location.href = "booking.html";
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
      localStorage.setItem("selectedCar", JSON.stringify(car));
      window.location.href = "carDetails.html";
    });

    relatedCarsGrid.appendChild(card);
  });
}

renderRelatedCars();