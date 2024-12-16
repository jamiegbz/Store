//imports
import type { CartItem, Product } from "../types"

//props that were used
type Props = {
    item: CartItem
    products: Product[]
}

//each product info 
export default function CartItemRow({ item, products }: Props) {
    const product = products.find(p => p.id == item.productId)
    return (
        //created table 
        // table row and table data
        <tr>
            <td>{product?.name || "Lego not Found"}</td>
            <td>${product?.price.toFixed(2)}</td>
            <td>{item.amount}</td>
        </tr>
    )
}