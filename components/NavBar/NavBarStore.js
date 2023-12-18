"use client";

import { useThunk } from "@hooks/handle-thunks";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, fetchCategories } from "@store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Dropdown from "@components/Dropdown/Dropdown";
import { useRouter } from 'next/navigation'

const NavBarStore = () => {
    const [fetchData, isLoading, categoryDataError] = useThunk(fetchCategories);
    const router = useRouter();
    const [search, setSearch] = useState('');

    const { data } = useSelector((state) => {
        return state.categories;
    });
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const dispatch = useDispatch();
    const handleClickRemove = () => {
        dispatch(clearFilter());
    }
    const handleSearch = () => {
        router.push(`/catalog/searchresult/?q=${search}`);
        setSearch('');
    }
    return (
        <nav className="bg-dark text-white w-100 h-auto flex">
            <p className="text-2xl m-3">
            <a href={process.env.MAGENTO_DOMAIN}>Magento</a>
            </p>
            {/* Check the data exist */}
            {data.children_data && data.children_data.length !== 0 && 
                <ul className="flex m-3 w-100 align-items-center">
                    {data.children_data.map((category => {
                        return (
                            <li key={category.id} className="ps-4 menu" onClick={() => handleClickRemove()}>
                                <Link href={`/catalog/category/${category.id}`}>{category.name}</Link>
                                {category.children_data && category.children_data.length !== 0 &&
                                    <Dropdown category={category} />
                                }
                            </li>
                        );
                    }))}
                </ul>
            }
            <form className="d-flex p-2 rounded-sm" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Search"
                    className="me-2 p-1 text-black"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="outline-success" onClick={() => handleSearch()} type="button">Search</button>
          </form>
        </nav>
    );
};

export default NavBarStore;
