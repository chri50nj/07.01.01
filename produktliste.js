//https://kea-alt-del.dk/t7/api/products/

const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams", urlParams);

const cat = urlParams.get("cat");
console.log("cat", cat);
const url = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

// 1. hente data
async function getData() {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  // 2. loope // 3. for hver
  data.forEach(showProduct);
}
getData();

function showProduct(product) {
  console.log(product);
  // 4. fange vores template
  const template = document.querySelector("#smallProductTemplate").content;
  // 5. clone
  const copy = template.cloneNode(true);
  // 6. skifte data
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector("#pris").textContent = product.price;
  copy.querySelector("#mærke").textContent = product.brandname;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector(".discounted p").textContent = `DKK ${Math.round(product.price - product.price * (product.discount / 100))} ,-`;
  copy.querySelector(".discounted p+p").textContent = `${product.discount}%`;
  copy.querySelector("a").href = "produkt.html?id=" + product.id;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
  }
  // 7. appende (tilføje de til DOM)
  document.querySelector("main").appendChild(copy);
}
