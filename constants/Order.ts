import { OrderData } from "./types.interface";

export type orderType = "최신순" | "오래된순";

const Order: OrderData[] = [
    {_id: 0, order: "최신순"},
    {_id: 1, order: "오래된순"},
]; 

export default Order;