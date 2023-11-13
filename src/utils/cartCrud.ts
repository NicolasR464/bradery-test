import { CartItem } from "./interfaces";

export async function postCart(product: CartItem) {
  const config = {
    method: "POST",
    body: JSON.stringify(product),
  };

  try {
    const data = await fetch("/api/cart", config);

    if (data.status === 200 || data.status === 201) {
      const dataParsed = await data.json();
      console.log(dataParsed);
      return dataParsed;
    } else {
      // console.error("something went wrong");
      return 500;
    }
  } catch (err) {
    console.log("❌ in cart crud");
    console.log(err);
    return 500;
  }
}

export async function deleteProduct(productId: number, cartId: number) {
  const config = {
    method: "DELETE",
  };
  try {
    const response = await fetch(
      `/api/cart/${productId}?cart-id=${cartId}`,
      config
    );
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
    return 500;
  }
}
