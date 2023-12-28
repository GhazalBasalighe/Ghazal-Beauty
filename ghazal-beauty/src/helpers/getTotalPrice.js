function getTotalPrice(products) {
  return products.reduce((total, product) => {
    return total + product.count * product.price;
  }, 0);
}

export default getTotalPrice;
