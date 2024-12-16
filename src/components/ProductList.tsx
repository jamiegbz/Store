//imports 
import { useState } from "react"
import type { Product } from "../types"
import { Link, useLoaderData } from "react-router-dom"

export const productListLoader = async () => {
    const response = await fetch("http://localhost:3000/Legos")
    if(!response.ok){
            throw new Error(response.statusText)
    }
    const data = await response.json()
    return data
}


export default function ProductList() {
    // const for adding to cart and error 
    const products = useLoaderData() as Product[]
    const[isAddingToCart, setIsAddingToCart] = useState(false)
    //error will either be null or a string
    const[error, setError] = useState<null | string>(null)


    // const addinf to cart with product id will be a number
    //each time user add to cart it will add one
    const addToCart = async (productId: number) => {
        const newCartItem = {
          productId: productId,
          amount: 1
        }
        //make change both in front and back end
        setIsAddingToCart(true)
        try{
            const response = await fetch("http://localhost:3000/cart", {
                method: "POST",
                body: JSON.stringify(newCartItem),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                setError(response.statusText)
            }
        } catch (error: any) {
        }
        setIsAddingToCart(false)

      }


    // will displat prouct name, number and id 
    // adding on click button
    return (
        <>
            <h2 className="display-5 mb-4"> Check out our Selection of Legos!</h2>
            <div className="d-flex flex-wrap gap-3">               
                { error && <p className="text-danger">{error}</p>}
                {products.map(product => (
                    <div className="card flex-grow-1" key={product.id}>
                        <div className="card-body">
                            <h3 className="card-title"> {product.name} </h3>
                            <p className="card-text"> {product.number}</p>
                            <p><Link to={"/Legos/" + product.id}>Details</Link></p>
                            <button 
                                className="btn btn-success" 
                                disabled={isAddingToCart}
                                onClick={() => addToCart(product.id)}
                            >
                                { isAddingToCart ? "Adding..." :
                                    "$" +  product.price.toFixed(2)}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}