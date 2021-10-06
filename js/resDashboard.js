const navbar = () => {
    const shopNameNav = document.getElementById('shopNameNav');
    auth.onAuthStateChanged((res) => {
        let docRef = db.collection("resturant").doc(res.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const shopname = doc.data().name; namehalf = shopname.substring(0, 14)
                shopNameNav.innerHTML = `${namehalf}....`;
            } else { console.log("No such document!"); }
        }).catch((error) => { console.log("Error getting document:", error); alert(error) });
    })
}


let loader = document.getElementById('loader');

const pendingtab = () => {
    loader.style.display = "block"

    let pending = document.getElementById('pending');

    auth.onAuthStateChanged((res) => {
        db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Pending")
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    pending.innerHTML = `<h3 class="text-center pt-4">No PendingOrder Yet, Add Exiciting Deals For More Sells</h3>`;
                    loader.style.display = "none";
                }
                else {
                    var orders = [];
                    querySnapshot.forEach((doc) => {
                        orders.unshift(`<div>${doc.data().items}</div>` +
                            `<b>Total: ${doc.data().total}</b>` +
                            `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" +
                        <div><br></div>` +
                            `<div class="pt-2 orderPerDet"><u><b class="">Order Person Detail</b></u></div>` +
                            `<div class="row pt-2"><div class="col-md-4"><b>Name:</b> ${doc.data().customerName}</div><div class="col-md-4"><b>Phone #:</b> ${doc.data().customerPhone}</div><div class="col-md-4"><b>Date:</b> ${doc.data().dateandtime}</div></div>` +
                            `<div class="pt-1"><b>Address:</b> ${doc.data().customerAddress}</div>` +
                            `<div><button class="btn btn-success no-radius" onclick="accept(${doc.data().orderid})">Accept</button> <button class="btn btn-danger no-radius" onclick="reject(${doc.data().orderid})">Reject</button></div><hr>`);
                    });
                    pending.innerHTML = orders.join(" ");
                    loader.style.display = "none"
                }
            });
    })
}

const acceptedtab = () => {
    let accepted = document.getElementById('accepted');

    auth.onAuthStateChanged((res) => {
        db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Accept")
            .onSnapshot((querySnapshot) => {
                var orders = [];
                querySnapshot.forEach((doc) => {
                    orders.unshift(`<div>${doc.data().items}</div>` +
                        `<b>Total: ${doc.data().total}</b>` +
                        `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" +
                        <div><br></div>` +
                        `<div class="pt-2 orderPerDet"><u><b class="">Order Person Detail</b></u></div>` +
                        `<div class="row pt-2"><div class="col-md-4"><b>Name:</b> ${doc.data().customerName}</div><div class="col-md-4"><b>Phone #:</b> ${doc.data().customerPhone}</div><div class="col-md-4"><b>Date:</b> ${doc.data().dateandtime}</div></div>` +
                        `<div class="pt-1"><b>Address:</b> ${doc.data().customerAddress}</div>` +
                        `<div><button class="btn btn-success no-radius" onclick="deliver(${doc.data().orderid})">Deliver</button><hr>`);
                });
                accepted.innerHTML = orders.join(" ")
            });
    })
}

const deliveredtab = () => {
    let delivered = document.getElementById('delivered');

    auth.onAuthStateChanged((res) => {
        db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Deliver")
            .onSnapshot((querySnapshot) => {
                var orders = [];
                querySnapshot.forEach((doc) => {
                    orders.unshift(`<div>${doc.data().items}</div>` +
                        `<b>Total: ${doc.data().total} </b>` +
                        `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" + 
                    <div><br></div>`+
                        `<div class="pt-2 orderPerDet"><u><b class="">Order Person Detail</b></u></div>` +
                        `<div class="row pt-2"><div class="col-md-4"><b>Name:</b> ${doc.data().customerName}</div><div class="col-md-4"><b>Phone #:</b> ${doc.data().customerPhone}</div><div class="col-md-4"><b>Date:</b> ${doc.data().dateandtime}</div></div>` +
                        `<div class="pt-1"><b>Address:</b> ${doc.data().customerAddress}</div><hr>`);
                });
                // console.log(orders);
                delivered.innerHTML = orders.join(" ")
            });
    })
}

const rejectedtab = () => {
    let rejected = document.getElementById('rejected');

    auth.onAuthStateChanged((res) => {
        db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Reject")
            .onSnapshot((querySnapshot) => {
                var orders = [];
                querySnapshot.forEach((doc) => {
                    orders.unshift(`<div>${doc.data().items}</div>` +
                        `<b>Total: ${doc.data().total} </b>` +
                        `<div class="pt-2 orderPerDet"><u><b class="">Order Person Detail</b></u></div>` +
                        `<div class="row pt-2"><div class="col-md-4"><b>Name:</b> ${doc.data().customerName}</div><div class="col-md-4"><b>Phone #:</b> ${doc.data().customerPhone}</div><div class="col-md-4"><b>Date:</b> ${doc.data().dateandtime}</div></div>` +
                        `<div class="pt-1"><b>Address:</b> ${doc.data().customerAddress}</div><hr>`);
                });
                rejected.innerHTML = orders.join(" ")
            });
    })
}

// Buttons Function

// //! Accept k lye button
const accept = (orderid) => {
    var washingtonRef = db.collection("orders").doc(`${orderid}`);
    return washingtonRef.update({
        watch: "Accept"
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
        alert(error);
    });
}

const reject = (orderid) => {
    var washingtonRef = db.collection("orders").doc(`${orderid}`);
    return washingtonRef.update({
        watch: "Reject"
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
        alert(error);
    });
}


const deliver = (orderid) => {
    var washingtonRef = db.collection("orders").doc(`${orderid}`);
    return washingtonRef.update({
        watch: "Deliver"
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
        alert(error);
    });
}


