export async function postCart(product: any) {
  const config = {
    method: "POST",
    body: JSON.stringify(product),
  };

  try {
    const data = await fetch("/api/cart", config);

    if (data.status === 200 || data.status === 201) {
      const datalParsed = await data.json();
      // console.log(datalParsed);
      return datalParsed;
    } else {
      // console.error("something went wrong");
      return 500;
    }
  } catch (err) {
    console.log(err);
    return 500;
  }
}
