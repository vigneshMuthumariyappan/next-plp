import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "../../Test/Pause";

const fetchCategory = createAsyncThunk('category/fetch', async (id) => {
    // Build the query
    const query = `{products(filter:{category_id:{eq:${id}}}){items{id name sku url_rewrites{url} small_image {url label position disabled} price_range{minimum_price{regular_price{value currency}final_price{value currency} fixed_product_taxes{label amount{value currency}}}}}}}`
    const apiUrl = process.env.MAGENTO_DOMAIN+`/graphql/?query=${query}`;
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MAGENTO_API_TOKEN
        }
    };

    const responce = await axios.get(apiUrl, headers);
    
    // Development purpose;
    await pause(1000);
    return responce.data;
});

export { fetchCategory };