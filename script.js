const MAX_PRODUCTS = 15;
const THEME_KEY = "soleverseTheme";

// HelpJet Widget Loader

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

// Add your own shoe photos in the images folder using these filenames.
// Example: images/shoe-01.jpg, images/shoe-02.jpg ... images/shoe-15.jpg
const products = [
  {
    id: 1,
    name: "Air Max Shadow",
    type: "Running",
    price: 12999,
    tag: "NEW",
    color: "#7565ff",
    filter: "new",
    image: "images/shoe-01.jpg",
  },
  {
    id: 2,
    name: "Velocity Pro",
    type: "Sport",
    price: 10499,
    tag: "SALE",
    color: "#8b93a7",
    filter: "sale",
    image: "images/shoe-02.jpg",
  },
  {
    id: 3,
    name: "Urban Pulse",
    type: "Casual",
    price: 14999,
    tag: "NEW",
    color: "#3fae6a",
    filter: "new",
    image: "images/shoe-03.jpg",
  },
  {
    id: 4,
    name: "Phantom X",
    type: "Sport",
    price: 16999,
    tag: "HOT",
    color: "#4f7cff",
    filter: "",
    image: "images/shoe-04.jpg",
  },
  {
    id: 5,
    name: "Nike Revolution",
    type: "Running",
    price: 11999,
    tag: "NEW",
    color: "#c9c9bd",
    filter: "new",
    image: "images/shoe-05.jpg",
  },
  {
    id: 6,
    name: "Adidas Boost",
    type: "Running",
    price: 13499,
    tag: "NEW",
    color: "#ff7a59",
    filter: "new",
    image: "images/shoe-06.jpg",
  },
  {
    id: 7,
    name: "Puma Velocity",
    type: "Sport",
    price: 12799,
    tag: "SALE",
    color: "#7d8aa0",
    filter: "sale",
    image: "images/shoe-07.jpg",
  },
  {
    id: 8,
    name: "Street Flex",
    type: "Casual",
    price: 9999,
    tag: "HOT",
    color: "#d07b45",
    filter: "",
    image: "images/shoe-08.jpg",
  },
  {
    id: 9,
    name: "Cloud Runner",
    type: "Running",
    price: 13999,
    tag: "NEW",
    color: "#62a6cb",
    filter: "new",
    image: "images/shoe-09.jpg",
  },
  {
    id: 10,
    name: "Retro Court",
    type: "Casual",
    price: 11499,
    tag: "SALE",
    color: "#d4a574",
    filter: "sale",
    image: "images/shoe-10.jpg",
  },
  {
    id: 11,
    name: "Sprint Edge",
    type: "Sport",
    price: 15499,
    tag: "HOT",
    color: "#e66a5e",
    filter: "",
    image: "images/shoe-11.jpg",
  },
  {
    id: 12,
    name: "Urban Classic",
    type: "Casual",
    price: 10999,
    tag: "NEW",
    color: "#83917b",
    filter: "new",
    image: "images/shoe-12.jpg",
  },
  {
    id: 13,
    name: "Aero Flex",
    type: "Running",
    price: 17999,
    tag: "NEW",
    color: "#9a8bd1",
    filter: "new",
    image: "images/shoe-13.jpg",
  },
  {
    id: 14,
    name: "Court Vision",
    type: "Sport",
    price: 12499,
    tag: "SALE",
    color: "#b9784d",
    filter: "sale",
    image: "images/shoe-14.jpg",
  },
  {
    id: 15,
    name: "Metro Knit",
    type: "Casual",
    price: 14499,
    tag: "HOT",
    color: "#6f9a9a",
    filter: "",
    image: "images/shoe-15.jpg",
  },
];

function applyTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = selectedTheme;

  const themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    const nextTheme = selectedTheme === "dark" ? "light" : "dark";
    themeButton.innerHTML =
      selectedTheme === "dark"
        ? '<span class="theme-toggle-icon">☀</span><span class="theme-toggle-text">Light</span>'
        : '<span class="theme-toggle-icon">☾</span><span class="theme-toggle-text">Dark</span>';
    themeButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeButton.title = `Switch to ${nextTheme} mode`;
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || "dark";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (error) {
    // The theme still changes for this page even if browser storage is unavailable.
  }
  applyTheme(nextTheme);
}

function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("show");
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("soleverseCart") || "[]");
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("soleverseCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = getCart().reduce((total, item) => total + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

function addProductToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({
      name,
      price,
      qty: 1,
      size: document.querySelector(".size-btn.active")?.textContent || "42",
    });
  }
  saveCart(cart);
  alert(name + " added to cart!");
}

