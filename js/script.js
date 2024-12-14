// Sélectionner les éléments nécessaires
var plusBtns = document.querySelectorAll(".fa-plus-circle");
var minusBtns = document.querySelectorAll(".fa-minus-circle");
var trashBtns = document.querySelectorAll(".fa-trash-alt");
var heartBtns = document.querySelectorAll(".fa-heart");
var totalDisplay = document.querySelector(".total");

// Fonction pour mettre à jour le total
function updateTotal() {
  var totalPrice = 0;
  var allCards = document.querySelectorAll(".card");

  allCards.forEach(function (card) {
    var quantity = parseInt(card.querySelector(".quantity").innerText);
    var unitPrice = parseInt(
      card.querySelector(".unit-price").innerText.replace(/[^\d.-]/g, '')
    );
    totalPrice += quantity * unitPrice;
  });

  totalDisplay.innerText = totalPrice.toFixed(2) + " $";
  // Sauvegarder le total dans localStorage si besoin
  localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Bouton +
plusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var quantitySpan = this.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.innerText);
    quantitySpan.innerText = currentQuantity + 1;
    updateTotal();
  });
});

// Bouton -
minusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var quantitySpan = this.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.innerText);
    if (currentQuantity > 1) { // La quantité ne peut pas être inférieure à 1
      quantitySpan.innerText = currentQuantity - 1;
    }
    updateTotal();
  });
});

// Supprimer un produit
trashBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.closest(".card").remove();
      updateTotal();
    }
  });
});

// Aimer un produit
heartBtns.forEach(function (btn) {
  btn.setAttribute('aria-label', 'Aimer ce produit'); // Ajout d'un attribut aria pour l'accessibilité
  btn.addEventListener("click", function () {
    this.classList.toggle("liked");
    this.style.color = this.classList.contains("liked") ? "red" : "#6c757d";
  });
});

// Sauvegarder et récupérer les données dans localStorage
window.addEventListener('load', function () {
  var savedTotalPrice = localStorage.getItem('totalPrice');
  if (savedTotalPrice) {
    totalDisplay.innerText = savedTotalPrice + " $";
  }
  
  // Récupérer les informations sur les produits dans le localStorage (si nécessaire)
  var savedProducts = JSON.parse(localStorage.getItem('products'));
  if (savedProducts) {
    savedProducts.forEach(function(product) {
      var card = document.querySelector(`.card[data-id="${product.id}"]`);
      if (card) {
        var quantitySpan = card.querySelector(".quantity");
        quantitySpan.innerText = product.quantity;
      }
    });
  }
});

// Sauvegarder les produits dans le localStorage après chaque modification
plusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var card = this.closest(".card");
    var productId = card.getAttribute("data-id");
    var quantitySpan = card.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.innerText);
    
    var savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    var product = savedProducts.find(p => p.id === productId);
    if (product) {
      product.quantity = currentQuantity + 1;
    } else {
      savedProducts.push({ id: productId, quantity: currentQuantity + 1 });
    }
    localStorage.setItem('products', JSON.stringify(savedProducts));
    updateTotal();
  });
});

minusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var card = this.closest(".card");
    var productId = card.getAttribute("data-id");
    var quantitySpan = card.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.innerText);
    
    if (currentQuantity > 1) {
      var savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      var product = savedProducts.find(p => p.id === productId);
      if (product) {
        product.quantity = currentQuantity - 1;
      }
      localStorage.setItem('products', JSON.stringify(savedProducts));
      updateTotal();
    }
  });
});

trashBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      var card = this.closest(".card");
      var productId = card.getAttribute("data-id");

      var savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      savedProducts = savedProducts.filter(p => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(savedProducts));
      
      card.remove();
      updateTotal();
    }
  });
});


/*recherche barre */

// Sélectionner les éléments nécessaires
const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');

// Fonction pour filtrer les produits en fonction de la recherche
function searchProducts() {
  const query = searchInput.value.toLowerCase(); // Récupère le texte recherché et le met en minuscule pour une comparaison insensible à la casse

  // Parcours chaque carte de produit
  productCards.forEach(function(card) {
    const title = card.querySelector('.card-title').innerText.toLowerCase(); // Le nom du produit (titre)
    const description = card.querySelector('.card-text').innerText.toLowerCase(); // Description du produit

    // Si le titre ou la description contient le texte recherché, on affiche le produit, sinon on le cache
    if (title.includes(query) || description.includes(query)) {
      card.style.display = 'block'; // Affiche le produit
    } else {
      card.style.display = 'none'; // Cache le produit
    }
  });
}

// Ajouter un événement pour chaque saisie de l'utilisateur dans le champ de recherche
searchInput.addEventListener('input', searchProducts);

// Optionnel : Empêcher l'envoi du formulaire de recherche pour éviter que la page se recharge
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire
  searchProducts(); // Lance la recherche
});
