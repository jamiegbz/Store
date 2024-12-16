//imports
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Product } from "../types"

export default function LegoDetails() {
    const { productId } = useParams()
    //const and either will be null or product when loads in
    const [product, setProduct] = useState<null | Product>(null)

    //fetchiing details about lego
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch("http://localhost:3000/Legos/" + productId)
            const data = await response.json()
            //once loaded in
            setProduct(data)
        }
        fetchProduct()
    })

    //if not a product it will return loading
    if(!product){
        return (<div>Loading...</div>)
    }

    //once user clicks one details about the lego
    //it will show product name, number, price 
    // and how many are in stock 
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{"ID #" + product.number}</p>
            <p>{ "$" +  product.price.toFixed(2)}</p>
            <p>{"How many are in stock: " + product.quantityInStock}</p>
        </div>
    )
}