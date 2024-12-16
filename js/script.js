// Sélectionner les éléments
let plusButtons = Array.from(document.getElementsByClassName("fa-plus-circle"));
let minusButtons = Array.from(document.getElementsByClassName("fa-minus-circle"));
let trashButtons = Array.from(document.getElementsByClassName("fa-trash-alt"));
let heartButtons = Array.from(document.getElementsByClassName("fa-heart"));
let totalDisplay = document.querySelector(".total");

// Boutons "+"
for (let i = 0; i < plusButtons.length; i++) {
  plusButtons[i].addEventListener("click", function () {
    let quantitySpan = plusButtons[i].nextElementSibling;
    quantitySpan.innerHTML++;
    updateTotal();
  });
}

// Boutons "-"
for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener("click", function () {
    let quantitySpan = minusButtons[i].previousElementSibling;
    if (parseInt(quantitySpan.innerHTML) > 0) {
      quantitySpan.innerHTML--;
      updateTotal();
    }
  });
}

// Fonction pour mettre à jour le total
function updateTotal() {
  let totalPrice = 0;
  let cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    let quantity = parseInt(cards[i].querySelector(".quantity").innerHTML);
    let unitPrice = parseInt(cards[i].querySelector(".unit-price").innerHTML.replace(" $", ""));
    totalPrice += quantity * unitPrice;
  }

  totalDisplay.innerHTML = totalPrice.toFixed(2) + " $";
}

// Boutons "Supprimer"
for (let i = 0; i < trashButtons.length; i++) {
  trashButtons[i].addEventListener("click", function () {
    let card = trashButtons[i].closest(".card");
    card.remove();
    updateTotal();
  });
}

// Boutons "Cœur"
for (let i = 0; i < heartButtons.length; i++) {
  heartButtons[i].addEventListener("click", function () {
    heartButtons[i].classList.toggle("liked");
    heartButtons[i].style.color = heartButtons[i].classList.contains("liked") ? "red" : "#6c757d";
  });
}

/* Recherche barre */
const searchInput = document.getElementById("search-input");
const productCards = document.querySelectorAll(".product-card");

function searchProducts() {
  const query = searchInput.value.toLowerCase();

  productCards.forEach(function (card) {
    const title = card.querySelector(".card-title").innerText.toLowerCase();
    const description = card.querySelector(".card-text").innerText.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", searchProducts);

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchProducts();
});