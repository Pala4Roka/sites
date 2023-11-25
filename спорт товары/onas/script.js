const carousel = document.querySelector('.carousel');
const slides = carousel.querySelector('.slides');
const slide = slides.querySelectorAll('.slide');
const prevButton = carousel.querySelector('.prev');
const nextButton = carousel.querySelector('.next');

let currentIndex = 0;
let slideWidth = slide[0].clientWidth;

slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

function updateButtons() {
  if (currentIndex === 0) {
    prevButton.classList.add('disabled');
  } else {
    prevButton.classList.remove('disabled');
  }

  if (currentIndex === slide.length - 1) {
    nextButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
  }
}

prevButton.addEventListener('click', () => {
  currentIndex--;
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  updateButtons();
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  slides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  updateButtons();
});

updateButtons();
function enlargeImage(img) {
  // Create a new element to display the enlarged image
  var overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
  overlay.style.zIndex = 9999;
  overlay.onclick = function() {
    document.body.removeChild(overlay);
  };
  
  // Create a new element for the enlarged image
  var enlargedImg = document.createElement("img");
  enlargedImg.src = img.src;
  enlargedImg.style.position = "absolute";
  enlargedImg.style.top = "50%";
  enlargedImg.style.left = "50%";
  enlargedImg.style.transform = "translate(-50%,-50%)";
  enlargedImg.style.maxHeight = "90%";
  enlargedImg.style.maxWidth = "90%";
  
  // Add the elements to the document
  overlay.appendChild(enlargedImg);
  document.body.appendChild(overlay);
}
function addToCart(button) {
  const product = button.closest('.product');
  const productImageSrc = product.querySelector('.product-image').src;
  const productPrice = parseFloat(product.querySelector('.price').textContent);
  const productQuantity = parseInt(product.querySelector('.quantity').value);

  const cartItems = document.querySelector('.cart-items');
  const cartTotalQuantity = document.getElementById('total-quantity');
  const cartTotalPrice = document.getElementById('total-price');

  const totalPrice = parseFloat(cartTotalPrice.textContent);
  const totalQuantity = parseInt(cartTotalQuantity.textContent);

  const itemTotalPrice = productPrice * productQuantity;

  const newItem = document.createElement('div');
  newItem.classList.add('cart-item');
  newItem.innerHTML = `<img src="${productImageSrc}" alt="Изображение товара" style="width: 35%;">
      <p>Цена: Руб ${productPrice.toFixed(2)} x ${productQuantity} = Руб ${itemTotalPrice.toFixed(2)}</p>
      <input type="number" value="${productQuantity}" min="1">
      <button onclick="updateCartItem(this)">Обновить</button>`;

  cartItems.appendChild(newItem);

  cartTotalQuantity.textContent = totalQuantity + productQuantity;
  cartTotalPrice.textContent = (totalPrice + itemTotalPrice).toFixed(2);
}

function updateCartItem(button) {
  const cartItem = button.parentElement;
  const quantityInput = cartItem.querySelector('input[type="number"]');
  const updatedQuantity = parseInt(quantityInput.value);

  const pricePerItemText = cartItem.querySelector('p').textContent;
  const pricePerItem = parseFloat(pricePerItemText.match(/Руб ([\d\.]+)/)[1]);

  const totalPriceText = cartItem.querySelector('p').textContent;
  const totalPrice = parseFloat(totalPriceText.match(/Руб ([\d\.]+)/)[1]);

  const cartTotalQuantity = document.getElementById('total-quantity');
  const cartTotalPrice = document.getElementById('total-price');

  const totalQuantity = parseInt(cartTotalQuantity.textContent);
  const totalPriceOverall = parseFloat(cartTotalPrice.textContent);

  const difference = updatedQuantity - totalQuantity;
  const priceDifference = pricePerItem * difference;

  cartTotalQuantity.textContent = updatedQuantity;
  cartTotalPrice.textContent = (totalPriceOverall + priceDifference).toFixed(2);

  cartItem.querySelector('p').innerHTML = `Цена: Руб ${pricePerItem.toFixed(2)} x ${updatedQuantity} = Руб ${(pricePerItem * updatedQuantity).toFixed(2)}`;
}
