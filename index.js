console.log("script.js loaded");

const URL = "https://tickethack-back-chi.vercel.app";
// https://tickethack-front.vercel.app/

// 🔎 Recherche des trajets
document.querySelector('#search').addEventListener('click', function () {
  const departure = document.querySelector('#departure').value;
  const arrival = document.querySelector('#arrival').value;
  const date = document.querySelector('input[type="date"]').value;

  if (!departure || !arrival || !date) {
    alert("Merci de remplir Departure, Arrival et Date !");
    return;
  }

  fetch(`${URL}/trips?departure=${departure}&arrival=${arrival}&date=${date}`)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        displayTrips(data.trips);
      } else {
        displayNoTrips();
      }
    })
    .catch(err => console.error(err));
});

// ✅ Affichage des trajets + bouton Book actif
function displayTrips(trips) {
  const infoBox = document.querySelector('.info-box');
  infoBox.innerHTML = '';

  trips.forEach(trip => {
    const dateTime = new Date(trip.date);
    const time = dateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const item = document.createElement('div');
    item.classList.add('trip-card');

    item.innerHTML = `
      <span class="trip-route">${trip.departure} > ${trip.arrival}</span>
      <span class="trip-time">${time}</span>
      <span class="trip-price">${trip.price}€</span>
      <button class="trip-book">Book</button>
    `;

    // ✅ Quand on clique sur Book → on récupère le voyage
    item.querySelector('.trip-book').addEventListener('click', () => {
      console.log("🎯 Voyage sélectionné :", trip);
      addToCart(trip); // ✅ Optionnel (stockage panier)
      window.location.href = "cart.html";
    });

    infoBox.appendChild(item);
  });
}

// ✅ Fonction d'ajout au panier (localStorage)
function addToCart(trip) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(trip);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("🛒 Ajouté au panier :", trip);
}

// ✅ Si aucun trajet trouvé
function displayNoTrips() {
  const infoBox = document.querySelector('.info-box');
  infoBox.innerHTML = `<p>No trip found 😕</p>`;
}
