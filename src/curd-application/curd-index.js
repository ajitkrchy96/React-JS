import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
export function CurdIndex(){
    const [products,setProducts] = useState([]);
    function ProductDeleteClicked(e){
        var flag = window.confirm("Are you sure want to delete : "+e.currentTarget.value);
        if(flag == true){
            axios({
                method:'delete',
                url: 'http://127.0.0.1:8080/deleteproducts/',
                data:{"id":e.currentTarget.value}
            }).then(resp=>{
                alert("Product deleted ..")
            })
        }else{
            alert("Product delete cancled !!")
        }
    }
    useEffect(()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:8080/products'
        }).then(resp=>{
            setProducts(resp.data);
        });
    },[products]);
    return (
        <div className="container-fluid">
            <h2>Products Grid</h2>
            <div className="text-center mb-3">
                <Link to="/newProduct" className="btn btn-primary">Add new Product</Link>
            </div>
            <table className="table table-hover ">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.ProductId}>
                                <td>{product.Name}</td>
                                <td>{product.Price}</td>
                                <td>{product.Stock == true ? "Available" : "Out of Stock"}</td>
                                <td>
                                    <Link to={"/viewProduct/"+product.ProductId} className="btn btn-info">
                                         <span className="bi bi-eye"/>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={"/editProduct/"+product.ProductId} className="btn btn-warning">
                                         <span className="bi bi-pen"/>
                                    </Link>
                                </td>
                                <td>
                                    <button value={product.ProductId} onClick={ProductDeleteClicked} className="btn btn-danger">
                                         <span className="bi bi-trash"/>
                                    </button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
}