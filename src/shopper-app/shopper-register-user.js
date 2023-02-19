import axios from "axios";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup";

export function ShopperRegisterUser(){
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <h2>Register User</h2>
            <Formik
            initialValues = {{
                    UserId:"",UserName:"",Password:"",Email:"",Age:0,Mobile:""
                }
            }
            validationSchema = {
                yup.object({
                    UserId : yup.string().required("User ID Required"),
                    UserName : yup.string().required("User Name Required"),
                    Password : yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{4,15}/,"Password 4 to 15 chars at least one Upper case latter"),
                    Email : yup.string().required("Email Required").email("Invalid Email"),
                    Age : yup.number().required("Age Required"),
                    Mobile : yup.string().matches(/\+91\d{10}/,"Invalid Mobile +91 and 10 digit")
                })
            }
            onSubmit={
                (values)=>{
                    axios({
                        method:'post',
                        url:'http://127.0.0.1:8080/register',
                        data:values
                    }).then(()=>{
                        alert("Register Successfully ...")
                        navigate("/login");
                    }); 
                }
            }>
            {
              <Form>
               <dl>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3">
                        <dt className="form-label">User Id</dt>
                        <dd> <Field type="text" name="UserId" className="form-control" /> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="UserId" />
                        </dd>
                        <dt className="form-label">User Name</dt>
                        <dd> <Field type="text" name="UserName" className="form-control"/> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="UserName" />
                        </dd>
                        <dt className="form-label">Password</dt>
                        <dd> <Field type="password" name="Password" className="form-control"/> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Password" />
                        </dd>     
                    </div>
                    <div className="col-3">
                        <dt className="form-label">Email</dt>
                        <dd> <Field type="text" name="Email" className="form-control"/> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Email" />
                        </dd>
                        <dt className="form-label">Age</dt>
                        <dd> <Field type="number" name="Age" className="form-control"/> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Age" />
                        </dd>
                        <dt className="form-label">Mobile</dt>
                        <dd> <Field type="text" name="Mobile" className="form-control"/> </dd>
                        <dd className="text-danger">
                            <ErrorMessage name="Mobile" />
                        </dd>
                    </div>
                    <div className="col-3"></div>
                </div>  
               </dl>
               <div style={{marginLeft:"30%"}}>
               <button className="btn btn-primary w-25 me-5 mt-3">Register</button>
                   <Link to="/login" className="btn btn-primary w-25 mt-3">Existing User?</Link>
               </div>
           </Form>
            }
            </Formik>
        </div>
    )
}