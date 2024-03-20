import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { productService } from "../../../Services/ProductService";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { notify } from "../../../Utils/notify";


export function ProductDetails(): JSX.Element {

    const [product, setProduct] = useState<ProductModel>()
    const params = useParams();
    const id = +params.id;
    const navigate = useNavigate();

    useEffect(() => {
        productService.getOneProduct(id)
        .then(dbProduct => setProduct(dbProduct))
        .catch(err => notify.error(err));

    }, []);
    

    async function deleteMe() {
        try {
            //ask the user if he is sure' only if sure        
            const sure = window.confirm("Are you sure?");
            if (!sure) return;
            //delete this product
            await productService.deleteProduct(id);
            notify.success("Product has been delete");
            //navigate to "/products".
            navigate("/products");
        } catch (err:any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductDetails">
            details..
			
            <h3>Name: {product?.name}</h3>
            <h3>Price: {product?.price}</h3>
            <h3>Stock: {product?.stock}</h3>
            <img src={product?.imageUrl} />

            <br /><br />

            <NavLink to="/products"> Back | </NavLink>

            <span> </span>

            <NavLink to={"/products/edit/" + product?.id}> Edit | </NavLink>

            <span> </span>

            <NavLink to="#" onClick={deleteMe}> Delete </NavLink>


        </div>
     )   

}   