# SoleVerse

SoleVerse is a responsive e-commerce web platform designed for browsing, searching, and managing footwear products.

Live Demo: https://the-soleverse.vercel.app

## Features and Functionality

### Dynamic Product Details
* URL query parameter lookup (`product.html?id=...`) to dynamically load and render corresponding sneaker data from the product array.

### Search, Filter, and Sort
* **Search:** Real-time search query filtering across the sneaker collection.
* **Category Filtering:** Filter items by category (Running, Casual, Sport).
* **Price Tier Filtering:** 
  * Under 11k
  * 11k to 14k
  * Over 14k
* **Sorting Options:** Sort products by price (low to high, high to low) and alphabetically (A-Z).

### User Interaction & Cart
* **Dark / Light Theme Toggle:** Switch interface appearance dynamically across the application.
* **Favorites System:** Toggle items to save to a dedicated favorites list.
* **Cart & Checkout:** Add products to the shopping cart with live state counters.

### Hero & Layout
* Hero section featuring animated elements, dynamic taglines, and marquee promotional banners.
* Responsive navigation header, trending products section, category cards, and contact page setup.

## Pages Included
* `index.html` - Main landing page with hero banner, trending items, and category shortcuts.
* `sneakers.html` - Full product catalog with active search, filter, and sort controls.
* `product.html` - Dynamic single-product view populated via query parameters.
* `favorites.html` - Saved favorite sneakers overview.
* `checkout.html` - Cart summary and checkout interface.
* `contact.html` - User support and inquiry form.
