async function getProducts(){
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json();
    if(!response.ok){
        throw new Error("failed to fetch products")
    
    }
    return data;

}
export default getProducts;