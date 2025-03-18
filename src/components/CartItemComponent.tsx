import React, {FC, useContext, useEffect, useState} from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {CartItem} from "../api-client/data-classes";

export interface CartItemProps {
    cartItem: CartItem,
    onAddOne: () => void,
    onRemoveOne: () => void
}

const CartItemCompontent: FC<CartItemProps> = props => {

    return (
        <Grid2 container justifyContent={"left"} direction={"row"}>

            <Grid2>
                <Typography>{props.cartItem.cartQuantity}x</Typography>
            </Grid2>

            <Grid2  container justifyContent={"left"} direction={"column"} sx={{marginLeft:2}}>
                <Grid2 container direction={"row"} spacing={2}>
                    <Typography variant={"overline"} textAlign={"left"}>{props.cartItem.name}</Typography>
                </Grid2>

                <Grid2 container direction={"row"} spacing={2}>
                    <Grid2 container direction={"row"} spacing={2}>
                        <Typography>Cost: {props.cartItem.price} sek</Typography>
                    </Grid2>
                    <Grid2 container direction={"row"} spacing={2}>
                        <Typography>Variant:</Typography>

                        <Grid2 container direction={"column"} spacing={0}>
                            {props.cartItem.option.color !== undefined
                                ?
                                <Typography textAlign={"left"} variant={"caption"}>Color - {props.cartItem.option.color.toString()}</Typography>
                                :
                                null
                            }
                            {props.cartItem.option.power !== undefined
                                ?
                                <Typography textAlign={"left"} variant={"caption"}>Power - {props.cartItem.option.power.toString()}</Typography>
                                :
                                null
                            }
                            {props.cartItem.option.storage !== undefined
                                ?
                                <Typography textAlign={"left"} variant={"caption"}>Storage - {props.cartItem.option.storage.toString()}</Typography>
                                :
                                null
                            }
                        </Grid2>


                    </Grid2>

                </Grid2>
            </Grid2>

            <Grid2 container direction={"row"} spacing={2}>
                <Button
                    onClick={() => props.onAddOne()}
                    size="small"
                >Add one
                </Button>
                <Button
                    size="small"
                    onClick={() => props.onRemoveOne()}
                >Remove one
                </Button>
            </Grid2>

        </Grid2>
    )
}

export default CartItemCompontent
