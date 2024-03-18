import { useEffect, useState } from "react";
import "./Products.css";
import { productService } from "../../../Services/ProductService";
import { ProductModel } from "../../../Models/ProductModel";
import { ProductCard } from "../ProductCard/ProductCard";

export function Products(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect( ()=> {
        productService.getAllProducts().then(dbProducts =>setProducts(dbProducts));
    }, []);
    

    return (

       
        <div className="Products">
			{products.map(p => <ProductCard key={p.id} product={p}/>)}

        </div>
    );
}
