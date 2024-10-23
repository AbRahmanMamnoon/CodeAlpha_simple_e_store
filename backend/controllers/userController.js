import Cart from '../models/cartModel.js';

// User Cart
const userCart = async (req, res) => {
  try {
    const newCart = await new Cart(req.body).save();
    res.status(201).json({ message: 'New cart added successfully', newCart });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
};

export default userCart;
