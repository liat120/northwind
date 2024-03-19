import { useForm } from "react-hook-form";
import "./AddProduct.css";
import { ProductModel } from "../../../Models/ProductModel";
import { SyntheticEvent } from "react";
import { productService } from "../../../Services/ProductService";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/notify";

export function AddProduct(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<ProductModel>();
//register conect between the input to the name of the productmodel/

    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try{
            product.image = (product.image as unknown as FileList) [0];
            console.log(product)
            await productService.addProducts(product);
            notify.success("product has been added.");
        //Navigate to "/products"
            navigate("/products");
        // how to handle the duplicated ".active" class?
        }
        catch (err: any) {
            notify.error(err);

        }
        
    }

    return (
        <div className="AddProduct">
            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name", ProductModel.nameValidation) } />
                <span className="error">{formState.errors?.name?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01"  {...register("price", ProductModel.priceValidation)}/>
                <span className="error">{formState.errors?.price?.message}</span>

                <label>Stock: </label>
                <input type="number"  {...register("stock", ProductModel.stockValidation)}/>
                <span className="error">{formState.errors?.stock?.message}</span>

                <label>Image: </label>
                <input type="file" {...register("image", ProductModel.imageValidation)}/>
                <span className="error">{formState.errors?.image?.message}</span>
                
                <button>Add</button>

            </form>
			
        </div>
    );
}


//required minLength={2} - validation