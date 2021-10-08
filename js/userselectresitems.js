let cartitem = document.getElementById('cartitem');
let modalCart = document.getElementById('modalCart');
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
    let htmltwo = '';
    cartitem.style.display = "block"

    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            html += `<div id="rr${itemid}">
                        <div class="d-f-j-b pt-3" >
                            <div class="cartItemname" id="cartitemnameid">${doc.data().itemname}</div>
                            <div class="cartPrice text-muted">Rs ${doc.data().itemprice}</div>
                        </div>
                        <div class="d-f-j-b pt-2" style="cursor: pointer;">
                            <div class="text-end">Quatity: 1</div> 
                            <div onclick="removefromCart(${doc.data().itemprice}, ${itemid})"><i class="bi bi-trash"></i></div>
                        </div>
                    </div>`

            cartitem.innerHTML += html;
        });

    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            htmltwo += `<div id="rrm${itemid}">
                        <div class="d-f-j-b pt-3" >
                            <div class="cartItemname" id="cartitemnameid">${doc.data().itemname}</div>
                            <div class="cartPrice text-muted">Rs ${doc.data().itemprice}</div>
                        </div>
                        <div class="d-f-j-b pt-2" style="cursor: pointer;">
                            <div class="text-end">Quatity: 1</div> 
                            <div onclick="removefromCart(${doc.data().itemprice}, ${itemid})"><i class="bi bi-trash"></i></div>
                        </div>
                    </div>`

            modalCart.innerHTML += htmltwo;
        });
    disableCheckout();
    let itemforchange = document.getElementById(`w${itemid}`);

}


const cart = (itemid) => {
    loader.style.display = "block";
    let subtotalPrice = document.getElementById('subtotalPrice');
    let totalprice = document.getElementById('totalprice');
    let modalTotalPrice = document.getElementById('modalTotalPrice');
    let subnum = Number(subtotalPrice.textContent);
    let totnum = Number(totalprice.textContent);
    let modtotNum = Number(modalTotalPrice.textContent);
    let yourcart = document.getElementById('yourcart');
    let yourcartsubtext = document.getElementById('yourcartsubtext');
    let checkoutbtn = document.getElementById('checkoutbtn');
    let checkoutbtnmodal = document.getElementById('checkoutbtnmodal');
    let placeorder = document.getElementById('placeorder');


    let id = localStorage.getItem("resid");
    db.collection("resturant").doc(id).onSnapshot((res) => {
        yourcart.innerHTML = `Your order from ${res.data().name}`
        yourcartsubtext.innerHTML = ""
        db.collection("items").doc(`${itemid}`).onSnapshot((doc) => {
            let itemprice = Number(doc.data().itemprice);
            let delch = Number(res.data().deliverycharges);

            subtotalPrice.innerHTML = (subnum + itemprice);
            totalprice.innerHTML = (totnum + itemprice);
            modalTotalPrice.innerHTML = (modtotNum + itemprice)
            loader.style.display = "none"
        });
    })
    checkoutbtn.disabled = false;
    checkoutbtnmodal.disabled = false;
    placeorder.disabled = false;
}


const removefromCart = (price, itemid) => {
    let subtotalPrice = document.getElementById('subtotalPrice');
    let totalprice = document.getElementById('totalprice');
    let modalTotalPrice = document.getElementById('modalTotalPrice');
    let subnum = Number(subtotalPrice.textContent);
    let totnum = Number(totalprice.textContent);
    let modtotNum = Number(modalTotalPrice.textContent);

    subtotalPrice.innerHTML = (subnum - price);
    totalprice.innerHTML = (totnum - price);
    modalTotalPrice.innerHTML = (modtotNum - price)

    let rrm = document.getElementById(`rrm${itemid}`);
    rrm.remove();
    let rr = document.getElementById(`rr${itemid}`)
    rr.remove();

    disableCheckout();
}


const disableCheckout = () => {
    let totnum = Number(totalprice.textContent);
    let checkoutbtn = document.getElementById('checkoutbtn');
    let checkoutbtnmodal = document.getElementById('checkoutbtnmodal');
    let placeorder = document.getElementById('placeorder');
    if (totnum <= 0) {
        checkoutbtn.disabled = true;
        checkoutbtnmodal.disabled = true;
        placeorder.disabled = true;
    } else if (totnum > 0) {
        checkoutbtn.disabled = false;
        checkoutbtnmodal.disabled = false;
        placeorder.disabled = false;
    }
}

