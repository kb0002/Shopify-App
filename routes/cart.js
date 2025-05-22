const express = require('express');
const router = express.Router();
const {
  getCart,
  addGiftToCart,
  removeGiftFromCart
} = require('../services/shopify');

const giftVariantId = process.env.GIFT_VARIANT_ID;

router.post('/update-gift', async (req, res) => {
  const { cartId } = req.body;

  try {
    const cart = await getCart(cartId);
    const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
    const giftLine = cart.lines.edges.find(
      (line) => line.node.merchandise.id === giftVariantId
    );

    if (subtotal >= 150 && !giftLine) {
      await addGiftToCart(cartId, giftVariantId);
      return res.json({ message: 'Gift added' });
    }

    if (subtotal < 150 && giftLine) {
      await removeGiftFromCart(cartId, giftLine.node.id);
      return res.json({ message: 'Gift removed' });
    }

    res.json({ message: 'No change needed' });

  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
