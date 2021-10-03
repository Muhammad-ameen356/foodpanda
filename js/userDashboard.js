
let loader = document.getElementById('loader');

const statusTab = () => {
    loader.style.display = "block"

    let orderstatus = document.getElementById('orderstatus');

    auth.onAuthStateChanged((user) => {
        db.collection("orders").where("userid", "==", user.uid)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    orderstatus.innerHTML = `<h3 class="text-center pt-4">No Orders</h3>`;
                    loader.style.display = "none";
                }
                else {
                    var orders = [];
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        orders.unshift(`<div>${doc.data().items}</div>` + `<div><i>Status: ${doc.data().watch}</i></div>` + `<b>Total: ${doc.data().total}</b>` + `<hr>`);
                    });
                    orderstatus.innerHTML = orders.join(" ");
                    loader.style.display = "none"
                }
            });



    })
}


const ontheway = () => {
    loader.style.display = "block"

    let deliverd = document.getElementById('deliverd');

    auth.onAuthStateChanged((user) => {
        db.collection("orders").where("userid", "==", user.uid).where("watch", "==", "Deliver")
            .onSnapshot((querySnapshot) => {
                var orders = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    orders.unshift(`<div>${doc.data().items}</div>` + `<div><i>Status: ${doc.data().watch}</i></div>` + `<b>Total: ${doc.data().total}</b>` + `<hr>`);
                });
                deliverd.innerHTML = orders.join(" ");
                loader.style.display = "none"
            });



    })
}

