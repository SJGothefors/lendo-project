import React, {FC, useEffect, useState} from "react";
import {Grid2, Typography} from "@mui/material";
import {Cart, CartItem, Item, Order} from "../api-client/data-classes";
import {getItems, postOrder} from "../api-client/client";
import ItemsList from "../components/ItemsList";
import CartCompontent from "../components/CartCompontent";
import Checkout from "../components/Checkout";
import {calculateTotalCostInCart} from "../api-client/calculation-utils";
import ConfirmationComponent from "../components/ConfirmationComponent";

const StartPage: FC = () => {

    const [refreshPage, setRefreshPage] = useState<number>(Date.now())
    const [refreshCart, setRefreshCart] = useState<number>(Date.now())

    const [itemsList, setItemsList] = useState<Item[] | undefined>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [cart, setCart] = useState<Cart | undefined>(undefined)

    const [cartViewOpen, setCartViewOpen] = useState(false)
    const [confirmationOrder, setConfirmationOrder] = useState<Order | undefined>(undefined)


    useEffect(() => {
        const timer = setTimeout(() => {
            const aborter = new AbortController()
            getItems(aborter.signal)
                .then((data: Item[]) => {
                    setItemsList(data)
                })
                .catch()
            return () => aborter.abort()
        }, 500)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage])

    useEffect(() => {
        setCart(
            {
                items: cartItems,
                totalCost: calculateTotalCostInCart(cartItems)
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCart])

    const onAddToCart = (cartItem: CartItem) => {
        setCartItems([...cartItems, cartItem]);

        setItemsList((prevItems) =>
            prevItems?.map((item) => {
                if (item.id === cartItem.itemId) {
                    // Decrease quantity in options
                    const updatedOptions = item.options.map((option) =>
                        option.itemVersionPrefixId === cartItem.itemVersionPrefixId
                            ? { ...option, quantity: Math.max(option.quantity - 1, 0) }
                            : option
                    );

                    // Check if all options have 0 quantity
                    const isAvailable = updatedOptions.some((option) => option.quantity > 0);

                    return { ...item, options: updatedOptions, available: isAvailable };
                }
                return item;
            })
        );
    };

    const onRemoveItemFromCart = (itemVersionPrefixId: string) => {
        setCartItems((prevCartItems) => {
            const indexToRemove = prevCartItems.findIndex(
                (item) => item.itemVersionPrefixId === itemVersionPrefixId
            );

            if (indexToRemove === -1) return prevCartItems; // No matching item found

            const itemToRemove = prevCartItems[indexToRemove];

            // Increase quantity back in itemsList
            setItemsList((prevItems) =>
                prevItems?.map((item) => {
                    if (item.id === itemToRemove.itemId) {
                        const updatedOptions = item.options.map((option) =>
                            option.itemVersionPrefixId === itemToRemove.itemVersionPrefixId
                                ? { ...option, quantity: option.quantity + 0.5 }
                                : option
                        );

                        return { ...item, options: updatedOptions, available: true };
                    }
                    return item;
                })
            );

            return prevCartItems.filter((_, index) => index !== indexToRemove);
        });
        setRefreshCart(Date.now());
    };

    const onConfirmOrder = (order: Order) => {
        const timer = setTimeout(() => {
            const aborter = new AbortController()
            postOrder(order, aborter.signal)
                .then((data: Order) => {
                    setConfirmationOrder(data)
                })
                .catch()
            return () => aborter.abort()
        }, 500)
        return () => clearTimeout(timer)
    }

    return (
        <Grid2 width={"70vw"}>
            {
                !cartViewOpen ?
                    confirmationOrder === undefined ?
                        <Grid2 container direction={"row"} size={12} spacing={2}>
                            <Grid2 size={6}>
                                <ItemsList
                                    items={itemsList}
                                    onAddToCart={(cartItem: CartItem) => onAddToCart(cartItem)}
                                />
                            </Grid2>
                            <Grid2 size={4}>
                                <CartCompontent
                                    cartItems={cartItems}
                                    items={itemsList}
                                    onAddToCart={(cartItem: CartItem) => onAddToCart(cartItem)}
                                    onRemoveFromCart={onRemoveItemFromCart}
                                    onCheckout={(cart: Cart) => {
                                        setCartViewOpen(true);
                                        setCart(cart);
                                    }}
                                />
                            </Grid2>

                        </Grid2>
                        :
                        null
                    :
                    <Checkout
                        cart={cart!!}
                        items={itemsList}
                        onAddToCart={(cartItem: CartItem) => {
                            onAddToCart(cartItem)
                            setRefreshCart(Date.now())
                        }}
                        onRemoveFromCart={onRemoveItemFromCart}
                        closeView={() => {
                            setCartViewOpen(false);
                        }}
                        onConfirmOrder={(order) => {
                            onConfirmOrder(order)
                            setCartViewOpen(false)
                            console.log("Order confirmed", order)
                        }}
                    />
            }

            {
                confirmationOrder !== undefined ?
                    <ConfirmationComponent
                        order={confirmationOrder}
                        onClose={() => {
                            setConfirmationOrder(undefined)
                            setCartItems([])
                            setRefreshCart(Date.now())
                            setRefreshPage(Date.now())
                            setCartViewOpen(false)
                        }}
                    />
                    :
                    null
            }

        </Grid2>
    )
}

export default StartPage

