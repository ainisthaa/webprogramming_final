# MiniShop Dashboard

Final practical exam project for Web Programming (semester 1/2569).
A small online shop + product dashboard built with React, Vite and Tailwind CSS.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## How to run

```bash
npm install
npm run dev       # start dev server (http://localhost:5173)
npm run build     # build for production
npm run preview   # preview the production build
npm run lint      # check code with oxlint
```

## Pages

| Path | Page |
| --- | --- |
| `/` | Home: banner, featured products, categories |
| `/products` | Product dashboard: summary, search, category filter, add product, delete |
| `/products/:id` | Product detail: rating, quantity, add to cart, buy now |
| `/cart` | Shopping cart: change quantity, remove item, order summary, demo checkout |
| `/login` | Sign in / sign up (mock) |
| `/profile` | Edit profile and see order history (needs login) |
| `/admin` | Admin dashboard: stats, sales chart, recent orders, top products |
| `/admin/products`, `/admin/orders`, `/admin/users`, `/admin/categories`, `/admin/settings` | Admin pages |
| `/about` | About the project |

Demo account: `john@example.com` / `demo1234` (or click "Continue with demo account").

## Data

- Products are loaded from `https://fakestoreapi.com/products` with `fetch` + `async/await`
  inside `useEffect` (see `src/context/ProductProvider.jsx`).
- The 5 mock products from the exam (`src/data/mockProducts.js`) are always in the list,
  so the categories Accessories, Display and Camera are available.
- If the API fails, the page shows an error message with a "Retry API" button and the app
  keeps working with the mock products.
- The API has no stock field, so API products get a simulated stock:
  `0` if `id % 7 === 0`, otherwise `(id * 13) % 20 + 1`.
- Added products, deleted products, cart, users, orders and the login session are saved in
  localStorage. Admin > Settings has a button to reset all demo data.
- Orders, revenue, users and the sales chart are demo data. There is no real backend or payment.

## Folder structure

```text
src/
  components/   shared UI (Header, Footer, ProductCard, ProductForm, StatCard, ...)
  context/      React Context for products, cart and users
  data/         mock products and demo data
  pages/        page components (admin pages in pages/admin)
  utils/        helper functions
```

## Submission

Zip the `finalWeb0815` folder without `node_modules` and `dist`, then run
`npm install` and `npm run dev` in `minishop-dashboard` to test.