const checkOut = () => {
    let totalprice = document.getElementById('totalprice');
    let totalWithDelivery = document.getElementById('totalWithDelivery');

    let totnum = Number(totalprice.textContent);
    let delevirynum = Number(deliverycharges.textContent)
    let totCharges = (totnum + delevirynum);

    totalWithDelivery.innerHTML = `Total: ${totCharges}`;
}

////! Geo Location

const getCord = () => {
    console.log("ameen");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

const showPosition = (position) => {
    console.log(position);
    let lat = position.coords.latitude,
        long = position.coords.longitude;
    // coords = lat + ', ' + long;
    orderPlace(lat, long);
}

const showError = (error) => {
    if (error.code == error.PERMISSION_DENIED) {
        console.log(error.message);
        swal("Order Not Place", "Please allow Location to continue", "error");
    } else if (error.code == error.POSITION_UNAVAILABLE) {
        swal("Order Not Place", "Position Unavailable", "error");
    }
}
////! --------------------------------

const orderPlace = (lat, long) => {
    loader.style.display = "block"
    let totalprice = document.getElementById('totalprice');
    let subtotalPrice = document.getElementById('subtotalPrice');
    let deliverycharges = document.getElementById('deliverycharges');

    let userOrderName = document.getElementById('userOrderName').value;
    let userOrderNum = document.getElementById('userOrderNum').value;
    let userOrderDeliveradd = document.getElementById('userOrderDeliveradd').value;
    let orderPayment = document.getElementById('orderPayment').value;

    let totnum = Number(totalprice.textContent);
    let delevirynum = Number(deliverycharges.textContent)

    let totCharges = (totnum + delevirynum);
    console.log(totnum);
    console.log(totCharges);

    let date = new Date();
    let placeorderdate = (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
    let placeordertime = (date.getHours() + " : " + date.getMinutes());

    if ((userOrderName && userOrderNum && userOrderDeliveradd && orderPayment).length !== 0) {
        console.log("not Empty");
        auth.onAuthStateChanged((user) => {
            time = date.getTime();
            db.collection("orders").doc(`${time}`).set({
                customerName: userOrderName,
                customerPhone: userOrderNum,
                customerAddress: userOrderDeliveradd,
                customerPayment: orderPayment,
                total: totCharges,
                items: cartitem.innerText,
                date: placeorderdate,
                time: placeordertime,
                resturantid: id,
                orderid: time,
                watch: "Pending",
                userid: user.uid,
                latitude: lat,
                longitude: long,
            }).then(() => {
                console.log("Document successfully written!");
                totalprice.innerHTML = 0; subtotalPrice.innerHTML = 0;
                while (cartitem.hasChildNodes()) {
                    cartitem.removeChild(cartitem.firstChild);
                }
                while (modalCart.hasChildNodes()) {
                    modalCart.removeChild(modalCart.firstChild);
                }
                loader.style.display = "none";
                disableCheckout();
                swal("Your Order Placed! Click On basket to check your order status");
            }).catch((error) => {
                console.error("Error writing document: ", error);
                loader.style.display = "none";
            });
        })
    } else {
        console.log("Empty");
        loader.style.display = "none";
        swal("Please Fill All information correctly");
    }
}


// PHONE Number Authentication

// function render() {

//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     recaptchaVerifier.render()
// }

// function phoneauth() {
//     let userOrderNum = document.getElementById('userOrderNum').value;
//     console.log(userOrderNum);
//     auth.signInWithPhoneNumber(userOrderNum, window.recaptchaVerifier)
//         .then((confirmationResult) => {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             window.confirmationResult = confirmationResult;
//             console.log(confirmationResult);
//             // ...
//         }).catch((error) => {
//             // Error; SMS not sent
//             console.log(error);
//             // ...
//         });
// }

// function verify() {
//     let vericode = document.getElementById('vericode').value;
//     console.log(vericode);
//     confirmationResult.confirm(vericode).then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         console.log(user);
//         // ...
//     }).catch((error) => {
//         console.log(error);
//         // User couldn't sign in (bad verification code?)
//         // ...
//     });
// }

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