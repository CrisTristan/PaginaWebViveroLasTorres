const carrito = [];
let carroFinal = [];
const productsArr = []; //Productos de la tienda

const btnCarrito = document.getElementById("btn-carrito");
const modal = document.querySelector("#modal");
const cerrarModal = document.querySelector("#btn-cerrar-modal");
const openModal = document.querySelector("#btn-open-modal");
const btnRegistro = document.querySelector(".submitBtn");
const colors = document.querySelectorAll(".colors");
const ulColores = document.querySelector(".ul-colores");
const btnAdquirir = document.querySelectorAll(".btn-adquirir");

let total = 0;
let clicks = 0;
let totalProducts = 0;

let colorMaceta = "normal";

const client = {
  name: "",
  phone_number: "",
  address: "",
  products: [],
};

const addCarrito = (idProduct) => {
  productsArr.forEach((element) => {
    if (element._id === idProduct) {
      totalProducts++;
      alert(element.name + " añadido al carrito");
      total += element.price;
      carrito.push(element);
      element.color = colorMaceta;
    }
  });
  btnCarrito.innerHTML = `${totalProducts}<img src="./images/carritoCompra.svg" class="img-carrito"></img>`;
  colorMaceta = "normal";
  repeatedProduct();
};

const repeatedProduct = () => {
  repeated = false;
  count = 1;
  for (var i = 0; i < carrito.length; i++) {
    for (var j = 0; j < carrito.length; j++) {
      if (carrito[i] === carrito[j] && i != j) {
        //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
        repeated = true;
        count++;
      }
    }
    if (repeated) {
      carrito[i].quantity = count;
      count = 1;
      repeated = false;
    } else {
      carrito[i].quantity = 1;
    }
  }
};

const deleteRepeatProduct = () => {
  for (var i = 0; i < carrito.length; i++) {
    for (var j = 0; j < carrito.length; j++) {
      if (carrito[i] === carrito[j] && i != j) {
        carrito.splice(j, 1);
      }
    }
  }
  return carrito;
};

const getProducts = async () => {
  const products = await (await fetch("http://localhost:4000/products")).json();
  /*
    .then(res => res.json()) //esta linea convierte respuesta en un JSON
    .then(json => console.log(json)) //esta linea imprime los productos
    .catch(err => console.log(err));
    */
  products.forEach((element) => {
    productsArr.push(element);
  });
  setProducts();
};

const setProducts = () => {
  const divPrices = document.querySelectorAll(".price__price");
  const pNames = document.querySelectorAll(".price__name");

  for (let index = 0; index < productsArr.length; index++) {
    pNames[index].innerHTML = productsArr[index].name;
    divPrices[index].innerHTML = "$ " + productsArr[index].price;
  }
};

btnCarrito.addEventListener("click", async () => {
  if (carrito.length === 0) {
    alert("Usted no tiene productos en el carrito");
  } else {
    if ((client.name && client.phone_number && client.address) === "") {
      modal.showModal();
    } else {
      localStorage.setItem("Cliente", JSON.stringify(client));
      localStorage.setItem("Total", "" + total);
      window.location.href = "http://127.0.0.1:5500/secondary.html";
    }
  }
});

const showFeatures = (id) => {

  const features = document.getElementsByClassName("price__items"); //obtenemos todos los div con clase price__items

  features[id - 1].classList.toggle('show')

  btnAdquirir[id-1].id = 'blanco';
  btnAdquirir[id-1].style = 'color: black';

};

cerrarModal.addEventListener("click", () => {
  modal.close();
});

btnRegistro.addEventListener("click", () => {
  carroFinal = deleteRepeatProduct();
  const input = document.querySelectorAll("#input");
  client.name = input[0].value;
  client.phone_number = input[1].value;
  client.address = input[2].value;
  client.products = carroFinal;
  fetch("http://localhost:4000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((data) => {
      console.log(data);
      alert("Sus datos han sido registrados correctamente");
    })
    .catch((err) => console.log("Ocurrio un error " + err));
  modal.close();
});

colors.forEach((color) => {
  color.addEventListener("click", () => {
    colorMaceta = color.id;

    console.log(colorMaceta);
    for (let index = 0; index < btnAdquirir.length; index++) {
      btnAdquirir[index].id = `${color.id}`;
      if (color.id === "negro") {
        btnAdquirir[index].style.color = "white";
      } else if (color.id === "blanco") {
        btnAdquirir[index].style.color = "black";
      }
    }
  });
});
getProducts();
