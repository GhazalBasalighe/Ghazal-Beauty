import axios from "axios";
export const getInfoById = async (id, apiEndpoint) => {
  try {
    const name = await axios.get(
      `http://localhost:8000/api/${apiEndpoint}/${id}`
    );
    const response = name.data.data;
    // ---categories---
    if (apiEndpoint === "categories") return response.category.name;
    // ---subcategories---
    else if (apiEndpoint === "subcategories")
      return response.subcategory.name;
    // ---products---
    else if (apiEndpoint === "products") return response.product;
    // ---firstname/lastname---
    else
      return [response.user.firstname, response.user.lastname].join(" ");
  } catch (error) {
    return "مشکلی پیش آمده";
  }
};
