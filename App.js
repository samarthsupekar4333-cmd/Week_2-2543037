const API = "http://localhost:5000/products";

// CREATE & UPDATE
window.saveProduct = function () {
    const id = document.getElementById("productId").value;

    const product = {
        id: id || generateId(),
        name: document.getElementById("name").value,
        quantity: Number(document.getElementById("qty").value),
        price: Number(document.getElementById("price").value)
    };

    if (id) {
        // UPDATE
        axios.put(`${API}/${id}`, product)
            .then(loadProducts);
    } else {
        // CREATE
        axios.post(API, product)
            .then(loadProducts);
    }

    clearForm();
};

// READ
function loadProducts() {
    axios.get(API)
        .then(res => {
            let rows = "";
            res.data.forEach(p => {
                rows += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.quantity}</td>
                    <td>${p.price}</td>
                    <td>
                        <button onclick="editProduct('${p.id}')">Edit</button>
                        <button onclick="deleteProduct('${p.id}')">Delete</button>
                    </td>
                </tr>`;
            });
            document.getElementById("productTable").innerHTML = rows;
        });
}

// EDIT
window.editProduct = function (id) {
    axios.get(`${API}/${id}`)
        .then(res => {
            document.getElementById("productId").value = res.data.id;
            document.getElementById("name").value = res.data.name;
            document.getElementById("qty").value = res.data.quantity;
            document.getElementById("price").value = res.data.price;
        });
};

// DELETE
window.deleteProduct = function (id) {
    if (!confirm("Delete this product?")) return;

    axios.delete(`${API}/${id}`)
        .then(loadProducts);
};

// CLEAR FORM
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("price").value = "";
}

// SIMPLE STRING ID GENERATOR
function generateId() {
    return Math.random().toString(36).substr(2, 4);
}

// LOAD DATA ON PAGE LOAD
document.addEventListener("DOMContentLoaded", loadProducts);
