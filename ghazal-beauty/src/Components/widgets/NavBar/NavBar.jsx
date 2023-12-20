import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosInstance";

export function NavBar() {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const subcategoriesResponse = await api.get("/subcategories");
        setSubCategories(subcategoriesResponse.data.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    getSubCategories();
  }, []);

  const handleSubcategoryClick = (subgroupId) => {
    navigate(`/products/subgroup/${subgroupId}`);
  };

  return (
    <div className="navbar">
      <ul className="vertical-flex justify-center gap-10">
        {subCategories.map((subcat) => (
          <li
            className="cursor-pointer font-semibold hover:text-purple-500 duration-300"
            key={subcat._id}
            onClick={() => handleSubcategoryClick(subcat._id)}
          >
            {subcat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
