export interface Item {
    id: string,
    name: string,
    brand: string,
    price: number,
    available: boolean,
    weight: number,
    options: Option[],
}

export interface Option {
    itemVersionPrefixId:string,
    color?: string | string[]; // Can be a single color or an array of colors
    power?: number[]; // For light bulbs with multiple power levels
    storage?: string[]; // For electronics with storage options
    quantity: number; // Available stock count
}

export interface ApiItem {
    id: string,
    name: string,
    brand: string,
    price: number,
    available: boolean,
    weight: number,
    options: ApiOption[],
}

export interface ApiOption {
    color?: string | string[]; // Can be a single color or an array of colors
    power?: number[]; // For light bulbs with multiple power levels
    storage?: string[]; // For electronics with storage options
    quantity: number; // Available stock count
}

export interface CartItem {
    itemId: string,
    itemVersionPrefixId:string,
    name: string,
    cartQuantity: number,
    option: CartOption,
    price: number,
}

export interface CartOption {
    color?: string | string[]; // Can be a single color or an array of colors
    power?: number[]; // For light bulbs with multiple power levels
    storage?: string[]; // For electronics with storage options
    quantityLeft?: number; // Available stock count
}

export interface Cart {
    items: CartItem[],
    totalCost: number,
}

export interface DeliveryDetails {
    name?: string,
    address?: string,
    phone?: string,
    email?: string,
}

export interface Order {
    id?: string,
    cart: Cart,
    deliveryDetails: DeliveryDetails,
}