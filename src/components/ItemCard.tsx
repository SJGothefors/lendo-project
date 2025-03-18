import React, {FC, useContext, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Grid2,
    List,
    ListItem,
    Radio,
    Typography
} from "@mui/material";
import {CartItem, Item, Option} from "../api-client/data-classes";

export interface ItemCardProps {
    item: Item,
    onAddToCart: (cartItem: CartItem) => void
}

const ItemCard: FC<ItemCardProps> = props => {

    const initialOption = props.item.options.find(option => option.quantity > 0)!!;

    const [selectedOption, setSelectedOption] = useState<Option>(initialOption);

    const [addedToCart, setAddedToCart] = useState(false);

    const handleOnAddToCart = () => {
        setAddedToCart(true);
        props.onAddToCart({
            itemId: props.item.id,
            itemVersionPrefixId: `${props.item.id}-${props.item.name}-${selectedOption?.color}-${selectedOption?.power}-${selectedOption?.storage}`,
            name: props.item.name,
            cartQuantity: 1,
            option: {
                color: selectedOption?.color,
                power: selectedOption?.power,
                storage: selectedOption?.storage,
                quantityLeft: selectedOption?.quantity
            },
            price: props.item.price
        });

        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);

    }

    return (
        <Grid2>
            <Card sx={{maxWidth: 445, textAlign: "left"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.item.name}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                        {props.item.brand}
                    </Typography>
                    <Grid2 container direction={"row"} spacing={1}>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Cost: {props.item.price} sek
                        </Typography>
                        {
                            !props.item.available ?
                                <Typography variant="body2" sx={{color: 'red'}}>
                                    - out of stock
                                </Typography>
                                :
                                null
                        }
                    </Grid2>
                </CardContent>
                {
                    props.item.available ?
                        <CardContent>
                            {props.item.options.length === 1 ?
                                <Grid2>
                                    <Typography variant="body2" color="text.secondary">
                                        Description
                                    </Typography>
                                    <Grid2 container direction="column">
                                        {props.item.options[0].color && (
                                            <Typography variant="body2" color="text.primary">
                                                Color: {props.item.options[0].color}
                                            </Typography>
                                        )}

                                        {props.item.options[0].power && props.item.options[0].power.map((power, idx) => (
                                            <Typography key={idx} variant="body2" color="text.primary">
                                                Power: {power}
                                            </Typography>
                                        ))}

                                        {props.item.options[0].storage && props.item.options[0].storage.map((storage, idx) => (
                                            <Typography key={idx} variant="body2" color="text.primary">
                                                Storage: {storage}
                                            </Typography>
                                        ))}

                                        <Typography variant="body2" color="text.primary">
                                            Available: {props.item.options[0].quantity}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                                :
                                <Grid2>
                                    <Typography variant="body2" color="text.secondary">
                                        Variants:
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Select one of the available options
                                    </Typography>

                                    <Grid2 container spacing={2}>
                                        {props.item.options.map((option, index) => (
                                            <Grid2 container size={6} direction={"row"} alignContent={"center"}
                                                   sx={{border: "1px solid grey", padding: "2px"}}>
                                                <Grid2 container alignContent={"center"} direction="column">
                                                    {option.color && (
                                                        <Typography variant="body2" color="text.primary">
                                                            Color: {option.color}
                                                        </Typography>
                                                    )}

                                                    {option.power && option.power.map((power, idx) => (
                                                        <Typography key={idx} variant="body2" color="text.primary">
                                                            Power: {power}
                                                        </Typography>
                                                    ))}

                                                    {option.storage && option.storage.map((storage, idx) => (
                                                        <Typography key={idx} variant="body2" color="text.primary">
                                                            Storage: {storage}
                                                        </Typography>
                                                    ))}

                                                    <Typography variant="body2" color="text.primary">
                                                        Available: {option.quantity}
                                                    </Typography>
                                                </Grid2>
                                                <Grid2 alignContent={"center"}>
                                                    <Radio size="small" checked={selectedOption === option}
                                                           disabled={option.quantity === 0}
                                                           onChange={() => setSelectedOption(option)}/>
                                                </Grid2>
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </Grid2>

                            }
                        </CardContent>

                        :
                        null
                }
                <CardActions>
                    <Button
                        size="small"
                        disabled={!props.item.available}
                        onClick={() => handleOnAddToCart()}
                    > {addedToCart ? `Added :)` : "Add to cart"}</Button>
                </CardActions>
            </Card>
        </Grid2>
    )
}

export default ItemCard
