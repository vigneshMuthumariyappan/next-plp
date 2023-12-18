import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "../../Test/Pause";
import { eq, from } from '@store/thunks/helper/graphql-query';

const getQueryFromFilteredAttribute = (filteredArray, isFilterApplied) => {
    const result = [];
    if (!isFilterApplied) return '';
    let category_uid = false;
    filteredArray.map((attribute) => {
        if (attribute.attribute_code === 'category_uid') {
            category_uid = attribute;
            return;
        }
        if (attribute.value.split('_').length > 1) {
            const arr = attribute.value.split('_');
            result.push(from(attribute.attribute_code, arr[0], arr[1]));
        } else {
            result.push(eq(attribute.attribute_code, attribute.value));
        }
        return '';
    });
    return {'result': result.toString(), 'category_uid': category_uid}
}
const fetchCategory = createAsyncThunk('category/fetch', async ({id, filteredArray, currentPage}) => {

    if (!id) return;
    
    // Build the query
    const query = `{products(filter:{category_id:{eq:${id}}}currentPage:${currentPage}){aggregations(filter:{category:{includeDirectChildrenOnly: false}}){attribute_code count label options {label value count}}total_count items{id name sku __typename url_rewrites{url} small_image {url label position disabled} price_range{minimum_price{regular_price{value currency}final_price{value currency} fixed_product_taxes{label amount{value currency}}}}}}}`

    const isFilterApplied = filteredArray.length !== 0;
    const {result, category_uid} = getQueryFromFilteredAttribute(filteredArray, isFilterApplied);
    const category = category_uid ? 'category_uid' : 'category_id';
    category === 'category_uid' ? id = category_uid.value : '';
    const queryWithFilter = `{products(filter:{${category}:{eq:"${id}"}, ${result}}currentPage:${currentPage}){aggregations(filter:{category:{includeDirectChildrenOnly: false}}){attribute_code count label options {label value count}}total_count items{id name sku url_rewrites{url} small_image {url label position disabled} price_range{minimum_price{regular_price{value currency}final_price{value currency} fixed_product_taxes{label amount{value currency}}}}}}}`
    
    const apiUrl = process.env.MAGENTO_DOMAIN+`/graphql/?query=${isFilterApplied?queryWithFilter:query}`;
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MAGENTO_API_TOKEN
        },
    };

    const responce = await axios.get(apiUrl, headers);
    
    // Development purpose;
    await pause(1000);
    return responce.data;
});

export { fetchCategory };