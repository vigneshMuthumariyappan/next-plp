"use client";
import './slidbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, addFilter, clearFilter, removeFilter} from '@store';
import { useThunk } from '@hooks/handle-thunks';
import { IoMdClose } from "react-icons/io";

const Slidbar = ({id, filteredArray}) => {
    const dispatch = useDispatch();
    const [getCategory, isLoading, categoryError] = useThunk(fetchCategory);
    const {getAttributes, total_count} = useSelector((state) => {
        if (!state.category.category.data) return {getAttributes:[],total_count:null};
        return {getAttributes: state.category.category.data.products.aggregations, 
            total_count: state.category.category.data.products.total_count};
    });

    const handleFilterClick = (attributeCode, value, label, option_lable) => {
        dispatch(addFilter({attribute_code: attributeCode, value: value, label: label, option_lable: option_lable}))
        getCategory({'id': id, filteredArray: [...filteredArray, {attribute_code: attributeCode, value: value, label: label, option_lable: option_lable}], currentPage: 1});
    }
    const handleFilterRemover = (attributeCode) => {
        dispatch(removeFilter(attributeCode))
    }
    return (
        <div className="slidbar">
            {filteredArray.length !== 0 && 
                <div className="isfiltered">
                    <p className='filter-header'>Applied filters</p>
                    <div className="attribute-filter-box">
                        {filteredArray.map((attribute) => {
                            return <p>{attribute.label} - {attribute.option_lable} -- <span className='inline-block cursor-pointer' onClick={() => handleFilterRemover(attribute.attribute_code)}><IoMdClose/></span></p>
                        })}
                    </div>
                    <button onClick={() => dispatch(clearFilter())}>{`close`}</button>
                </div>
            }
            {isLoading && <span className='text-center'>Loading...</span>}
            {getAttributes && getAttributes.map((attribute) => {
                let isAttributeFilter = false
                filteredArray.map((attri) => {
                    if (attribute.attribute_code === attri.attribute_code) {
                        isAttributeFilter = true
                        return;
                    } 
                })
                if (isAttributeFilter) return;
                let isFlag = false;
                {attribute.options.map((option) => {
                    if (option.count != total_count) isFlag = true;
                })}
                if (!isFlag) return;

                return (
                    <div className={isLoading && !categoryError?"attribute-box hidden": 'attribute-box'}>
                        <h3>{attribute.label}</h3>
                        {attribute.options && <ul className='flex list-none flex-wrap'>
                            {attribute.options.map((option) => {
                                if (option.count === total_count) return;
                                return <button onClick={() => handleFilterClick(attribute.attribute_code, option.value, attribute.label, option.label)} className='block text-sm filter-button' key={option.value}>{option.label} - {`(${option.count})`}</button>
                            })}
                        </ul>}
                    </div>
                );
            })}
            {total_count === 1 && <span>Only one product available</span>}
            {categoryError && <span>Oops... Something went wrong.</span>}
        </div>
    )
}

export default Slidbar