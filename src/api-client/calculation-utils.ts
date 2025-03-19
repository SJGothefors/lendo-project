import {CartItem} from "./data-classes";

export const calculateTotalCostInCart = (cartItems: CartItem[]): number => {
return cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.cartQuantity), 0);
}

export const calculateTotalWeightInCart = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.weight * cartItem.cartQuantity), 0);
}
