// ========================================
// SOLEVERSE - MAIN JAVASCRIPT
// ========================================

const MAX_PRODUCTS = 15;
const THEME_KEY = "soleverseTheme";
const CART_KEY = "soleverseCart";
const FAV_KEY = "soleverseFavourites";

// HelpJet Widget Loader
(function (w, d, s, botId) {
  if (w.HelpJet && w.HelpJet.loaded) {
    console.warn("HelpJet widget already loaded");
    return;
  }
  var js = d.createElement(s);
  js.async = true;
  // Tells HelpJet which site loaded it (origin only, never the page path).
  js.referrerPolicy = "strict-origin-when-cross-origin";
  js.src = "https://app.helpjet.com/api/widget/loader.js?botId=" + botId;
  js.onerror = function () {
    console.error("Failed to load HelpJet widget");
  };
  var fjs = d.getElementsByTagName(s)[0];
  fjs.parentNode.insertBefore(js, fjs);
})(window, document, "script", "jh71spbjbwnzy8mq1c61h0f5dd8hfwr7");

// ========================================
// 1. PRODUCTS DATA
// ========================================

const products = [
  {
    id: 1,
    name: "Air Max Shadow",
    type: "Running",
    price: 12999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-01.jpg",
    gallery: [
      "images/shoe-01v2.jpg",
      "images/shoe-01v3.jpg",
      "images/shoe-01v4.jpg",
    ],
  },
  {
    id: 2,
    name: "Velocity Pro",
    type: "Sport",
    price: 10499,
    tag: "SALE",
    filter: "sale",
    image: "images/shoe-02.jpg",
    gallery: [
      "images/pexels-arturoaez225-13525579 (1).jpg",
      "images/pexels-arturoaez225-13525711.jpg",
      "images/pexels-arturoaez225-13525776.jpg",
    ],
  },
  {
    id: 3,
    name: "Urban Pulse",
    type: "Casual",
    price: 14999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-03.jpg",
    gallery: [
      "images/pexels-rafael-quaty-37077235-13236693.jpg",
      "images/pexels-rafael-quaty-37077235-13580587.jpg",
      "images/pexels-rafael-quaty-37077235-17630275.jpg",
    ],
  },
  {
    id: 4,
    name: "Phantom X",
    type: "Sport",
    price: 16999,
    tag: "HOT",
    filter: "",
    image: "images/shoe-04.jpg",
    gallery: [
      "images/pexels-ashis-sarker-706183433-18155788.jpg",
      "images/pexels-ashis-sarker-706183433-18155790.jpg",
    ],
  },
  {
    id: 5,
    name: "Nike Revolution",
    type: "Running",
    price: 11999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-05.jpg",
    gallery: [
      "images/pexels-mart-production-7880001.jpg",
      "images/pexels-mart-production-7880179.jpg",
      "images/pexels-mart-production-7880250.jpg",
    ],
  },
  {
    id: 6,
    name: "Adidas Boost",
    type: "Running",
    price: 13499,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-06.jpg",
    gallery: [
      "images/pexels-introspectivedsgn-4211331.jpg",
      "images/pexels-introspectivedsgn-4211334.jpg",
      "images/pexels-introspectivedsgn-4211337.jpg",
    ],
  },
  {
    id: 7,
    name: "Puma Velocity",
    type: "Sport",
    price: 12799,
    tag: "SALE",
    filter: "sale",
    image: "images/shoe-07.jpg",
    gallery: [
      "images/pexels-wolrider-18202566.jpg",
      "images/pexels-wolrider-18202569.jpg",
      "images/pexels-wolrider-18368120.jpg",
    ],
  },
  {
    id: 8,
    name: "Street Flex",
    type: "Casual",
    price: 9999,
    tag: "HOT",
    filter: "",
    image: "images/shoe-08.jpg",
    gallery: [
      "images/pexels-alokkd1-19577865.jpg",
      "images/pexels-alokkd1-19577866.jpg",
      "images/pexels-alokkd1-19577867.jpg",
    ],
  },
  {
    id: 9,
    name: "Cloud Runner",
    type: "Running",
    price: 13999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-09.jpg",
    gallery: [
      "images/pexels-karola-g-4498570.jpg",
      "images/pexels-karola-g-4498571.jpg",
      "images/pexels-karola-g-4498608.jpg",
    ],
  },
  {
    id: 10,
    name: "Retro Court",
    type: "Casual",
    price: 11499,
    tag: "SALE",
    filter: "sale",
    image: "images/shoe-10.jpg",
    gallery: [
      "images/pexels-wolrider-18188493.jpg",
      "images/pexels-wolrider-18188496.jpg",
      "images/pexels-wolrider-18188498.jpg",
    ],
  },
  {
    id: 11,
    name: "Sprint Edge",
    type: "Sport",
    price: 15499,
    tag: "HOT",
    filter: "",
    image: "images/shoe-11.jpg",
    gallery: [
      "images/pexels-mikhail-nilov-8454904.jpg",
      "images/pexels-mikhail-nilov-8454950.jpg",
      "images/pexels-mikhail-nilov-8454951.jpg",
    ],
  },
  {
    id: 12,
    name: "Urban Classic",
    type: "Casual",
    price: 10999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-12.jpg",
    gallery: [
      "images/pexels-hurrahsuhail-11324524.jpg",
      "images/pexels-hurrahsuhail-11324527.jpg",
      "images/pexels-hurrahsuhail-11324547.jpg",
    ],
  },
  {
    id: 13,
    name: "Aero Flex",
    type: "Running",
    price: 17999,
    tag: "NEW",
    filter: "new",
    image: "images/shoe-13.jpg",
    gallery: [
      "images/shoes-13 (2).jpg",
      "images/shoes-13 (3).jpg",
      "images/shoes-13 (4).jpg",
    ],
  },
  {
    id: 14,
    name: "Court Vision",
    type: "Sport",
    price: 12499,
    tag: "SALE",
    filter: "sale",
    image: "images/shoe-14.jpg",
    gallery: [
      "images/pexels-willy-mendez-1669648805-27862753.jpg",
      "images/pexels-willy-mendez-1669648805-27862755.jpg",
    ],
  },
  {
    id: 15,
    name: "Metro Knit",
    type: "Casual",
    price: 14499,
    tag: "HOT",
    filter: "",
    image: "images/shoe-15.jpg",
    gallery: [
      "images/pexels-makrufinmuhammad-38154574.jpg",
      "images/pexels-makrufinmuhammad-38154582.jpg",
      "images/pexels-makrufinmuhammad-38154590.jpg",
    ],
  },
];

