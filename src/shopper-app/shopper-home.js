import { useEffect } from "react";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
export function ShopperHome(){
    const[cookies,setCookies, removeCookies]= useCookies();
    const navigate = useNavigate();
    useEffect(()=>{
        if(cookies["UserId"] == undefined){
            navigate("/login")
        }
    },[]);
    function OnSignOutClick(){
        removeCookies("UserId"); 
        navigate("/login")
    }
    return (
        <div className="container-fluid">
            <div>
                <span className="h4">Hello : {cookies["UserId"]}</span>
                <button className="btn btn-danger text-decoration-none" onClick={OnSignOutClick}>Sign OUT</button>
            </div>
            <div className="d-flex justify-content-between mt-5">
                <div>
                    <img src="home/electronics.jpg" alt="electronics" style={{width:"200px" , height:"300px"}}/>
                </div>
                <div>
                    <img src="home/jewelery.jpg" alt="jewelery" style={{width:"200px" , height:"300px"}}/>
                </div>
                <div>
                    <img src="home/mens_clothing.jpg" alt="mens_clothing" style={{width:"200px" , height:"300px"}}/>
                </div>
                <div>
                    <img src="home/womens_clothing.jpg" alt="womens_clothing" style={{width:"200px" , height:"300px"}}/>
                </div>
                
            </div>

        </div>
    );
}