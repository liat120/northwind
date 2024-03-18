import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { HomeE } from "../../HomeArea/HomeE/HomeE";
import { Products } from "../../ProductArea/Products/Products";
//import { About } from "../../AboutArea/About/About";
import { Page404 } from "../Page404/Page404";
import { Suspense, lazy } from "react";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { ProductDetails } from "../../ProductArea/ProductDetails/ProductDetails";

export function Routing(): JSX.Element {

    // describe where the about component located
    const LazyAbout = lazy(() => import("../../AboutArea/About/About") );
    // load about component only when browsing so "/about" route
    const SuspenseAbout = <Suspense fallback={<Spinner />}> <LazyAbout /> </Suspense>

    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<HomeE />} />
                <Route path="/products" element={<Products />} />
                <Route path="products/details/:id" element={<ProductDetails />}/>
                <Route path="/about" element={SuspenseAbout} />
                <Route path="/" element={<Navigate to= "/home" />}/>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

/*npm i react-router-dom @types/react-router-dom*/
