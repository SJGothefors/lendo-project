import {getItemsMockWithDelay, postOrderMockWithDelay} from "./mock-calls";
import {Item, Option, Order} from "./data-classes";

/**
 * How a real call would look like:
 *
export const getItems = (signal: AbortSignal): Promise<Item[]> =>
    get<Item[]>(`${ API_BASE_URL }/items`, {data: {}, signal: signal, responseType: ResponseType.JSON})
 */

// Mock calls
//export const getItems = getItemsMockWithDelay

export const getItems = async (signal: AbortSignal): Promise<Item[]> => {
    const apiItems = await getItemsMockWithDelay(signal);
    return apiItems.map(apiItem => {
        return {
            id: apiItem.id,
            name: apiItem.name,
            brand: apiItem.brand,
            price: apiItem.price,
            available: apiItem.available,
            weight: apiItem.weight,
            options: apiItem.options.map(apiOption => {
                return {
                    color: apiOption.color,
                    power: apiOption.power,
                    storage: apiOption.storage,
                    quantity: apiOption.quantity,
                    itemVersionPrefixId: `${apiItem.id}-${apiItem.name}-${apiOption.color}-${apiOption.power}-${apiOption.storage}`
                } as Option;
            })
        };
    });
}

export const postOrder = async (order: Order, signal: AbortSignal): Promise<Order> => {
    return await postOrderMockWithDelay(order, signal);
}

