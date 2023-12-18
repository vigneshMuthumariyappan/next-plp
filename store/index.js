import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./slices/categoriesSlice";
import { categoryReducer } from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        category: categoryReducer
    }
});
export * from './thunks/fetchCategories';
export * from './thunks/fetchCategory';

export * from './slices/categorySlice';