import { Link } from "react-router-dom";
export function ShopperInvalidLogin(){
    return(
        <div className="text-danger">
            <h3>Invalid User Name / Password</h3>
            <div>
                <Link to="/login" className="btn btn-success w-25 mt-4 ms-3">Try again</Link>
            </div>
        </div>
        
    )
}