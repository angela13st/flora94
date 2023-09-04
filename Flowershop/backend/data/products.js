const products = [
  

];


products.forEach((product) => {
  const title = product.name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  product.title = title;
});

export default products;
