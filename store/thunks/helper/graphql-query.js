export const eq = (attributeCode, value) => `${attributeCode}:{eq:${value}}`;

export const price = () => ``;

export const from = (attributeCode, v1, v2) => `${attributeCode}: {from: ${v1}, to: ${v2}}`;

export const getProuductByCategoryId = () => {

    const query = `{products(filter:{category_id:{eq:${id}}}){aggregations(filter:{category:{includeDirectChildrenOnly: false}}){attribute_code count label options {label value count}}total_count items{id name sku url_rewrites{url} small_image {url label position disabled} price_range{minimum_price{regular_price{value currency}final_price{value currency} fixed_product_taxes{label amount{value currency}}}}}}}`

    return query();
}