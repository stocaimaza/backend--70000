//Integramos MercadoPago del lado del cliente:

const mp = new MercadoPago("APP_USR-fd43f43d-0629-4107-92c9-cf0601b5a1bb", {
    locale: "es-AR"
}); 

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Pasamos los datos del producto: 
        const orderData = {
            title: "Patito", 
            quantity: 1, 
            price: 100
        }

        const response = await fetch("http://localhost:3000/create-preference", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(orderData) 
        })

        const preference = await response.json(); 
        createCheckoutButton(preference.id); 


    } catch (error) {
        alert("Error fatal, llovera toda la semana"); 
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks(); 

    const renderComponent = async () => {
        //Correccion para evitar que se dupliquen los botones: 
        if(window.checkoutButton) window.checkoutButton.unmount()
            //Si ya existe el boton, desmontalo del dom. 
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            },
        })
    }
    renderComponent(); 
}