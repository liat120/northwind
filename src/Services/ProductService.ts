import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";

class ProductService {

    public async getAllProducts(): Promise<ProductModel[]> {
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
        const products = response.data;
        return products;
    }
	
    public async getOneProduct(id: number):Promise<ProductModel> {
        const response = await axios.get<ProductModel>(appConfig.productsUrl + id);
        const product = response.data;
        return product;
    }

    public async addProducts(product: ProductModel): Promise<void>{
        const options= {headers:{"content-Type": "multipart/form-data" }};// send text and file 
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);
        const dbproduct = response.data;
        console.log(dbproduct);
    }
    public async updateProducts(product: ProductModel): Promise<void>{
        const options= {headers:{"content-Type": "multipart/form-data" }};// send text and file 
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);
        const dbproduct = response.data;
        console.log(dbproduct);

    }

    public async deleteProduct(id: number): Promise<void>{
        await axios.delete(appConfig.productsUrl + id);
    }
}

export const productService = new ProductService();

/*npm i axios*/