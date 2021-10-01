let cartitem = document.getElementById('cartitem');
let loader = document.getElementById('loader');
let id = localStorage.getItem("resid");

let resName = document.getElementById('resName'), mainResName = document.getElementById('mainResName'), allResItems = document.getElementById('allResItems'), deliverycharges = document.getElementById('deliverycharges'); deal = document.getElementById('deal'); mainHeaderImage = document.getElementById('mainHeaderImage');
const showResAllItems = () => {
    loader.style.display = "block";
    let items = '';

    resturantData();
    disableCheckout();
    // FOr Getting Resturant Items
    db.collection("items").where("key", "==", id).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            allResItems.innerHTML = `<h2 class="text-center">No Items Added By Resturant</h2>`;
            loader.style.display = "none";
        } else {
            querySnapshot.forEach((doc) => {
                items += `<div id="w${doc.id}" onclick="addcartitem(${doc.id}); cart(${doc.id});" class="box-item pt-3">
                            <div class="Item-nameNimage">
                                <div class="itemname">
                                    <p><b>${doc.data().itemname}</b><br>${doc.data().itemcategory}</p>
                                    <p>Rs: ${doc.data().itemprice}</p>
                                </div>
                                <div class="itemimage">
                                    <img class="rounded-circle" src="${doc.data().imageurl}" width="70px" height="70px" alt="">
                                    <div class="plus-item"><i class="bi bi-plus-square-fill"></i></div>
                                </div>
                            </div>
                        </div>`
                allResItems.innerHTML = items;
                loader.style.display = "none"
            });
        }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
        alert(error)
    });
}

const resturantData = () => {
    // FOr Getting Resturant Data
    db.collection("resturant").where("restaurantkey", "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            resName.innerHTML = `${doc.data().name} Restaurant Items`
            mainResName.innerHTML = `${doc.data().name}`
            deal.innerHTML = `${doc.data().deal}`
            deliverycharges.innerHTML = `${doc.data().deliverycharges}`
            mainHeaderImage.src = `${doc.data().imageurl}`
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });

    let x = cartitem.getElementsByTagName("div").length;
    if (x == 0) {
        cartitem.style.display = "none"
    } else {
        cartitem.style.display = "block"
    }
}

const addcartitem = (itemid) => {
    let html = '';
    cartitem.style.display = "block"

    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            html += `<div id="removeThisItem">
                        <div class="d-f-j-b pt-3" >
                            <div class="cartItemname" id="cartitemnameid">${doc.data().itemname}</div>
                            <div class="cartPrice text-muted">Rs ${doc.data().itemprice}</div>
                        </div>
                        <div class="d-f-j-b pt-2" style="cursor: pointer;">
                            <div class="text-end">Quatity: 1</div> 
                            <div onclick="removefromCart(${doc.data().itemprice})"><i class="bi bi-trash"></i></div>
                        </div>
                    </div>`

            cartitem.innerHTML += html;
        });
    disableCheckout();
    let itemforchange = document.getElementById(`w${itemid}`);

}


const cart = (itemid) => {
    loader.style.display = "block";
    let subtotalPrice = document.getElementById('subtotalPrice');
    let totalprice = document.getElementById('totalprice');
    let subnum = Number(subtotalPrice.textContent);
    let totnum = Number(totalprice.textContent);
    let yourcart = document.getElementById('yourcart');
    let yourcartsubtext = document.getElementById('yourcartsubtext');
    let checkoutbtn = document.getElementById('checkoutbtn');

    let id = localStorage.getItem("resid");
    db.collection("resturant").doc(id).onSnapshot((res) => {
        yourcart.innerHTML = `Your order from ${res.data().name}`
        yourcartsubtext.innerHTML = ""
        db.collection("items").doc(`${itemid}`).onSnapshot((doc) => {
            let itemprice = Number(doc.data().itemprice);
            let delch = Number(res.data().deliverycharges);

            subtotalPrice.innerHTML = (subnum + itemprice);
            totalprice.innerHTML = (totnum + itemprice);
            loader.style.display = "none"
        });
    })
    checkoutbtn.disabled = false;
}


const removefromCart = (price) => {
    let subtotalPrice = document.getElementById('subtotalPrice');
    let totalprice = document.getElementById('totalprice');
    let subnum = Number(subtotalPrice.textContent);
    let totnum = Number(totalprice.textContent);

    subtotalPrice.innerHTML = (subnum - price);
    totalprice.innerHTML = (totnum - price)

    let removeThisItem = document.getElementById('removeThisItem');
    removeThisItem.remove();
    disableCheckout();
}


const disableCheckout = () => {
    let totnum = Number(totalprice.textContent);
    let checkoutbtn = document.getElementById('checkoutbtn');
    if (totnum == 0) {
        checkoutbtn.disabled = true;
    } else if (totnum !== 0) {
        checkoutbtn.disabled = false;
    }
}

const orderPlace = () => {
    loader.style.display = "block"
    let totalprice = document.getElementById('totalprice');
    let subtotalPrice = document.getElementById('subtotalPrice');
    let totnum = Number(totalprice.textContent);
    // let removeThisItem = document.getElementById('removeThisItem');
    // let cartitemnameid = document.getElementById('cartitemnameid');

    // let x = cartitem.getElementsByClassName("cartItemname");
    auth.onAuthStateChanged((user) => {
        let date = new Date(); time = date.getTime();
        db.collection("orders").doc(`${time}`).set({
            total: totnum,
            items: cartitem.innerText,
            resturantid: id,
            orderid: time,
            watch: "Pending",
            userid: user.uid,
        }).then(() => {
            console.log("Document successfully written!");
            totalprice.innerHTML = 0; subtotalPrice.innerHTML = 0;
            while (cartitem.hasChildNodes()) {
                cartitem.removeChild(cartitem.firstChild);
            }
            loader.style.display = "none";
            // alert('order Placed Successfully');
            disableCheckout()
        }).catch((error) => {
            console.error("Error writing document: ", error);
            loader.style.display = "none";
        });
    })
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