function filterProducts() {
  const query = (
    document.getElementById("searchInput")?.value || ""
  ).toLowerCase();
  const type = document.getElementById("typeFilter")?.value || "";
  const priceRange = document.getElementById("priceFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "featured";
  const pageFilter =
    document.getElementById("searchInput")?.dataset.filter || "";

  let list = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) &&
      (!type || product.type === type) &&
      (!pageFilter || product.filter === pageFilter),
  );

  const [minimum, maximum] = priceRange
    ? priceRange.split("-").map(Number)
    : [0, Infinity];
  list = list.filter(
    (product) => product.price >= minimum && product.price <= maximum,
  );

  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  // Hard limit: never render more than 15 product cards.
  list = list.slice(0, MAX_PRODUCTS);

  const grid = document.getElementById("shopGrid");
  if (!grid) return;

  grid.innerHTML = list.length
    ? list
        .map(
          (product) => `
      <article class="card product-card">
        <span class="tag">${product.tag}</span>
        <button class="heart" type="button" aria-label="Add ${product.name} to favourites" onclick="this.textContent=this.textContent==='♡'?'♥':'♡'">♡</button>
        <a href="product.html">
          <div class="product-visual">
            <img class="product-photo" src="${product.image}" alt="${product.name} sneaker" loading="lazy" onerror="this.onerror=null;this.src='images/shoe-placeholder.svg'">
          </div>
          <div class="product-info">
            <div class="muted mono product-type">${product.type.toUpperCase()} SHOES</div>
            <h3>${product.name}</h3>
            <div class="muted">★★★★★</div>
            <div class="price">Rs. ${product.price.toLocaleString("en-PK")}</div>
          </div>
        </a>
        <div class="product-card-action"><button class="btn" type="button" onclick="addProductToCart('${product.name}',${product.price})">Add to cart</button></div>
      </article>
    `,
        )
        .join("")
    : '<div class="empty">No pairs match. Try a different search or filter.</div>';

  const resultCount = document.getElementById("resultCount");
  if (resultCount) resultCount.textContent = list.length + " pairs found";
}

function changeQty(amount) {
  const quantityElement = document.getElementById("qty");
  if (quantityElement) {
    quantityElement.textContent = Math.max(
      1,
      Number(quantityElement.textContent) + amount,
    );
  }
}

function sendContact(event) {
  event.preventDefault();
  const message = document.getElementById("contactMessage");
  if (message)
    message.textContent =
      "Thanks! Your message is ready. We will contact you soon.";
  event.target.reset();
}

function renderCheckout() {
  const itemsBox = document.getElementById("checkoutItems");
  if (!itemsBox) return;

  const cart = getCart();
  itemsBox.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
      <div class="summary-row">
        <span>${item.name} × ${item.qty}<br><small class="muted">EU ${item.size || 42}</small></span>
        <span>Rs. ${(item.price * item.qty).toLocaleString("en-PK")}</span>
      </div>
    `,
        )
        .join("")
    : '<p class="muted" style="padding:18px 0">Your cart is empty. <a href="sneakers.html" style="color:var(--orange)">Shop sneakers</a></p>';

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalElement = document.getElementById("checkoutTotal");
  if (totalElement)
    totalElement.textContent = "Rs. " + total.toLocaleString("en-PK");
}

function placeOrder(event) {
  event.preventDefault();
  if (!getCart().length) {
    alert("Your cart is empty. Please add a sneaker first.");
    return;
  }
  alert("Thank you! Your order has been placed.");
  localStorage.removeItem("soleverseCart");
  updateCartCount();
  renderCheckout();
  event.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  } catch (error) {
    // Use the default dark theme when browser storage is unavailable.
  }
  applyTheme(savedTheme);
  updateCartCount();

  if (document.getElementById("shopGrid")) {
    const params = new URLSearchParams(location.search);
    if (params.get("type")) {
      document.getElementById("typeFilter").value = params.get("type");
    }
    if (params.get("filter")) {
      const filter = params.get("filter");
      const title = filter === "new" ? "New Arrivals" : "Sale";
      document.getElementById("shopTitle").textContent = title;
      document.getElementById("shopBlurb").textContent =
        "Explore " + title.toLowerCase() + " at SOLEVERSE.";
      document.getElementById("searchInput").dataset.filter = filter;
    }
    filterProducts();
  }

  document.querySelectorAll(".size-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".size-btn")
        .forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  renderCheckout();
});
