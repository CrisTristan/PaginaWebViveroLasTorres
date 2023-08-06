const table = document.querySelector('#table');
const {products}=JSON.parse(localStorage.getItem("Cliente"));
const btnPay = document.querySelector('#btn-pay');
const total = localStorage.getItem("Total");
const note = document.querySelector('#note');

const mostrarTabla = ()=>{

   
   for (let i = 0; i < products.length; i++) {
      const tableRow =document.createElement("tr");
      tableRow.innerHTML = `<td>${products[i].name}</td><td>$ ${products[i].price}</td><td>${products[i].name === '4 Bolsa Tierra'? 4 : products[i].quantity}</td><td>${products[i].price*products[i].quantity}</td>`
      table.insertAdjacentElement('beforeend', tableRow); 
   }
   const tableRowTotal =document.createElement("tr");
      tableRowTotal.innerHTML = `<td></td><td></td><td>Total</td><td>$${total}</td>`
      table.insertAdjacentElement('beforeend', tableRowTotal);

      total < 500 ? note.innerHTML='Se requiere un minimo de $ 500 en Productos Para proceder con el Pago' : '';
}

const pay = async()=>{
   if(total >= 500){
   const response = await fetch("http://localhost:4000/create-order", {
       method: 'POST',
       body: JSON.stringify(products),
       headers: {
           "Content-Type": "Application/json"     
       }    
   });
   const data = await response.json();
   console.log(data);
   window.location.href = data.init_point;
   }else{
      alert("Se requiere un minimo de 500 pesos en productos para proceder con el pago");
   }
}

mostrarTabla();