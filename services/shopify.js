const axios = require('axios');
require('dotenv').config();

const storefrontAPI = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    'Content-Type': 'application/json'
  }
});

async function getCart(cartId) {
  const query = `
    query ($cartId: ID!) {
      cart(id: $cartId) {
        id
        cost {
          subtotalAmount {
            amount
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await storefrontAPI.post('', {
    query,
    variables: { cartId }
  });

  return res.data.data.cart;
}

async function addGiftToCart(cartId, variantId) {
  const mutation = `
    mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return await storefrontAPI.post('', {
    query: mutation,
    variables: {
      cartId,
      lines: [{ quantity: 1, merchandiseId: variantId }]
    }
  });
}

async function removeGiftFromCart(cartId, lineId) {
  const mutation = `
    mutation ($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return await storefrontAPI.post('', {
    query: mutation,
    variables: {
      cartId,
      lineIds: [lineId]
    }
  });
}

module.exports = {
  getCart,
  addGiftToCart,
  removeGiftFromCart
};
