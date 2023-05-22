import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
})

export default CartContext
