import { useEffect, useState } from "react";
import "./Products.css";
import { productService } from "../../../Services/ProductService";
import { ProductModel } from "../../../Models/ProductModel";
import { ProductCard } from "../ProductCard/ProductCard";
import { notify } from "../../../Utils/notify";
import { error } from "console";

export function Products(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect( ()=> {
        productService.getAllProducts()
        .then(dbProducts =>setProducts(dbProducts))
        .catch(err => notify.error(err));
    }, []);
    

    return (

       
        <div className="Products">
			{products.map(p => <ProductCard key={p.id} product={p}/>)}

        </div>
    );
}
