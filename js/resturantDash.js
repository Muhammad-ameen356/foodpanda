

// const auth = firebaseApp.auth();
// const db = firebaseApp.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        // console.log(user.uid);
    } else {
        console.log("User Logged Out");
    }
});

const addItem = () => {
    loader.style.display = "block"
    // Storage
    const ref = storage.ref('resturantItems');
    let file = document.getElementById('resFoodImage').files[0];
    let date = new Date, name = date.getTime() + '-' + file.name

    const metadata = { contentType: file.type }
    const task = ref.child(name).put(file, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let resItemName = document.getElementById('resItemName').value; resPrice = document.getElementById('resPrice').value; resCatrgory = document.getElementById('resCatrgory').value;
            let genID = date.getTime();
            auth.onAuthStateChanged((res) => {
                db.collection("items").doc(`${genID}`).set({
                    itemname: resItemName, itemprice: resPrice, itemcategory: resCatrgory, key: res.uid, imageurl: url
                })
                    .then(() => {
                        console.log("Document successfully written!");
                        showItem();
                        loader.style.display = "none"
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
        })
        .catch((err) => {
            console.log(err);
        })
}
const showItem = () => {
    loader.style.display = "block"
    let resItem = document.getElementById('resItem');
    let html = '';
    auth.onAuthStateChanged((res) => {
        db.collection("items").where("key", "==", res.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().itemname);
                // console.log(doc.id);

                html += `<div class="col-md-4 cl-sm-12 my-2">
                                <div class="card" style="width: 18rem;">
                                <div class="dropdown">
                                <i class="bi bi-three-dots-vertical dropbtn three-dot"></i>
                                    <div class="dropdown-content">
                                        <a href="#" onclick="editItem(${doc.id})">Edit</a>
                                        <a href="#" onclick="deleteItem(${doc.id})">Delete</a>
                                    </div>
                                    </div>
                                    <img src="${doc.data().imageurl}" id="image" class="card-img-top" alt="...">
                                    
                                    
                                    <div class="card-body">
                                        <p class="" style="font-size: 25px;"><b>${doc.data().itemname}</b></p>
                                    <div class="d-flex justify-content-between">
                                        <p class="" style="font-size: 16px;">PKR: ${doc.data().itemprice}</p>
                                    </div>

                                    </div>
                                </div>
                            </div>`
                resItem.innerHTML = html;
                loader.style.display = "none";
            });
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    })

}

const navbar = () => {
    const shopNameNav = document.getElementById('shopNameNav');
    auth.onAuthStateChanged((res) => {
    let docRef = db.collection("resturant").doc(res.uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const shopname = doc.data().name; namehalf = shopname.substring(0, 14)
            shopNameNav.innerHTML = `${namehalf}....`;
        } else { console.log("No such document!"); }
    }).catch((error) => { console.log("Error getting document:", error); });
})
}

const deleteItem = (id) => {
    loader.style.display = "block"
    console.log(id);
    db.collection("items").doc(`${id}`).delete().then(() => {
        console.log("Document successfully deleted!");
        loader.style.display = "none"
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    showItem();
}

const editItem = (id) => {
    console.log(id);
    // 
}


const freeOrpaid = () => {
    let resDeliveryType = document.getElementById('resDeliveryType').value, delvcharginp = document.getElementById('delvcharginp'), delvcharlab = document.getElementById('delvcharlab');

    if (resDeliveryType == "Paid") {
        delvcharginp.style.display = "block"
        delvcharlab.style.display = "block"
    } else {
        delvcharginp.style.display = "none"
        delvcharlab.style.display = "none"
    }
}