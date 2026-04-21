const searchBtn = document.querySelector(".search-btn");
const locationInput = document.getElementById("location");
const pickupDateInput = document.getElementById("pickup-date");
const returnDateInput = document.getElementById("return-date");
const carTypeSelect = document.getElementById("car-type");
const bookingMessage = document.getElementById("booking-message");

function showMessage(message, type) {
  bookingMessage.textContent = message;
  bookingMessage.className = "booking-message " + type;
}

function hideMessage() {
  bookingMessage.textContent = "";
  bookingMessage.className = "booking-message";
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

  localStorage.setItem("searchLocation", locationValue);
  localStorage.setItem("searchPickup", pickupDateValue);
  localStorage.setItem("searchReturn", returnDateValue);
  localStorage.setItem("searchType", carTypeValue);

  window.location.href = "Cars list.html";
});