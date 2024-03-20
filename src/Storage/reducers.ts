import { PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

export function initProducts(currentState: ProductModel[], 
                            action: PayloadAction<ProductModel[]>): ProductModel[] {
    return action.payload;
                            


}

export function addProduct(currentState: ProductModel[] ,
                    action: PayloadAction<ProductModel>): ProductModel[]{
    //const productToAdd = action.payload;
    //const newState = [...currentState];
    //newState.push(productToAdd);
    //return newState;
    return[... currentState, action.payload];
}

export function updateProduct( currentState: ProductModel[],
    action: PayloadAction<ProductModel>): ProductModel[]{
    const newState = [...currentState];
    const index = newState.findIndex(p=> p.id === action.payload.id);
    if( index >= 0) newState[index] = action.payload;
    return newState;

   
}

export function deleteProduct( currentState: ProductModel[],
    action: PayloadAction<number>): ProductModel[]{
    return currentState.filter(p => p.id !== action.payload)
    //const newState = [...currentState];
    //const index = newState.findIndex(p=> p.id === action.payload);
    //if( index >= 0) newState[index] = action.payload;
    //return newState;
    }