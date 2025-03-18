
import React, { FC, useContext, useEffect, useState } from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {Cart, CartItem, Item, Option} from "../api-client/data-classes";
import CartItemCompontent from "./CartItemComponent";
import {calculateTotalCostInCart} from "../api-client/calculation-utils";

export interface CartProps {
    cartItems: CartItem[],
    items: Item[] | undefined,
    onAddToCart: (cartItem: CartItem) => void
    onRemoveFromCart: (itemVersionPrefixId:string) => void
    onCheckout: (cart: Cart) => void
}

const CartCompontent: FC<CartProps> = props => {

    const [displayedCartItems, setDisplayedCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const summarisedItems: CartItem[] = [];

        props.cartItems.forEach(cartItem => {
            const existingItem = summarisedItems.find(
                item => item.itemId === cartItem.itemId &&
                    item.itemVersionPrefixId === cartItem.itemVersionPrefixId
            );

            if (existingItem) {
                existingItem.cartQuantity += cartItem.cartQuantity;
            } else {
                summarisedItems.push({ ...cartItem });
            }
        });

        console.log(summarisedItems)

        setDisplayedCartItems(summarisedItems);
    }, [props.cartItems]);

    return (
       <Grid2 sx={{border: "1px solid grey", padding: "2px"}}>
            <Typography>Cart</Typography>

            <Grid2 container direction={"column"} spacing={1}>
                {displayedCartItems?.map((cartItem: CartItem, key  ) => {
                    return (
                        <CartItemCompontent
                            cartItem={cartItem}
                            itemStorage={props.items?.find(item => item.id === cartItem.itemId)?.options.find(option => option.itemVersionPrefixId === cartItem.itemVersionPrefixId)?.quantity!!}
                            key={key}
                            onAddOne={() => props.onAddToCart(
                                {...cartItem, cartQuantity: 1}
                            )}
                            onRemoveOne={() => props.onRemoveFromCart(
                                cartItem.itemVersionPrefixId
                            )}
                        />
                    )
                })}
            </Grid2>

           <Typography textAlign={"left"} variant={"h6"}>Total cost: {calculateTotalCostInCart(displayedCartItems)} sek</Typography>

           <Button
               size="small"
                onClick={() => props.onCheckout({
                     items: props.cartItems,
                     totalCost: calculateTotalCostInCart(props.cartItems)
                    })}
           >Checkout</Button>

       </Grid2>
    )
}

export default CartCompontent
