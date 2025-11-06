console.log("cart.js loaded");

// On récupère le contenu du panier depuis localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sélection de la zone <div class="cart-box">
const cartBox = document.querySelector(".cart-box");

// Fonction d'affichage du panier
function renderCart() {
  cartBox.innerHTML = ""; // On nettoie

  if (cart.length === 0) {
    cartBox.innerHTML = `
      <p class="cart-empty-title">No tickets in your cart.</p>
      <p class="cart-empty-subtitle">Why not plan a trip?</p>
    `;
    return;
  }

  // On génère les tickets présents dans le panier
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

  // Ajout du footer total + bouton d'achat
  const footer = document.createElement("div");
  footer.classList.add("cart-footer");
  footer.innerHTML = `
    <span class="total-price">Total : ${total}€</span>
    <button class="purchase-btn">Purchase</button>
  `;
  cartBox.appendChild(footer);

  // Gestion des clics sur les boutons delete
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const i = this.getAttribute("data-index");
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  // ✅ Gestion du clic sur le bouton Purchase
  const purchaseBtn = document.querySelector(".purchase-btn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", function () {
      if (cart.length === 0) return;

      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(...cart);

      localStorage.setItem("bookings", JSON.stringify(bookings));
      localStorage.removeItem("cart");

      window.location.href = "bookings.html";
    });
  }
}

// On lance l'affichage au chargement
renderCart();
