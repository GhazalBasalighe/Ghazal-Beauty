import { useEffect, useState } from "react";
import api from "../../../config/axiosInstance";

export function NavBar() {
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const subcategoriesResponse = await api.get(
          "http://localhost:8000/api/subcategories"
        );
        setSubCategories(subcategoriesResponse.data.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    getSubCategories();
  }, []);
  return (
    <div className="navbar">
      <ul className="vertical-flex justify-center gap-10">
        {subCategories.map((subcat) => (
          <li
            className="cursor-pointer font-semibold hover:text-purple-500 duration-300"
            key={subcat._id}
          >
            {subcat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
