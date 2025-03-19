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
    color?: string | string[];
    power?: number[];
    storage?: string[];
    quantity: number;
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
    color?: string | string[];
    power?: number[];
    storage?: string[];
    quantity: number;
}

export interface CartItem {
    itemId: string,
    itemVersionPrefixId:string,
    name: string,
    cartQuantity: number,
    option: CartOption,
    weight: number,
    price: number,
}

export interface CartOption {
    color?: string | string[];
    power?: number[];
    storage?: string[];
    quantityLeft?: number;
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