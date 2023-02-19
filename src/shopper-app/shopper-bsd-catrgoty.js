import axios from "axios";
import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ShopperShowBasedOnCategory(){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const params =useParams();
    const [cookies , setCookies,removeCookies] = useCookies();
    
    useEffect(()=>{
        if(cookies["UserId"] == undefined){
            navigate("/login");
        }
        axios({
                method: 'get',
                url:`https://fakestoreapi.com/products/category/${params.catname}`
            })
            .then(resp=>{
                setProducts(resp.data);
            })
    },[params.catname]);
    return (
        <div className="container-fluid">
            <h1>Showing {params.catname} Category </h1>
            <div className="d-flex flex-wrap justify-content-between">
                {
                    products.map(product =>
                         <div className="card m-2 p-2" style={{width:"300px"}}>
                            <img src={product.image} alt={params.catname} className="cars-img-top" style={{height:"250px"}}/>
                            <div style={{height:"100px"}}>
                                <p>{product.title}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/details/${product.id}`} className="btn btn-primary w-100">Details</Link>
                            </div>    
                         </div>   
                    )
                }
            </div>
        </div>
    );
}