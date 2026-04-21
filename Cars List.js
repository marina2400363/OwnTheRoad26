const cars = [
    { id: 1, name: "Mercedes S-Class", type: "Sedan", price: 150, image: "images/Mercedes S class.jpg" },
    { id: 2, name: "BMW X5", type: "SUV", price: 350, image: "images/Bmw x5.jpg" },
    { id: 3, name: "BYD Song Plus", type: "SUV", price: 200, image: "images/Byd Song plus.jpg" },
    { id: 4, name: "Skoda Octavia", type: "Sports", price: 300, image: "images/Octavia.jpg" },
    { id: 5, name: "Renault Kadjar", type: "SUV", price: 180, image: "images/Renault Kadjar.jpg" }
];

const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const sortPrice = document.getElementById('sortPrice');

function renderCars(carsToRender) {
    carGrid.innerHTML = '';

    carsToRender.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';

        card.innerHTML = `
            <img src="${car.image}" class="car-image">
            <div class="car-info">
                <h2 class="car-title">${car.name}</h2>
                <div class="car-type">${car.type}</div>
                <div class="car-price">$${car.price} / day</div>
                <button class="rent-btn">Book Now</button>
            </div>
        `;

        const button = card.querySelector(".rent-btn");

        button.addEventListener("click", function () {
            // ✅ ONLY SAVE NAME
            localStorage.setItem("selectedCarName", car.name);

            // ⚠️ MUST MATCH FILE NAME EXACTLY
            window.location.href = "carDetails.html";
        });

        carGrid.appendChild(card);
    });
}

function updateView() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilter = filterType.value;
    const sortBy = sortPrice.value;

    let filteredCars = cars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm);
        const matchesType = typeFilter === 'all' || car.type === typeFilter;
        return matchesSearch && matchesType;
    });

    if (sortBy === 'low') {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
        filteredCars.sort((a, b) => b.price - a.price);
    }

    renderCars(filteredCars);
}

searchInput.addEventListener('input', updateView);
filterType.addEventListener('change', updateView);
sortPrice.addEventListener('change', updateView);

renderCars(cars);