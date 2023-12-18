import Link from "next/link";
const Dropdownright = ({category}) => {
  return (
    <div className="sub-menu-1">
      <ul>
        {category.children_data.map((category) => {
          return (
            <li key={category.id}>
              <Link href={`/catalog/category/${category.id}`}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdownright;
