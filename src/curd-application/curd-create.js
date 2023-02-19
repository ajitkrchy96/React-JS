import axios from "axios";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";

export function NewProduct(){
    const[products,setProducts] = useState([]);
    const[productIdError,setProductIdError] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:8080/products'
        }).then(response=>{
            setProducts(response.data);
        });
    },[]);
    function VerifyProductId(e){
        for (let prod of products) {
            if(prod.ProductId == e.target.value){
                setProductIdError("Product Id Allready Exist !")
                break;
            }else{
                setProductIdError("")
            }
        }
    }
    return (
        <div className="container-fluid">
            <h2>Add New Product</h2>
            <Formik
            initialValues={
                {
                    "ProductId":0,"Name":"","Price":0,"Stock":false 
                }
            }
            onSubmit={
                (values)=>{
                    axios({
                        method:'post',
                        url:'http://127.0.0.1:8080/addproducts',
                        data:values
                    }).then(()=>{
                        alert("New Product Added !!")
                        navigate("/products")
                    });
                }
            }
            >
            {
                <Form>
                    <dl>
                        <dt className="form-label">Product Id</dt>
                        <dd><Field name="ProductId" type="number" onKeyUp={VerifyProductId} className="form-control w-25"/></dd>
                        <dd className="text-danger">{productIdError}</dd>
                        <dd><ErrorMessage name="ProductId"/></dd>
                        
                        <dt className="form-label">Name</dt>
                        <dd><Field name="Name" type="text"className="form-control w-25"/></dd>
                        <dd><ErrorMessage name="Name"/></dd>
                        
                        <dt className="form-label">Price</dt>
                        <dd><Field name="Price" type="number"className="form-control w-25"/></dd>
                        <dd><ErrorMessage name="Price"/></dd>
                        
                        <dt className="form-label">Stock</dt>
                        <dd className="form-switch"><Field className="form-check-input" name="Stock" type="checkbox"/> Available</dd>
                        <dd><ErrorMessage name="Stock"/></dd>
                        
                        <button className="btn btn-primary me-4">Add Product</button>
                        <Link to="/products" className="btn btn-success">View Products</Link>
                    </dl>
                </Form>
            }
            </Formik>
        </div>
    );
}