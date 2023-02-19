import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
//import useCookies from "react-cookie/cjs/useCookies";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ShopperLoginUser(){
    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <Formik
              initialValues={{
                "UserId":"",
                "Password":""
             }}
             onSubmit={
               (values)=>{
                   axios({
                       method: "get",
                       url: "http://127.0.0.1:8080/users"
                    })
                    .then(response=>{
                       for(var user of response.data){
                           if(user.UserId==values.UserId && user.Password==values.Password) {
                            setCookies("UserId",values.UserId);
                               navigate("/home");
                               break;
                           } else {
                               navigate("/invalid");
                           }
                       }
                   })
               }
             }
           
            >
                {
                <Form>
                    <div style={{marginLeft:"30%"}} className="mt-5">
                        <dl>
                            <dt className="form-label">User ID</dt>
                            <dd><Field type="text" name="UserId" className="form-control w-50"/></dd>
                            <dd><ErrorMessage name="UserId"/></dd>
                            
                            <dt className="form-label">Password</dt>
                            <dd><Field type="password" name="Password" className="form-control w-50"/></dd>
                            <dd><ErrorMessage name="Password"/></dd>
                            
                            <div>
                                <button className="btn btn-success w-50 mt-4">Login</button>
                            </div>
                        </dl>
                            

                    </div>
                </Form>
        }
        </Formik>
        </div>
    );
}