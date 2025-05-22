const express = require('express');
const dotenv = require('dotenv');
const cartRoutes = require('./routes/cart');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
