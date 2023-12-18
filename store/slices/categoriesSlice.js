'use client';
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../thunks/fetchCategories";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export const categoriesReducer = categoriesSlice.reducer;