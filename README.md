# 🎁 Shopify Free Gift Logic – Node.js Backend

This backend service automatically adds or removes a **Free Gift product** in the Shopify cart based on the cart subtotal using Shopify Storefront GraphQL API.

---

## 🔧 Features & Logic

- 🎯 If cart subtotal is **$150 or more**, a **gift product** (predefined variant) is **added** automatically.
- 🔁 If subtotal **drops below $150**, the gift is **removed**.
- ❌ Prevents **duplicate gift items** in cart.
- ✅ Fully API-based — works with any Shopify frontend.
- 🔐 Uses Shopify Storefront API (GraphQL) for cart interaction.

---

## ⚙️ Tech Stack

- **Node.js** + **Express** – REST API backend
- **Axios** – Shopify API requests
- **GraphQL** – Shopify Storefront API
- **Dotenv** – Environment configuration
- **Postman** – For local testing

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/shopify-free-gift.git
cd shopify-free-gift
Setup .env File
Add a .env file in the root with your own Shopify store/test credentials:

env
Copy
Edit
SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
SHOPIFY_API_VERSION=2024-01
SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_token
GIFT_VARIANT_ID=gid://shopify/ProductVariant/12345678901234
📌 How to Get These Values:
Key	How to Get
SHOPIFY_STORE_DOMAIN	Your store URL (from Shopify Admin)
SHOPIFY_STOREFRONT_API_TOKEN	Create via: Admin → Apps → Develop Apps → Storefront API access
GIFT_VARIANT_ID	Go to Admin → Products → click gift product → use this format:
gid://shopify/ProductVariant/VARIANT_ID_FROM_URL

🧪 API Testing with Postman
✅ Endpoint
bash
Copy
Edit
POST http://localhost:3000/api/update-gift
🔸 Request Body (JSON)
json
Copy
Edit
{
  "cartId": "gid://shopify/Cart/abcdef123456"
}
You can obtain cartId from your Shopify storefront by:

Calling cartCreate or cartQuery via GraphQL

Or checking browser dev tools during cart load

✅ Example Response
json
Copy
Edit
{
  "message": "Gift added"
}
or

json
Copy
Edit
{
  "message": "Gift removed"
}
# Shopify-App
