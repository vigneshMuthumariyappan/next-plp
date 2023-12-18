import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../thunks/fetchCategory";

const category = createSlice({
    name: 'category',
    initialState: {
        category: [],
        filter: [],
        isLoading: false,
        error: null
    },
    reducers: {
        addFilter(state, action) {
            const uniqueArray = state.filter.length !== 0 ? state.filter.filter((attribute) => attribute.attribute_code !== action.payload.attribute_code): []
            uniqueArray.push(
                {attribute_code: action.payload.attribute_code, value: action.payload.value, label: action.payload.label, option_lable: action.payload.option_lable}
            )
            state.filter = uniqueArray;
        },
        clearFilter(state, action) {
            state.filter = [];
        },
        removeFilter(state, action) {
            const uniqueArray = state.filter.filter((attribute) => attribute.attribute_code !== action.payload)
            state.filter = uniqueArray;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCategory.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload;
        });
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const {addFilter, clearFilter, removeFilter} = category.actions;
export const categoryReducer = category.reducer;