const productsDOM = document.querySelector('.products');
const form = document.querySelector('.contact__form');

const products = [
  {
    id: 1,
    imgSrc: './images/photo1.png',
    name: 'Vintage Backbag',
    price: 54.99,
    oldPrice: 94.99,
    amount: 1,
  },
  {
    id: 2,
    imgSrc: './images/photo2.png',
    name: 'Levi Shoes',
    price: 74.99,
    oldPrice: 124.99,
    amount: 1,
  },
];

function createItems() {
  let result = '';
  products.forEach((item) => {
    result += `<div class="products__item" data-id="${item.id}">
            <div class="product__image">
              <img src="${item.imgSrc}" alt="${item.name}" />
            </div>
            <div class="products__info">
              <div class="products__info--top">
                <h3 class="product__name">${item.name}</h3>
                <p class="product__price">$${item.price}<span class="old__price">$${item.oldPrice}</span></p>
              </div>
              <div class="button__group">
                <button class="decrease btn">-</button>
                <p class="product__amount">${item.amount}</p>
                <button class="increase btn">+</button>
              </div>
            </div>
          </div>`;
  });
  productsDOM.innerHTML = result;
}

createItems();

function calcTotalCost() {
  return products.reduce((sum, item) => sum + item.amount * item.price, 0);
}

productsDOM.innerHTML += `
    <div class="costs__wrapper">
        <div class="top__line shipping">
            <p class="title">Shipping</p>
            <p class="shipping__cost">$19</p>
        </div>
        <div class="top__line shipping">
            <p class="title">Total</p>
            <p id="totalcost">$${calcTotalCost()}</p>
        </div>
    </div>
`;

const increaseBtns = Array.from(document.querySelectorAll('.increase'));
const decreaseBtns = Array.from(document.querySelectorAll('.decrease'));

let totalCostDOM = document.getElementById('totalcost');

let totalCost = 0;

increaseBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parentEl = e.target.parentElement.parentElement.parentElement;
    const elemID = parentEl.dataset.id;

    const foundObj = products.find((item) => item.id == elemID);
    foundObj.amount++;
    let amount = e.target.previousElementSibling;
    amount.textContent = foundObj.amount;
    totalCost = calcTotalCost() + 19;
    totalCostDOM.textContent = '$' + totalCost.toFixed(2);
  });
});

decreaseBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parentEl = e.target.parentElement.parentElement.parentElement;
    const elemID = parentEl.dataset.id;

    const foundObj = products.find((item) => item.id == elemID);
    if (foundObj.amount === 1) {
      return;
    } else {
      foundObj.amount--;
      let amount = e.target.nextElementSibling;
      amount.textContent = foundObj.amount;
      totalCost = calcTotalCost() + 19;
      totalCostDOM.textContent = '$' + totalCost.toFixed(2);
    }
  });
});

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailError = document.getElementById('error__email');
const phoneError = document.getElementById('error__phone');
const nameError = document.getElementById('error__name');
const addressError = document.getElementById('error__address');
const cityError = document.getElementById('error__city');
const countryError = document.getElementById('error__country');
const postalCodeError = document.getElementById('error__postalcode');

function handleSubmit(e) {
  e.preventDefault();
  let email = form.email.value;
  const phone = form.phone.value;
  const name = form.name.value;
  const address = form.address.value;
  const city = form.city.value;
  const country = form.country.value;
  const postalCode = form.pcode.value;

  if (!emailPattern.test(email) || email === '') {
    emailError.classList.add('active');
    emailError.textContent = 'email is missing or has wrong format';
  } else {
    if (emailError.classList.contains('active')) {
      emailError.classList.remove('active');
    }
  }

  if (name === '') {
    nameError.classList.add('active');
    nameError.textContent = 'name is missing';
  } else {
    if (nameError.classList.contains('active')) {
      nameError.classList.remove('active');
    }
  }

  if (phone === '') {
    phoneError.classList.add('active');
    phoneError.textContent = 'phone number is missing';
  } else {
    if (phoneError.classList.contains('active')) {
      phoneError.classList.remove('active');
    }
  }

  if (address === '') {
    addressError.classList.add('active');
    addressError.textContent = 'address is missing';
  } else {
    if (addressError.classList.contains('active')) {
      addressError.classList.remove('active');
    }
  }

  if (city === '') {
    cityError.classList.add('active');
    cityError.textContent = 'city is missing';
  } else {
    if (cityError.classList.contains('active')) {
      cityError.classList.remove('active');
    }
  }

  if (country === '') {
    countryError.classList.add('active');
    countryError.textContent = 'country is missing';
  } else {
    if (countryError.classList.contains('active')) {
      countryError.classList.remove('active');
    }
  }

  if (postalCode === '') {
    postalCodeError.classList.add('active');
    postalCodeError.textContent = 'postal code is missing';
  } else {
    if (postalCodeError.classList.contains('active')) {
      postalCodeError.classList.remove('active');
    }
  }
}

form.addEventListener('submit', handleSubmit);
