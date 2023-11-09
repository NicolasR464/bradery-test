export async function postCart(product: any) {
  console.log("postCart 🚀");

  const config = {
    method: "POST",
    body: JSON.stringify(product),
  };

  try {
    const data = await fetch("/api/cart", config);

    const datalParsed = await data.json();

    if (datalParsed.status == 200) {
      console.log(datalParsed);
    } else {
      console.error("something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
}
