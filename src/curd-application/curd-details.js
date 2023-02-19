import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function ViewProductDetails(){
    const params = useParams();
    const [product,setProduct] = useState({ProductId:0,Name:'',Price:0,Stock:false});
    
    useEffect(()=>{
        axios({
            method:'get',
            url : 'http://127.0.0.1:8080/details/'+params.id
            }).then(response=> {
                var prod ={
                    ProductId:response.data[0].ProductId,
                    Name:response.data[0].Name,
                    Price:response.data[0].Price,
                    Stock:response.data[0].Stock
                }
                setProduct(prod)
            })
            
        },[]);
            
    return (
        <div className="container-fluid ms-3">
            <h2>View Product Details</h2>
            <dl>
                <dt>Product Id</dt>
                <dd>{product.ProductId}</dd>
                <dt>Name</dt>
                <dd>{product.Name}</dd>
                <dt>Price</dt>
                <dd>{product.Price}</dd>
                <dt>Stock</dt>
                <dd>{(product.Stock==true)? "Avalable" : "Out of Stock"}</dd>
            
               <Link to="/products" className="btn btn-primary">Back to Product</Link>
            </dl>
        </div>
    )
}