console.log("bookings.js loaded");

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const emptyBox = document.querySelector(".empty-box");

// Si pas de réservations → on garde le message existant
if (bookings.length === 0) {
  console.log("Aucune réservation");
} else {
  // On remplace uniquement le contenu APRES le titre, pas le titre lui-même !
  emptyBox.innerHTML = `<h2 class="bookings-title">Your bookings</h2>`; 

  // Pour chaque réservation → on ajoute une ligne
  bookings.forEach(trip => {
    const date = new Date(trip.date);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    emptyBox.innerHTML += `
      <div class="booking-item">
        <span class="booking-route">${trip.departure} > ${trip.arrival}</span>
        <span class="booking-time">${time}</span>
        <span class="booking-duration">${formatCountdown(date)}</span>
      </div>
    `;
  });
}

// Fonction qui calcule le temps restant avant départ
function formatCountdown(date) {
  const now = new Date();
  const diff = date - now;

  if (diff <= 0) return "Departed";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m`;
}
