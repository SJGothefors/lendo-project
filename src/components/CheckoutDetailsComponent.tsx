import React, {FC, useContext, useEffect, useState} from "react";
import {Button, Grid2, TextField, Typography} from "@mui/material";
import {DeliveryDetails} from "../api-client/data-classes";

export interface CheckoutDetailsComponentProps {
    onUpdateDeliveryDetails: (deliveryDetails: DeliveryDetails) => void
    deliveryDetails: DeliveryDetails
}

const CheckoutDetailsComponent: FC<CheckoutDetailsComponentProps> = props => {

    return (
        <Grid2 container direction={"column"}>
            <Typography>Delivery details</Typography>

            <Grid2 container direction={"column"} spacing={1}>

            <TextField
                id="outlined-controlled"
                label="Name"
                value={props.deliveryDetails.name}
                variant="standard"
                InputLabelProps={{
                    style: {color: 'white'}
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onUpdateDeliveryDetails({...props.deliveryDetails, name: event.target.value});
                }}
            />

            <TextField
                id="outlined-controlled"
                label="Address"
                value={props.deliveryDetails.address}
                variant="standard"
                InputLabelProps={{
                    style: {color: 'white'}
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onUpdateDeliveryDetails({...props.deliveryDetails, address: event.target.value});
                }}
            />

            <TextField
                id="outlined-controlled"
                label="Phone"
                value={props.deliveryDetails.phone}
                variant="standard"
                InputLabelProps={{
                    style: {color: 'white'}
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onUpdateDeliveryDetails({...props.deliveryDetails, phone: event.target.value});
                }}
            />

            <TextField
                id="outlined-controlled"
                label="Email"
                value={props.deliveryDetails.email}
                variant="standard"
                InputLabelProps={{
                    style: {color: 'white'}
                }}
                InputProps={{
                    style: {color: 'white'}
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onUpdateDeliveryDetails({...props.deliveryDetails, email: event.target.value});
                }}
            />
            </Grid2>

        </Grid2>
    )
}

export default CheckoutDetailsComponent
