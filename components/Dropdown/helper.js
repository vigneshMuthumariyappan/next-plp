import Dropdownright from "@components/Dropdownright/Dropdownright";

export const callBackDropdown = (category) => {
    if (!category.children_data) return;
    return category.children_data.map((childCategory) => {
        if (childCategory.children_data && childCategory.children_data.length) {
            return callBackDropdown(childCategory.children_data);
        }
        return <Dropdownright category={category} />; // Handle other cases if needed
    });
};