const showResAllItems = () => {
    var id = localStorage.getItem("resid");
    let resName = document.getElementById('resName'), mainResName = document.getElementById('mainResName'), allResItems = document.getElementById('allResItems');
    let items = '';
    // FOr Getting Resturant Data
    db.collection("resturant").where("restaurantkey", "==", id).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data().name);
                resName.innerHTML = `${doc.data().name} Restaurant Items`
                mainResName.innerHTML = `${doc.data().name}`
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
                items += `<div onclick="cart(${doc.id})" class="box-item pt-3">
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

const cart = (itemid)=>{
    console.log(itemid);
    db.collection("items").doc(`${itemid}`)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());

    });

}