import React from "react";
import Link from "next/link";
import Dropdownright from "@components/Dropdownright/Dropdownright";

const Dropdown = ({category}) => {
  return (
    <div className="sub-menu">
      <ul>
        {category.children_data.map((category) => {
            return (
                <li className="sub-menu-li" key={category.id}>
                    <Link href={`/catalog/category/${category.id}`}>
                        {category.name}
                    </Link>
                    {category.children_data &&
                        category.children_data.length !== 0 && (
                            <Dropdownright category={category} />
                        )}
                </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
