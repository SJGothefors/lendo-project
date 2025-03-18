import React, {FC, useContext, useEffect, useState} from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {Cart, CartItem, DeliveryDetails, Order} from "../api-client/data-classes";
import CartItemCompontent from "./CartItemComponent";
import CheckoutDetailsComponent from "./CheckoutDetailsComponent";
import {calculateTotalCostInCart} from "../api-client/calculation-utils";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export interface CheckoutProps {
    cart: Cart,
    onAddToCart: (cartItem: CartItem) => void
    onRemoveFromCart: (itemVersionPrefixId:string) => void
    closeView: () => void
    onConfirmOrder: (order: Order) => void
}

const Checkout: FC<CheckoutProps> = props => {

    const [checkOutItems, setCheckOutItems] = useState<CartItem[]>()

    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({name: "", address: "", phone: "", email: ""})

    useEffect(() => {
        const summarisedItems: CartItem[] = [];

        props.cart.items.forEach(cartItem => {
            const existingItem = summarisedItems.find(
                item => item.itemId === cartItem.itemId &&
                    JSON.stringify(item.option) === JSON.stringify(cartItem.option)
            );

            if (existingItem) {
                existingItem.cartQuantity += cartItem.cartQuantity;
            } else {
                summarisedItems.push({ ...cartItem });
            }
        });

        setCheckOutItems(summarisedItems);
    }, [props.cart]);

    return (
        <Grid2 container direction={"column"} size={12} spacing={2} alignContent={"center"}>
            <Grid2>
                <Typography>Checkout</Typography>
            </Grid2>

            <Grid2 container direction={"column"} alignContent={"center"} spacing={2}>
                <Button
                    onClick={() => props.closeView()}
                    size="small"
                >
                    {"<-- Go back to products"}
                </Button>
            </Grid2>

            <Grid2>
                <Typography>Products in cart</Typography>
            </Grid2>

            <Grid2 container direction={"column"} size={4}>
                {checkOutItems?.map((item) => {
                    return (
                        <CartItemCompontent
                            cartItem={item}
                            onAddOne={() => {props.onAddToCart({...item, cartQuantity: 1})}}
                            onRemoveOne={() => {props.onRemoveFromCart(item.itemVersionPrefixId)}}
                        />
                    )
                })}
            </Grid2>

            <Grid2>
                <Typography>Total: {calculateTotalCostInCart(props.cart.items)} sek</Typography>
            </Grid2>

            <CheckoutDetailsComponent
                onUpdateDeliveryDetails={(deliveryDetails: DeliveryDetails) => setDeliveryDetails(deliveryDetails)}
                deliveryDetails={deliveryDetails}
            />

            <Grid2 container direction={"column"} alignContent={"center"} spacing={2}>
                <Button
                    disabled={checkOutItems?.length === 0 || deliveryDetails.name === "" || deliveryDetails.address === "" || deliveryDetails.phone === "" || deliveryDetails.email === ""}
                    onClick={() => props.onConfirmOrder({id: generateUniqueID(), cart: {items: checkOutItems!!, totalCost:calculateTotalCostInCart(props.cart.items)} , deliveryDetails: deliveryDetails})}
                    size="small"
                >
                    {"Order"}
                </Button>
            </Grid2>


        </Grid2>
    )
}

export default Checkout
