import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel"
import { addProduct, deleteProduct, initProducts, updateProduct } from "./reducers";


export type AppState = {

    products: ProductModel[];
}

const slice = createSlice({
    name: "products",
    reducers:{ initProducts, addProduct, updateProduct, deleteProduct },
    initialState: null
});

export const actions = slice.actions;

export const store = configureStore({
    reducer: { products:slice.reducer}
});

