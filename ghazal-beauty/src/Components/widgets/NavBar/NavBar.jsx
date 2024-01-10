import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

export function NavBar() {
  const navigate = useNavigate();

  //GET SUBCATEGORIES
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useQuery({
      queryKey: ["subcategories"],
      queryFn: async () => {
        const response = await api.get("/subcategories");
        return response.data.data.subcategories;
      },
    });

  const handleSubcategoryClick = (subgroupId) => {
    navigate(`/products/subgroup/${subgroupId}`);
  };

  if (subCategoriesLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  } else {
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
}
