import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { actions, store } from "../Storage/store";
import { act } from "@testing-library/react";

class ProductService {

    public async getAllProducts(): Promise<ProductModel[]> {
        if(store.getState().products) return store.getState().products;
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
        const products = response.data;
        store.dispatch(actions.initProducts(products))
        return products;
    }
	
    public async getOneProduct(id: number):Promise<ProductModel> {
        let product = store.getState().products.find((p:ProductModel) => p.id === id );
        if(product) return product;
        const response = await axios.get<ProductModel>(appConfig.productsUrl + id);
        product = response.data;
        //const product = response.data;
        return product;
    }

    public async addProducts(product: ProductModel): Promise<void>{
        const options= {headers:{"content-Type": "multipart/form-data" }};// send text and file 
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);
        const dbproduct = response.data;
        store.dispatch(actions.addProduct(dbproduct));
    }
    public async updateProducts(product: ProductModel): Promise<void>{
        const options= {headers:{"content-Type": "multipart/form-data" }};// send text and file 
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);
        const dbproduct = response.data;
        store.dispatch(actions.updateProduct(dbproduct));
    }

    public async deleteProduct(id: number): Promise<void>{

        await axios.delete(appConfig.productsUrl + id);
        //global state
        
        store.dispatch(actions.deleteProduct(id));



    }
}

export const productService = new ProductService();

/*npm i axios*/