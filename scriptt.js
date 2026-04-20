const searchBtn = document.querySelector(".search-btn");

const locationInput = document.getElementById("location");
const pickupDateInput = document.getElementById("pickup-date");
const returnDateInput = document.getElementById("return-date");
const carTypeSelect = document.getElementById("car-type");

const filterButtons = document.querySelectorAll(".category-btn");
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
  carCards.forEach(function (card) {
    const cardCategory = card.getAttribute("data-category");

    if (filterValue === "all" || filterValue === cardCategory) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  filterButtons.forEach(function (button) {
    button.classList.remove("active");

    if (button.getAttribute("data-filter") === filterValue) {
      button.classList.add("active");
    }
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filterValue = button.getAttribute("data-filter");
    filterCars(filterValue);
    hideMessage();
  });
});

searchBtn.addEventListener("click", function () {
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

  filterCars(selectedType);

  showMessage("Cars filtered successfully.", "success");

  carsSection.scrollIntoView({
    behavior: "smooth"
  });
});