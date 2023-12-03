import { CartItem } from './Cart'

type OrderItem = {
    address: string
    cartID: string
    cartItem: CartItem
    createdAt: Date | string
    phone: string | string
    status: string
    total: number
    uid: string
}

export type { OrderItem }
