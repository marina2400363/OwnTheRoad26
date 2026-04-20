const searchBtn = document.querySelector(".search-btn");

const locationInput = document.getElementById("location");
const pickupDateInput = document.getElementById("pickup-date");
const returnDateInput = document.getElementById("return-date");
const carTypeSelect = document.getElementById("car-type");

const carCards = document.querySelectorAll(".car-card");
const carsSection = document.querySelector(".cars-section");
const bookingMessage = document.getElementById("booking-message");

function showMessage(message, type) {
  bookingMessage.textContent = message;
  bookingMessage.className = "booking-message " + type;
}

function hideMessage() {
  bookingMessage.textContent = "";
  bookingMessage.className = "booking-message";
}

function filterCars(filterValue) {
  let found = false;

  carCards.forEach(function (card) {
    const cardCategory = card.getAttribute("data-category");

    if (filterValue === "all" || filterValue === cardCategory) {
      card.style.display = "";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  return found;
}

searchBtn.addEventListener("click", function () {
  hideMessage();

  const locationValue = locationInput.value.trim();
  const pickupDateValue = pickupDateInput.value;
  const returnDateValue = returnDateInput.value;
  const carTypeValue = carTypeSelect.value;

  if (locationValue === "" || pickupDateValue === "" || returnDateValue === "") {
    showMessage("Please fill in pickup location, pickup date, and return date.", "error");
    return;
  }

  if (returnDateValue < pickupDateValue) {
    showMessage("Return date cannot be before pickup date.", "error");
    return;
  }

  const selectedType = carTypeValue === "" ? "all" : carTypeValue;
  const carsFound = filterCars(selectedType);

  if (carsFound) {
    showMessage("Available cars are now shown below.", "success");
  } else {
    showMessage("No cars found for the selected category.", "error");
  }

  carsSection.scrollIntoView({
    behavior: "smooth"
  });
});