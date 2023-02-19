import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { ShopperShowBasedOnCategory } from "./shopper-bsd-catrgoty";
import { ShopperHome } from "./shopper-home";
import { ShopperInvalidLogin } from "./shopper-invalid-login";
import { ShopperLoginUser } from "./shopper-login-user";
import { ShopperRegisterUser } from "./shopper-register-user";
import { ShowProductDetailsBasedOnId } from "./show-product-details-bsd-id";
import {useCookies} from "react-cookie";
import { CurdIndex } from "../curd-application/curd-index";
import { NewProduct } from "../curd-application/curd-create";
import { ViewProductDetails } from "../curd-application/curd-details";
import { EditProduct } from "../curd-application/curd-update";

export function ShopperIndex(){
    const [cookies, setCookies , removeCookies] = useCookies();
    
    return (
        <div className="container-fluid">
            <div>
                <BrowserRouter>
                    <header className="d-flex p-1 justify-content-between">
                        <div>
                            <Link to="/" className="text-decoration-none h1">Shopper App</Link>
                        </div>
                        <nav className="d-flex fw-bold text-primary mt-3">
                            <div className="me-3"><Link to="home" className="btn">Home</Link></div>
                            <div className="me-3"><Link to="products" className="btn">Products</Link></div>
                            <div className="me-3"><Link to="register" className="btn">Register</Link></div>   
                            <div className="me-3"><Link to="category/men's clothing" className="btn">Men's Fation</Link></div>
                            <div className="me-3"><Link to="category/women's clothing" className="btn"> Women's Fation</Link> </div>
                            <div className="me-3"><Link to="category/jewelery" className="btn"> Jewelery </Link></div>
                            <div className="me-3"><Link to="category/electronics" className="btn"> Electronics </Link></div>
                        </nav>
                        <div className="mt-3">
                            <span className="bi bi-search me-3"></span>
                            <span className="bi bi-heart me-3"></span>
                            <span className="bi bi-cart4 me-3 "></span>
                        </div>
                        <div>        
                            <span className="p">Hello !! {cookies["UserId"]}</span>
                        </div>            
                    </header>
                    <div className="text-center bg-dark text-white h3 p-1">
                    ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️
                    </div>
                    <div className="mt-3">
                        <Routes>
                            <Route path="/" element={ <ShopperHome />} />
                            <Route path="home" element={ <ShopperHome />} />
                            <Route path="category/:catname" element={ <ShopperShowBasedOnCategory/>} />
                            <Route path="details/:id" element={ <ShowProductDetailsBasedOnId/>} />
                            <Route path="register" element={<ShopperRegisterUser/>}/>
                            <Route path="login" element={<ShopperLoginUser/>}/>
                            <Route path="invalid" element={<ShopperInvalidLogin/>}/>
                            <Route path="products" element={<CurdIndex/>}/>
                            <Route path="newProduct" element={<NewProduct/>}/>
                            <Route path="editProduct/:id" element={<EditProduct/>}/>
                            <Route path="viewProduct/:id" element={<ViewProductDetails/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}
