console.log("cart.js loaded");

// recuperation du panier depuis localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sélection de la cart-box
const cartBox = document.querySelector(".cart-box");

// Fonction pour afficher le panier
function renderCart() {
  cartBox.innerHTML = ""; // clear

  if (cart.length === 0) {
    cartBox.innerHTML = `
      <p class="cart-empty-title">No tickets in your cart.</p>
      <p class="cart-empty-subtitle">Why not plan a trip?</p>
    `;
    return;
  }

  // generation de s ticket dans le panier
  cart.forEach((trip, index) => {
    const date = new Date(trip.date);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
      <span>${trip.departure} > ${trip.arrival}</span>
      <span>${time}</span>
      <span>${trip.price}€</span>
      <button class="delete-btn" data-index="${index}">X</button>
    `;

    cartBox.appendChild(item);
  });

  // Calcul du total
  const total = cart.reduce((sum, trip) => sum + trip.price, 0);

  // Ajout du footer => total + bouton d'achat
  const footer = document.createElement("div");
  footer.classList.add("cart-footer");
  footer.innerHTML = `
    <span class="total-price">Total : ${total}€</span>
    <button class="purchase-btn">Purchase</button>
  `;
  cartBox.appendChild(footer);

  // click => Delete
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const i = this.getAttribute("data-index");
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// click => Purchase
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("purchase-btn")) {
    if (cart.length === 0) return;

    // ajoute des trajets dans "bookings"
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    cart.forEach(trip => bookings.push(trip));

    localStorage.setItem("bookings", JSON.stringify(bookings));

    // vidage du panier
    localStorage.removeItem("cart");

    // Redirection bookings.html
    window.location.href = "bookings.html";
  }
});

// in initialization pour la ncezr l'affcichage
renderCart();
