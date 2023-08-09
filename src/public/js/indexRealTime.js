const socket = io()
socket.on('realTime',(data)=>{
    const tableBody = document.querySelector('#table tbody');
    
    // Resetea la tabla
    tableBody.innerHTML = '';
    const table = document.getElementById("table")
    // Recorre el arreglo data
    data.forEach((dato) => {
    // Crea fila
    const newRow = document.createElement('tr');

    // Agrega el contenido a la celda td
    const idCell = document.createElement('td');
    idCell.textContent = dato.id;
    // Agrega idcell a newRow
    newRow.appendChild(idCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = dato.title;
    newRow.appendChild(titleCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = dato.description;
    newRow.appendChild(descriptionCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = dato.price;
    newRow.appendChild(priceCell);

    const thumbnailCell = document.createElement('td');
    thumbnailCell.textContent = dato.thumbnail;
    newRow.appendChild(thumbnailCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = dato.status;
    newRow.appendChild(statusCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = dato.category;
    newRow.appendChild(categoryCell);

    const codeCell = document.createElement('td');
    codeCell.textContent = dato.code;
    newRow.appendChild(codeCell);

    const stockCell = document.createElement('td');
    stockCell.textContent = dato.stock;
    newRow.appendChild(stockCell);
    // Agrega newRow completa a la tabla tableBody
    tableBody.appendChild(newRow);	
        
        });
})