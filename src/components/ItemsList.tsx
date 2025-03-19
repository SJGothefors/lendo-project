import React, {FC} from "react";
import {Grid2, Typography} from "@mui/material";
import {CartItem, Item} from "../api-client/data-classes";
import ItemCard from "./ItemCard";


export interface ItemsListProps {
    items: Item[] | undefined,
    onAddToCart: (cartItem: CartItem) => void
}

const ItemsList: FC<ItemsListProps> = props => {

    return (
        <Grid2>
            <Typography>Items</Typography>

            <Grid2 container direction={"column"} spacing={1}>
                {props.items?.map((item: Item) => {
                        return (
                            <Grid2 key={item.id}>
                                <ItemCard
                                    item={item}
                                    onAddToCart={props.onAddToCart}
                                />
                            </Grid2>
                        )
                    }
                )}
            </Grid2>

        </Grid2>
    )
}

export default ItemsList
