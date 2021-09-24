const showResAllItems = () => {
    var id = localStorage.getItem("resid");
    let resName = document.getElementById('resName'), mainResName = document.getElementById('mainResName'), allResItems = document.getElementById('allResItems'), deliverycharges = document.getElementById('deliverycharges'); deal = document.getElementById('deal');
    let items = '';
    // FOr Getting Resturant Data
    db.collection("resturant").where("restaurantkey", "==", id).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                resName.innerHTML = `${doc.data().name} Restaurant Items`
                mainResName.innerHTML = `${doc.data().name}`
                deal.innerHTML = `${doc.data().deal}`
                deliverycharges.innerHTML = `${doc.data().deliverycharges}`
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // FOr Getting Resturant Items
    db.collection("items").where("key", "==", id).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                items += `<div onclick="cart(${doc.id}); addcartitem(${doc.id});" class="box-item pt-3">
                            <div class="Item-nameNimage">
                                <div class="itemname">
                                    <p><b>${doc.data().itemname}</b><br>${doc.data().itemcategory}</p>
                                    <p>Rs: ${doc.data().itemprice}</p>
                                </div>
                                <div class="itemimage">
                                    <img src="./images/tikka.png" width="80px" alt="">
                                    <i class="bi bi-plus-square-fill plus-item"></i>
                                </div>
                            </div>
                        </div>`
                allResItems.innerHTML = items;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}

//todo: const deliverycharges

const cart = (itemid) => {
    let subtotalPrice = document.getElementById('subtotalPrice'); totalprice = document.getElementById('totalprice'); subnum = Number(subtotalPrice.textContent); totnum = Number(totalprice.textContent);
    let id = localStorage.getItem("resid");
    db.collection("resturant").doc(id)
        .onSnapshot((res) => {
            console.log(res.data());
            db.collection("items").doc(`${itemid}`)
                .onSnapshot((doc) => {
                    let itemprice = Number(doc.data().itemprice);
                    let delch = Number(res.data().deliverycharges);
                    // console.log("Current data: ", doc.data());
                    subtotalPrice.innerHTML = (subnum + itemprice);
                    totalprice.innerHTML = (totnum + itemprice + delch);
                    console.log(delch);
                });
        })
}


const addcartitem = (itemid) => {
    let cartitem = document.getElementById('cartitem');
    let html = ''
    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            html += `<div class="d-f-j-b pt-4">
                        <div class="cartItemname">${doc.data().itemname}</div>
                        <div class="cartPrice text-muted">Rs ${doc.data().itemprice}</div>
                    </div>
                        <div class="text-end">Quatity: 1</div> <hr>`
            cartitem.innerHTML += html;
        });
}

const checkout = () => {


}




////! Storage
// function upload() {

//     const ref = storage.ref('resturant');
//     let file = document.getElementById('photo').files[0], image = document.getElementById('image');
//     const date = new Date, name = date.getTime() + '-' + file.name

//     const metadata = {
//         contentType: file.type
//     }

//     const task = ref.child(name).put(file, metadata);

//     task.then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => { console.log(url); image.src = url; })
//         .catch((err) => { console.log(err); })


// }