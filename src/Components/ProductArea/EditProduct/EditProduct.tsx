import { useForm } from "react-hook-form";
import { ProductModel } from "../../../Models/ProductModel";
import "./EditProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../../Services/ProductService";
import { useEffect } from "react";
import { notify } from "../../../Utils/notify";

export function EditProduct(): JSX.Element {

    const { register, handleSubmit, formState, setValue, watch } = useForm<ProductModel>();//register conect between the input to the name of the productmodel/
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id;

    useEffect(() => {
        productService.getOneProduct(id).then(dbProduct => {
            setValue("name", dbProduct.name);
            setValue("price", dbProduct.price);
            setValue("stock", dbProduct.stock);
            setValue("imageUrl", dbProduct.imageUrl);
        }).catch(err => notify.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            product.image = (product.image as unknown as FileList)[0];
            product.id = id;
            await productService.updateProducts(product);
            notify.success("product has been updated.");
            //Navigate to "/products"
            navigate("/products");
            // how to handle the duplicated ".active" class?

        } catch (error:any) {
            notify.error(error);

        }

    }


    return (
        <div className="EditProduct">
            <form onSubmit={handleSubmit(send)}>

                {/*<input type="hidden"{...register(id)}/>*/}

                <label>Name: </label>
                <input type="text" {...register("name", ProductModel.nameValidation)} />
                <span className="error">{formState.errors?.name?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01"  {...register("price", ProductModel.priceValidation)} />
                <span className="error">{formState.errors?.price?.message}</span>

                <label>Stock: </label>
                <input type="number"  {...register("stock", ProductModel.stockValidation)} />
                <span className="error">{formState.errors?.stock?.message}</span>

                <label>Image: </label>
                <input type="file" {...register("image")} />
                <img src={watch("imageUrl")} />

                <button>Add</button>

            </form>

        </div>
    );
}
