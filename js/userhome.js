// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user);
//         // console.log(user.uid);
//     } else {
//         console.log("User Logged Out");
//     }
// });



const showRestaurants = () => {
    let userResturantShow = document.getElementById('userResturantShow');
    let allRestaurant = '';

    // console.log(user.uid);
    auth.onAuthStateChanged((user) => {
        db.collection("resturant").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                // console.log(doc.id, " => ", doc.data().name);
                let aaaa = doc.id
                // console.log(aaaa);
                // console.log(user);


                allRestaurant += `<div onclick="showResAllItems('${doc.id}')" class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                                            <div class="card" style="width: 17rem; height: 30 !important;">
                                                <img src="./images/resturant.jpg" class="card-img-top" style="height: 200px;" alt="...">
                                                <div class="card-body p-0 pt-3">
                                                    <div class="d-flex justify-content-between margin-remove">
                                                        <p class="card-text" style="font-size: 16px;"><b>${doc.data().name}</b></p>
                                                        <p class="card-text" style="font-size: 12px;"><b><i
                                                        class="bi bi-star-fill text-primary"></i> 4.1</b><span class="text-muted"
                                                        style="font-size: 13px;">/5</span></p>
                                                    </div>
                                                        <p class="card-text text-muted" style="font-size: 14px;">$$$, beverage, burger, fast foods</p>
                                                </div>
                                            </div>
                                        </div>`
                userResturantShow.innerHTML = allRestaurant;
            });
        });
    })

}

const showResAllItems = (b) => {
    console.log(b);
}
