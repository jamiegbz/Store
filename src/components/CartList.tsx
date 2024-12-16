//imports
import { useEffect, useState } from "react"
import { CartItem, Product } from "../types"
import CartItemRow from "./CartItemRow"


//const 
export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [products, setProducts] = useState<Product[]>([])
    //using const to load
    const [loading, setLoading] = useState(false)
    //error piece of state with empty string
    const [errorMessage, setErrorMessage] = useState("")

    //using if check and else to handle error
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/cart")
                if(!response.ok) {
                    setErrorMessage(response.statusText)
                } else {
                    const data = await response.json()
                    setCartItems(data)
                }
            } catch(error: any) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchCart()
        // duplicate from product list
        
        const fetchProduct = async () => {
            setLoading(true)
            try{
                const response = await fetch("http://localhost:3000/Legos")
                if(!response.ok){
                    setErrorMessage("ERROR WAS FOUND" + response.statusText)
                } else{
                    const data = await response.json()
                    setProducts(data)
                    setErrorMessage("")
                }
            } catch(error: any){
                setErrorMessage("ERROR WAS FOUND" + error.message)
            }
            setLoading(false)
        }
        fetchProduct()
    }, []) 


    //in each cart item there will information that is imported
    //from cartItemRow
    //if error message it will show {erroeMessage}
    return (
        <>
        
            <h2 className="display-5 mb-4"> Cart</h2>
            {
                loading ? <p className="text-body-tertiary">Loading...</p> :
                errorMessage ? <p className="text-danger">{errorMessage} </p> :
                    <table className="table table-striped">
                        <tbody>
                            { cartItems.map(item =>(
                                <CartItemRow 
                                    item={item} 
                                    key={item.id} 
                                    products={products}
                                />
                            ))} 
                        </tbody>
                    </table>
                }      
            </>
        )
}