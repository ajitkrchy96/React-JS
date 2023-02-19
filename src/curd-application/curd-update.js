import axios from "axios";
import { Formik,Form,Field } from "formik";
import { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";

export function EditProduct(){
    const[products,setProducts] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    useEffect(()=>{
        axios({
            method:'get',
            url:`http://127.0.0.1:8080/details/${params.id}`
        }).then(response=>{
            setProducts(response.data);
        });
    },[params.id]);
    return (
        <div className="container-fluid">
            <h2>Update Product</h2>
            <Formik
            enableReinitialize={true}
            initialValues={
                products[0]
            }
            onSubmit={
                (values)=>{
                    axios({
                        method:'put',
                        url:'http://127.0.0.1:8080/updateproducts',
                        data:values
                    }).then(()=>{
                        alert("Product Updated !!")
                        navigate("/products")
                    });
                }
            }
            >
            {
                <Form>
                    <dl>
                        <dt className="form-label">Product Id</dt>
                        <dd><Field name="ProductId" type="number" className="form-control w-25" disabled/></dd>
                        
                        <dt className="form-label">Name</dt>
                        <dd><Field name="Name" type="text"className="form-control w-25"/></dd>
                        
                        <dt className="form-label">Price</dt>
                        <dd><Field name="Price" type="number"className="form-control w-25"/></dd>
                        
                        <dt className="form-label">Stock</dt>
                        <dd className="form-switch"><Field className="form-check-input" name="Stock" type="checkbox"/> Available</dd>
                        
                        <button className="btn btn-primary me-4">Update Product</button>
                        <Link to="/products" className="btn btn-success">View Products</Link>
                    </dl>
                </Form>
            }
            </Formik>
        </div>
    );
}