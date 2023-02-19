import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function ShowProductDetailsBasedOnId(){
    const params = useParams();
    const [product,setProduct] = useState({ "id": 0,"title": "","price": 0,"description": "","category": "","image": "","rating": {"rate": 0,"count": 0}});
    useEffect(()=>{
        axios({
            method:'get',
            url: `https://fakestoreapi.com/products/${params.id}`
        }).then(Response=>{
            setProduct(Response.data);
            //alert(JSON.stringify(Response.data))
        });
    },[params.id]);
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="text-center"> Product Details Page </h1>
                <div className="col-4">
                    <img src={product.image}  alt={product.title} style={{width:"400px", height:"350px"}}/>
                </div>
                <div className="col-8">
                    <dl>
                        <dt>Titile</dt>
                        <dd>{product.title}</dd>
                        <dt>Price</dt>
                        <dd>{product.price}</dd>
                        <dt>Description</dt>
                        <dd>{product.description}</dd>
                        <dt>Category</dt>
                        <dd>{product.category}</dd>
                        <dd><span className="bi bi-star-fill text-success"></span> <span>{product.rating.rate} [{product.rating.count}]</span></dd>
                    </dl>
                    
                <div>
                    <Link to={'/category/'+product.category } className="btn btn-primary w-25">Back to {product.category}</Link>
                </div>
                </div>
            </div>
        </div>
    );
}