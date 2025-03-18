import {items} from "./mocks-data";
import {ApiItem, Order} from "./data-classes";

export const getItemsMockWithDelay = (signal: AbortSignal) => {
    console.log("get product mock call with delay")
    return new Promise<ApiItem[]>(resolve => {
        setTimeout(() => {
            resolve(items)
        }, 10)
    })
}

export const postOrderMockWithDelay = (order: Order,signal: AbortSignal) => {
    console.log("post order mock call")
    console.log("order:" + order)
    return new Promise<Order>(resolve => {
        setTimeout(() => {
            resolve(order)
        }, 10)
    })
}