// ========================================
// 2. TOAST NOTIFICATION
// ========================================

function showToast(message, type = "success") {
  let toast = document.getElementById("soleverseToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "soleverseToast";
    toast.className = "soleverse-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `soleverse-toast ${type} show`;

  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ========================================
// 3. THANK YOU POPUP
// ========================================

function showThankYouPopup() {
  let overlay = document.getElementById("thankYouOverlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "thankYouOverlay";
    overlay.className = "thankyou-overlay";
    overlay.innerHTML = `
      <div class="thankyou-box" role="dialog" aria-modal="true">
        <div class="thankyou-icon">✓</div>
        <h2>Thank you for your shopping!</h2>
        <p class="muted">Your order has been placed successfully.</p>
        <a class="btn" href="sneakers.html">Continue shopping</a>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        overlay.classList.remove("show");
      }
    });
  }

  overlay.classList.add("show");
}

// ========================================
// 4. DARK / LIGHT THEME
// ========================================

function applyTheme(theme) {
  const currentTheme = theme === "light" ? "light" : "dark";

  document.documentElement.dataset.theme = currentTheme;

  const themeButton = document.querySelector(".theme-toggle");

  if (themeButton) {
    if (currentTheme === "dark") {
      themeButton.innerHTML =
        '<span class="theme-toggle-icon">☀</span><span class="theme-toggle-text">Light</span>';
    } else {
      themeButton.innerHTML =
        '<span class="theme-toggle-icon">☾</span><span class="theme-toggle-text">Dark</span>';
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  try {
    localStorage.setItem(THEME_KEY, newTheme);
  } catch (error) {
    // Storage unavailable: theme still changes on this page.
  }

  applyTheme(newTheme);
}

// ========================================
// 5. MOBILE NAVIGATION
// ========================================

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");

  if (navLinks) {
    navLinks.classList.toggle("show");
  }
}

// ========================================
// 6. CART FUNCTIONS
// ========================================

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

function removeFromCart(index) {
  const cart = getCart();
  const removed = cart.splice(index, 1)[0];

  saveCart(cart);
  renderCheckout();

  if (removed) {
    showToast(`${removed.name} removed from cart`);
  }
}

// ========================================
// 7. ADD PRODUCT TO CART
// ========================================

function addProductToCart(name, price) {
  const cart = getCart();

  const quantityElement = document.getElementById("qty");

  const quantity = quantityElement
    ? Math.max(1, Number(quantityElement.textContent) || 1)
    : 1;

  const selectedSize =
    document.querySelector(".size-btn.active")?.textContent || "42";

  const existingProduct = cart.find(
    (item) => item.name === name && item.size === selectedSize,
  );

  if (existingProduct) {
    existingProduct.qty += quantity;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: quantity,
      size: selectedSize,
    });
  }

  saveCart(cart);
  showToast(`${name} added to cart!`);
}

// ========================================
// 8. FAVOURITES
// ========================================

function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveFavourites(ids) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
  } catch (error) {
    // Storage unavailable
  }

  updateFavCount();
}

function isFavourite(id) {
  return getFavourites().includes(id);
}

function updateFavCount() {
  const total = getFavourites().length;

  document.querySelectorAll(".fav-count").forEach((element) => {
    element.textContent = total;
  });
}

function toggleFavourite(button, id) {
  let favourites = getFavourites();
  const wasFavourite = favourites.includes(id);

  if (wasFavourite) {
    favourites = favourites.filter((favId) => favId !== id);
  } else {
    favourites.push(id);
  }

  saveFavourites(favourites);

  button.textContent = wasFavourite ? "♡" : "♥";

  showToast(wasFavourite ? "Removed from favourites" : "Added to favourites");

  // If we are on the favourites page, refresh the list
  if (document.getElementById("favGrid")) {
    renderFavourites();
  }
}

function renderFavourites() {
  const favGrid = document.getElementById("favGrid");

  if (!favGrid) return;

  const favouriteIds = getFavourites();

  const favouriteProducts = products.filter((product) =>
    favouriteIds.includes(product.id),
  );

  if (favouriteProducts.length === 0) {
    favGrid.innerHTML = `
      <div class="empty">
        You have no favourites yet.
        <a href="sneakers.html" style="color: var(--orange)">Browse sneakers</a>
      </div>
    `;
  } else {
    favGrid.innerHTML = favouriteProducts.map(productCardHTML).join("");
  }

  const favCount = document.getElementById("favCount");

  if (favCount) {
    favCount.textContent = `${favouriteProducts.length} saved`;
  }
}

// ========================================
// 9. PRODUCT CARD (used by sneakers + favourites)
// ========================================

function productCardHTML(product) {
  const heartIcon = isFavourite(product.id) ? "♥" : "♡";

  return `
    <article class="card product-card">

      <span class="tag">${product.tag}</span>

      <button
        class="heart"
        type="button"
        aria-label="Add to favourites"
        onclick="toggleFavourite(this, ${product.id})"
      >
        ${heartIcon}
      </button>

      <a href="product.html?id=${product.id}">

        <div class="product-visual">
          <img
            class="product-photo"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.onerror=null; this.src='images/shoe-placeholder.svg';"
          />
        </div>

        <div class="product-info">

          <div class="muted mono" style="font-size:11px">
            ${product.type.toUpperCase()} SHOES
          </div>

          <h3>${product.name}</h3>

          <div class="muted">
            ★★★★★
          </div>

          <div class="price">
            Rs. ${product.price.toLocaleString("en-PK")}
          </div>

        </div>

      </a>
      <div class="product-card-action">

      <button
        class="btn"
        type="button"
        onclick="addProductToCart('${product.name}', ${product.price})"
      >
        Add to cart
      </button>
      </div>

    </article>
  `;
}

// ========================================
// 10. SEARCH, FILTER AND SORT PRODUCTS
// ========================================

function filterProducts() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  const query = searchInput.value.toLowerCase();
  const type = document.getElementById("typeFilter")?.value || "";
  const priceRange = document.getElementById("priceFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "featured";
  const pageFilter = searchInput.dataset.filter || "";

  let filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesType = !type || product.type === type;
    const matchesPage = !pageFilter || product.filter === pageFilter;

    return matchesName && matchesType && matchesPage;
  });

  const [minimum, maximum] = priceRange
    ? priceRange.split("-").map(Number)
    : [0, Infinity];

  filteredProducts = filteredProducts.filter((product) => {
    return product.price >= minimum && product.price <= maximum;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  filteredProducts = filteredProducts.slice(0, MAX_PRODUCTS);

  displayProducts(filteredProducts);
}

// ========================================
// 11. DISPLAY PRODUCT CARDS (sneakers page)
// ========================================

function displayProducts(productList) {
  const shopGrid = document.getElementById("shopGrid");

  if (!shopGrid) return;

  if (productList.length === 0) {
    shopGrid.innerHTML = `
      <div class="empty">
        No sneakers found. Try another search.
      </div>
    `;
  } else {
    shopGrid.innerHTML = productList.map(productCardHTML).join("");
  }

  const resultCount = document.getElementById("resultCount");

  if (resultCount) {
    resultCount.textContent = `${productList.length} pairs found`;
  }
}

// ========================================
// 12. PRODUCT DETAIL PAGE (product.html?id=3)
// ========================================

function getGallery(product) {
  return [product.image, ...(product.gallery || [])];
}

function changeMainImage(source) {
  const mainImage = document.getElementById("detailImage");

  if (mainImage) {
    mainImage.src = source;
  }
}

function renderProductDetail() {
  const detailTitle = document.getElementById("detailTitle");

  // Not the product page
  if (!detailTitle) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id")) || 1;

  const product = products.find((item) => item.id === productId) || products[0];

  document.title = `${product.name} | SOLEVERSE`;

  document.getElementById("detailCrumb").textContent =
    `SNEAKERS / ${product.type} / ${product.name}`.toUpperCase();

  detailTitle.textContent = `${product.name} ${product.type} Sneaker`;

  document.getElementById("detailPrice").innerHTML = `
    Rs. ${product.price.toLocaleString("en-PK")}
    <span style="font-size:16px; color:var(--muted); text-decoration:line-through; margin-left:10px;">
      Rs. ${(product.price + 1500).toLocaleString("en-PK")}
    </span>
  `;

  document.getElementById("detailDesc").textContent =
    `The ${product.name} is built for ${product.type.toLowerCase()} days: a breathable upper, a cushioned midsole and a padded collar that locks your heel in without pressure. It performs well and still looks right on the street.`;

  // Main image
  const mainImage = document.getElementById("detailImage");
  mainImage.src = product.image;
  mainImage.alt = product.name;

  // Thumbnails (a thumbnail whose file does not exist is hidden)
  const thumbs = document.getElementById("detailThumbs");

  thumbs.innerHTML = getGallery(product)
    .map((source, index) => {
      return `
        <button
          class="thumb"
          type="button"
          aria-label="View image ${index + 1}"
          onclick="changeMainImage('${source}')"
        >
          <img
            src="${source}"
            alt="${product.name} view ${index + 1}"
            onerror="this.closest('.thumb').style.display='none';"
          />
        </button>
      `;
    })
    .join("");

  // Add to cart button uses this product's name and price
  const addButton = document.getElementById("detailAddBtn");

  addButton.onclick = function () {
    addProductToCart(product.name, product.price);
  };

  // Heart / favourite button
  const favButton = document.getElementById("detailFavBtn");

  if (favButton) {
    favButton.textContent = isFavourite(product.id)
      ? "♥ Saved to favourites"
      : "♡ Add to favourites";

    favButton.onclick = function () {
      let favourites = getFavourites();
      const wasFavourite = favourites.includes(product.id);

      favourites = wasFavourite
        ? favourites.filter((favId) => favId !== product.id)
        : [...favourites, product.id];

      saveFavourites(favourites);

      favButton.textContent = wasFavourite
        ? "♡ Add to favourites"
        : "♥ Saved to favourites";

      showToast(
        wasFavourite ? "Removed from favourites" : "Added to favourites",
      );
    };
  }
}

// ========================================
// 13. PRODUCT QUANTITY
// ========================================

function changeQty(amount) {
  const quantityElement = document.getElementById("qty");

  if (!quantityElement) return;

  let quantity = Number(quantityElement.textContent);

  quantity += amount;

  if (quantity < 1) {
    quantity = 1;
  }

  quantityElement.textContent = quantity;
}

// ========================================
// 14. CONTACT FORM
// ========================================

function sendContact(event) {
  event.preventDefault();

  const message = document.getElementById("contactMessage");

  if (message) {
    message.textContent =
      "Thank you! Your message has been submitted successfully.";
  }

  event.target.reset();
}

// ========================================
// 15. CHECKOUT SUMMARY (with remove icon)
// ========================================

function renderCheckout() {
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (!checkoutItems || !checkoutTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <p class="muted" style="padding:15px 0">
        Your cart is empty.
        <a href="sneakers.html">Shop sneakers</a>
      </p>
    `;

    checkoutTotal.textContent = "Rs. 0";

    return;
  }

  checkoutItems.innerHTML = cart
    .map((item, index) => {
      return `
        <div class="summary-row">

          <span>
            ${item.name} × ${item.qty}
            <br>
            <small class="muted">EU ${item.size}</small>
          </span>

          <span class="summary-right">
            Rs. ${(item.price * item.qty).toLocaleString("en-PK")}
            <button
              type="button"
              class="remove-btn"
              aria-label="Remove ${item.name}"
              title="Remove item"
              onclick="removeFromCart(${index})"
            >✕</button>
          </span>

        </div>
      `;
    })
    .join("");

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  checkoutTotal.textContent = "Rs. " + total.toLocaleString("en-PK");
}

// ========================================
// 16. PLACE ORDER
// ========================================

function placeOrder(event) {
  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    showToast("Your cart is empty. Please add a product first.", "error");
    return;
  }

  localStorage.removeItem(CART_KEY);

  updateCartCount();
  renderCheckout();

  event.target.reset();

  showThankYouPopup();
}

// ========================================
// 17. PAGE INITIALIZATION
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  } catch (error) {
    // Default theme remains dark.
  }

  applyTheme(savedTheme);

  updateCartCount();
  updateFavCount();

  // Sneakers / New Arrivals / Sale page
  const shopGrid = document.getElementById("shopGrid");

  if (shopGrid) {
    const params = new URLSearchParams(window.location.search);

    const selectedType = params.get("type");
    const selectedFilter = params.get("filter");

    if (selectedType) {
      document.getElementById("typeFilter").value = selectedType;
    }

    if (selectedFilter) {
      const title = document.getElementById("shopTitle");
      const blurb = document.getElementById("shopBlurb");

      if (selectedFilter === "new") {
        title.textContent = "New Arrivals";
        blurb.textContent = "Discover the latest sneakers at SOLEVERSE.";
      }

      if (selectedFilter === "sale") {
        title.textContent = "Sale Collection";
        blurb.textContent =
          "Explore your favourite sneakers at special prices.";
      }

      document.getElementById("searchInput").dataset.filter = selectedFilter;
    }

    filterProducts();
  }

  // Product detail page
  renderProductDetail();

  // Favourites page
  renderFavourites();

  // Size selection
  document.querySelectorAll(".size-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".size-btn").forEach((item) => {
        item.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  // Checkout page
  renderCheckout();
});

const urlParams = new URLSearchParams(window.location.search);
const urlFilterValue = urlParams.get("filter");

if (urlFilterValue === "new") {
  document.querySelector("#pill-new").classList.add("active");
} else if (urlFilterValue === "sale") {
  document.querySelector("#pill-sale").classList.add("active");
} else {
  document.querySelector("#pill-all").classList.add("active");
}

// 
