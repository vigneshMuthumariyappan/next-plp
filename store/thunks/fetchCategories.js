'use client';

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "@Test/Pause";

const fetchCategories = createAsyncThunk('users/fetch', async () => {
    const closure = [];
    if (closure['categories']) return closure['categories'];
    const apiUrl = `${process.env.MAGENTO_DOMAIN}/rest/V1/categories`;
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MAGENTO_API_TOKEN
        }
    };
    const responce = await axios.get(apiUrl, headers);
    closure['categories'] = responce.data;
    // Development purpose;
    await pause(1000);
    return closure['categories'];
});

export { fetchCategories };