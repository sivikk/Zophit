document.addEentListener("DOMContentLoaded", () => {
    const cartBtn = document.querySelector(".cartbtn");
    const closeCartBtn = document.querySelector(".closecart");
    const clearCartBtn = document.querySelector(".clearcart");
    const cartOerlay = document.querySelector(".cartoerlay");
    const cartItems = document.querySelector(".cartitems");
    const cartTotal = document.querySelector(".carttotal");
    const cartContent = document.querySelector(".cartcontent");
    const productsDOM = document.querySelector(".productscenter");

    // Cart
    let cart = [];

    // Getting the products
    class Products {
        async getProducts() {
            try {
                let result = await fetch("products.json");
                let data = await result.json();
                let products = data.items.map(item => {
                    const { title, price } = item.fields;
                    const { id } = item.sys;
                    const image = `images/product${id}.jpg`;
                    return { id, title, price, image };
                });
                return products;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // UI
    class UI {
        displayProducts(products) {
            let result = "";
            products.forEach(product => {
                result += `
                <article class="product">
                    <di class="imgcontainer">
                        <img src="${product.image}" alt="${product.title}" class="productimg">
                        <button class="bagbtn" dataid="${product.id}">
                            <i class="fas fashoppingcart"></i>
                            add to cart
                        </button>
                    </di> 
                    <h3>${product.title}</h3>
                    <h4>$${product.price}</h4>
                </article>`;
            });
            productsDOM.innerHTML = result;
        }
    }

    // Initialize
    document.addEentListener("DOMContentLoaded", () => {
        const ui = new UI();
        const products = new Products();

        // Get all products
        products.getProducts()
            .then(products => {
                ui.displayProducts(products);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    });
});
