
import React, { FC, useContext, useEffect, useState } from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {Order} from "../api-client/data-classes";

export interface ConfirmationProps {
    order: Order,
    onClose: () => void
}

const ConfirmationComponent: FC<ConfirmationProps> = props => {

    return (
        <Grid2 container direction={"column"} size={12} spacing={2} alignContent={"center"}>

            <Grid2>
                <Typography>Thanks for your order</Typography>
                <Typography variant={"caption"}>Order number: {props.order.id}</Typography>
            </Grid2>

            <Grid2>
                <Typography variant={"h6"}>Order details</Typography>
            </Grid2>

            <Grid2>
                {
                    props.order.cart.items.map((item, key) => {
                        return (
                            <Grid2 container justifyContent={"left"} direction={"row"} key={key}>
                                <Grid2>
                                    <Typography>{item.cartQuantity}x</Typography>
                                </Grid2>

                                <Grid2  container justifyContent={"left"} direction={"column"} sx={{marginLeft:2}}>
                                    <Grid2 container direction={"row"} spacing={2}>
                                        <Typography variant={"overline"} textAlign={"left"}>{item.name}</Typography>
                                    </Grid2>

                                    <Grid2 container direction={"row"} spacing={2}>
                                        <Grid2 container direction={"row"} spacing={2}>
                                            <Typography>Cost: {item.price} sek</Typography>
                                        </Grid2>
                                        <Grid2 container direction={"row"} spacing={2}>
                                            <Typography>Variant:</Typography>

                                            <Grid2 container direction={"column"} spacing={0}>
                                                {item.option.color !== undefined
                                                    ?
                                                    <Typography textAlign={"left"} variant={"caption"}>Color - {item.option.color.toString()}</Typography>
                                                    :
                                                    null
                                                }
                                                {item.option.power !== undefined
                                                    ?
                                                    <Typography textAlign={"left"} variant={"caption"}>Power - {item.option.power.toString()}</Typography>
                                                    :
                                                    null
                                                }
                                                {item.option.storage !== undefined
                                                    ?
                                                    <Typography textAlign={"left"} variant={"caption"}>Storage - {item.option.storage.toString()}</Typography>
                                                    :
                                                    null
                                                }
                                            </Grid2>


                                        </Grid2>

                                    </Grid2>
                                </Grid2>

                            </Grid2>
                        )
                    })
                }
            </Grid2>

            <Grid2>
                <Typography>Cost: {props.order.cart.totalCost} sek</Typography>
            </Grid2>

            <Grid2 container direction={"column"}>
                <Typography variant={"h6"}>Delivery info</Typography>
                <Typography variant={"overline"}>Name: {props.order.deliveryDetails.name}</Typography>
                <Typography variant={"overline"}>Address: {props.order.deliveryDetails.address}</Typography>
                <Typography variant={"overline"}>Phone: {props.order.deliveryDetails.phone}</Typography>
                <Typography variant={"overline"}>Email: {props.order.deliveryDetails.email}</Typography>
            </Grid2>

            <Grid2>
                <Button
                    onClick={() => props.onClose()}
                    size="small"
                >Back to start page
                </Button>
            </Grid2>


       </Grid2>
    )
}

export default ConfirmationComponent
