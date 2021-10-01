// // loader.style.display = "block"
// const pending = () => {
//     let pending = document.getElementById('pending');
//     let phtml = '';
//     auth.onAuthStateChanged((res) => {
//         db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "pending")
//             .onSnapshot((snapshot) => {
//                 snapshot.docChanges().forEach((change) => {
//                     // console.log(change.doc.data());
//                     phtml += `<div id="p${change.doc.data().orderid}">
//                                     <div>${change.doc.data().items}</div>
//                                      <div>${change.doc.data().total}</div>
//                                     <div>${change.doc.data().watch}</div>
//                                     <button class="btn btn-primary" onclick="acceptfunc(${change.doc.data().orderid}); removeFun(${change.doc.data().orderid})">Accept</button>
//                                     <hr>
//                                     </div>`
//                     loader.style.display = "none"
//                     pending.innerHTML = phtml;
//                 });
//             });
//     })
//     //     dhtml += `<div>${change.doc.data().items}</div>
//     //     <div>${change.doc.data().total}</div>
//     //     <div>${change.doc.data().watch}</div>
//     //      <hr>`
//     // delivered.innerHTML = dhtml
// }



// const accepted = () => {
//     let accept = document.getElementById('accept');
//     let ahtml = '';
//     auth.onAuthStateChanged((res) => {
//         db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Accept")
//             .onSnapshot((snapshot) => {
//                 snapshot.docChanges().forEach((change) => {
//                     console.log(change.doc.data());
//                     ahtml += `<div>${change.doc.data().items}</div>
//                                      <div>${change.doc.data().total}</div>
//                                     <div>${change.doc.data().watch}</div>
//                                     <button class="btn btn-primary" onclick="deliver(${change.doc.data().orderid})">Deliver</button>
//                                     <hr>`
//                     accept.innerHTML = ahtml
//                     loader.style.display = "none"

//                 });
//             });
//     })
// }

// const delivered = () => {
//     let delivered = document.getElementById('delivered');
//     let dhtml = '';
//     auth.onAuthStateChanged((res) => {
//         db.collection("orders").where("resturantid", "==", res.uid).where("watch", "==", "Deliver")
//             .onSnapshot((snapshot) => {
//                 snapshot.docChanges().forEach((change) => {
//                     console.log(change.doc.data());
//                     dhtml += `<div>${change.doc.data().items}</div>
//                                      <div>${change.doc.data().total}</div>
//                                     <div>${change.doc.data().watch}</div>
//                                     <hr>`
//                     delivered.innerHTML = dhtml
//                     loader.style.display = "none"

//                 });
//             });
//     })
// }

// const removeFun = (id) => {
//     console.log(id);
// }

// const acceptfunc = (orderid) => {
//     // console.log("=>", orderid);

//     var ref = db.collection("orders").doc(`${orderid}`);
//     return ref.update({
//         watch: "Accept"
//     })
//         .then(() => {
//             console.log("Document successfully updated!");
//             // let rem = document.getElementById(`p${orderid}`)
//             // rem.remove();
//             pending();

//         })
//         .catch((error) => {
//             // The document probably doesn't exist.
//             console.error("Error updating document: ", error);
//         });
// }

// const deliver = (orderid) => {
//     // console.log("=>", orderid);
//     var ref = db.collection("orders").doc(`${orderid}`);
//     ref.update({
//         watch: "Deliver"
//     })
//         .then(() => {
//             console.log("Document successfully updated!");
//         })
//         .catch((error) => {
//             // The document probably doesn't exist.
//             console.error("Error updating document: ", error);
//         });
// }


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
                        orders.push(`<div>${doc.data().items}</div>` + `<b>Total: ${doc.data().total}</b>` + `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" + <div><br></div>` + `<div><button class="btn btn-success no-radius" onclick="accept(${doc.data().orderid})">Accept</button> <button class="btn btn-danger no-radius" onclick="reject(${doc.data().orderid})">Reject</button></div><hr>`);
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
                    orders.push(`<div>${doc.data().items}</div>` + `<b>Total: ${doc.data().total}</b>` + `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" + <div><br></div>` + `<div><button class="btn btn-success no-radius" onclick="deliver(${doc.data().orderid})">Deliver</button><hr>`);
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
                    orders.push(`<div>${doc.data().items}</div>` + `<b>Total: ${doc.data().total} </b>` + `<input type="hidden" id="pp${doc.data().orderid}" value="${doc.data().orderid}>" + <div><br></div><hr>`);
                });
                console.log(orders);
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
                    orders.push(`<div>${doc.data().items}</div>` + `<b>Total: ${doc.data().total} </b><hr>`);
                });
                console.log(orders);
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

