console.log("bookings.js loaded");

// On récupère les réservations
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const emptyBox = document.querySelector(".empty-box");

// Si aucune réservation
if (bookings.length === 0) {
  emptyBox.innerHTML = `
    <h2 class="bookings-title">Your bookings</h2>
    <p class="main-text">No bookings yet.</p>
    <p class="sub-text">Why not plan a trip?</p>
  `;
} else {
  // On affiche le titre
  emptyBox.innerHTML = `<h2 class="bookings-title">Your bookings</h2>`;

  // On ajoute les réservations
bookings.forEach((trip) => {
  const date = new Date(trip.date);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const countdown = formatCountdown(date);
  const isDeparted = countdown === "Departed";

  // ✅ Ajout de la classe departed si le voyage est passé
  emptyBox.innerHTML += `
    <div class="booking-item ${isDeparted ? "departed" : ""}">
      <span class="booking-route">${trip.departure} > ${trip.arrival}</span>
      <span class="booking-time">${time}</span>
      <span class="booking-duration">${countdown}</span>
    </div>
  `;
});

  // ✅ On ajoute le bouton après le contenu (donc jamais effacé)
  const clearBtn = document.createElement("button");
  clearBtn.id = "clear-bookings-btn";
  clearBtn.textContent = "Clear bookings";
  emptyBox.appendChild(clearBtn);

  // Événement du bouton
  clearBtn.addEventListener("click", function () {
    localStorage.removeItem("bookings");
    location.reload();
  });
}

// Fonction pour formater le temps restant
function formatCountdown(tripDate) {
  const now = new Date();
  const diff = tripDate - now;
  if (diff <= 0) return "Departed";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h ${minutes}m`;
}

// === Ajout du bouton "Clear departed trips" ===
const now = new Date();
const hasDepartedTrips = bookings.some(trip => new Date(trip.date) < now);

if (bookings.length > 0 && hasDepartedTrips) {
  const clearBtn = document.createElement("button");
  clearBtn.id = "clear-departed-btn";
  clearBtn.textContent = "Clear departed trips";
  emptyBox.appendChild(clearBtn);

  clearBtn.addEventListener("click", () => {
    const activeTrips = bookings.filter(trip => new Date(trip.date) > new Date());
    localStorage.setItem("bookings", JSON.stringify(activeTrips));
    location.reload();
  });
}