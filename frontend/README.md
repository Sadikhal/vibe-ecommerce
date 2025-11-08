# Mock E-Com Cart — Vibe Commerce Internship Assignment

A minimal, production-quality full-stack cart app that demonstrates core e-commerce flows:

* Product listing (fetched & seeded from Fake Store API → stored in MongoDB)
* Add/Remove/Update cart items (backend DB persistence per mock user)
* Debounced search (3+ letters) by product title (and optionally category)
* Checkout (mock receipt: total + timestamp; cart cleared after order)
* Clean Redux Toolkit state management with toast notifications

> Tech stack: **React + Vite + Tailwind + Redux Toolkit**, **Node/Express**, **MongoDB**, **Axios**, **react-hot-toast**

---

## ✨ Screenshots

Create a folder: `docs/screenshots/` and drop your PNGs.
Use these exact filenames so the README shows them automatically:

* `docs/screenshots/home.png`
* `docs/screenshots/cart.png`
* `docs/screenshots/checkout.png`
* `docs/screenshots/accepted.png` (order receipt modal/page)

| Home                               | Cart                               |
| ---------------------------------- | ---------------------------------- |
| ![Home](docs/screenshots/home.png) | ![Cart](docs/screenshots/cart.png) |

| Checkout                                   | Accepted (Receipt)                         |
| ------------------------------------------ | ------------------------------------------ |
| ![Checkout](docs/screenshots/checkout.png) | ![Accepted](docs/screenshots/accepted.png) |

---

## 🧭 Project Structure

```
.
├── backend/
│   ├── controllers/
│   │   ├── product.controller.js
│   │   └── checkout.controller.js
│   ├── models/
│   │   ├── product.model.js
│   │   └── cart.model.js
│   ├── routes/
│   │   ├── product.route.js
│   │   ├── cart.route.js
│   │   └── checkout.route.js
│   ├── lib/
│   │   ├── db.js
│   │   ├── socket.js (if present)
│   │   └── createError.js
│   ├── middleware/
│   │   └── verifyTokens.js (if present)
│   ├── app.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ListingCard.jsx
    │   │   ├── sections/
    │   │   │   ├── CartItem.jsx
    │   │   │   └── PriceDetails.jsx
    │   │   └── ui/
    │   │       └── Loader.jsx
    │   ├── pages/
    │   │   └── Checkout.jsx
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── productSlice.js
    │   │   ├── cartSlice.js
    │   │   └── orderSlice.js
    │   ├── lib/
    │   │   └── apiRequest.js
    │   └── App.jsx / main.jsx / routes
    └── .env
```

---

## 🔌 Backend APIs

All routes are prefixed with `/api`.

### Products

* `GET /api/product` — returns all products

  * Filters:

    * `?search=<text>` (case-insensitive title match; we seed once from FakeStore)
    * `?category=<text>` (optional; case-insensitive)
* First run: DB is empty → seeds 5–10 products from **Fake Store API** automatically.

### Cart

* `GET /api/cart` — returns `{ items, total }` for the **mock user**
* `POST /api/cart` — `{ productId, qty }` → adds to cart (or increments qty)
* `PUT /api/cart/:id` — `{ qty }` → updates quantity for a cart item
* `DELETE /api/cart/:id` — removes item

> Mock user header: the frontend sends `x-user-id: demoUser` so your cart persists per user without real auth.

### Checkout

* `POST /api/checkout` — `{ name, email }` → returns a mock receipt:

  ```json
  {
    "receipt": {
      "orderId": "VC-2025-0001",
      "customer": { "name": "John", "email": "john@example.com" },
      "items": [{ "product": "...", "qty": 1, "price": 299 }],
      "total": 299,
      "timestamp": "2025-11-08T09:30:00.000Z"
    }
  }
  ```
* On success, **cart is cleared** for that mock user.

---

## 🖥️ Frontend UX

* **Home**: product grid with “Add to Cart”
* **Cart**: items with qty +/−, remove, right-side price summary
* **Search**: top navbar input with **debounce (500ms)**; triggers only when **≥ 3 letters**; clearing input reloads **all** products
* **Checkout**: name + email form, price summary, receipt modal on success
* **Toasts**: add/remove/update cart + checkout success/error

---

## 🧠 State Management (Redux Toolkit)

* `productSlice`:

  * `fetchProducts({ search?, category? })` — loads products (from backend)
* `cartSlice`:

  * `fetchCart`, `addToCart({ productId, qty })`, `updateCartItem({ id, qty })`, `removeFromCart(id)`
  * Stores `items` as `{ id, productId, title, image, price, quantity }` and `total`
  * Shows toasts (success/error)
* `orderSlice`:

  * `placeOrder({ name, email })` — posts to `/checkout`, stores `receipt`, clears cart via re-fetch

---

## 🔧 Local Development — How to Run

### 1) Prerequisites

* Node.js 18+
* MongoDB (local or Atlas)
* Yarn or npm

### 2) Backend Setup

```bash
cd backend
cp .env.example .env
```

**.env**

```
PORT=3002
MONGO_URL=mongodb://localhost:27017/vibe_commerce
CLIENT_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5173
```

Install & run:

```bash
yarn
yarn dev
# or
npm install
npm run dev
```

You should see:

```
Connected to mongoDb!
Backend server is running!
```

> First `GET /api/product` will seed FakeStore products into MongoDB automatically.

### 3) Frontend Setup

```bash
cd ../frontend
cp .env.example .env
```

**.env**

```
VITE_BASE_URL=http://localhost:3002/api
VITE_DASHBOARD_URL=http://localhost:5173
```

Install & run:

```bash
yarn
yarn dev
# or
npm install
npm run dev
```

Open: **[http://localhost:5173](http://localhost:5173)**

> The axios instance adds `x-user-id: demoUser` on every request, so the cart is tied to one mock user.

---

## 🔍 Search Behavior (Navbar)

* Debounced by **500ms**
* Triggers only when **input has ≥ 3 characters**
* On clear / `< 3` characters ⇒ reload **all** products
* Results always shown on **Home ( / )**

## 📹 Demo Video

Add your Loom/YouTube (unlisted) link here:

* Demo (1–2 min): *<your link>*

---

## ✅ Notes & Decisions

* Only **real fields** used from backend: `title`, `price`, `image`, `description`, `category`, `qty`
* UI preserved exactly where requested; unnecessary UI fields removed (e.g., offer/size/deliveryDays)
* Clean separation: backend handles data, frontend handles UI + state
* No external hosting required; GitHub repo with clear setup

---
