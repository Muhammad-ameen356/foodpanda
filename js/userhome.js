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
        db.collection("resturant").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                // console.log(doc.id, " => ", doc.data().name);
                let aaaa = doc.id
                console.log(doc);
                // console.log(user);


                allRestaurant += `<div onclick="getResid('${doc.id}')" class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                                            <div class="card" style="width: 17rem; height: 30 !important;">
                                                <img src="${doc.data().imageurl}" class="card-img-top img-fluid" style="height: 200px;" alt="...">
                                                <div class="card-body p-0 pt-3">
                                                    <div class="d-flex justify-content-between margin-remove">
                                                        <p class="card-text" style="font-size: 16px;"><b>${doc.data().name}</b></p>
                                                        <p class="card-text" style="font-size: 12px;"><b><i
                                                        class="bi bi-star-fill text-primary"></i> 4.1</b><span class="text-muted"
                                                        style="font-size: 13px;">/5</span></p>
                                                    </div>
                                                        <p class="card-text text-muted" style="font-size: 14px;">$$$, beverage, burger, fast foods</p>
                                                        <p class="card-text" style="font-size: 15px; margin-top: -10px;"><b>Rs. 55</b> <span>Delivery Fees</span></p>

                                                </div>
                                            </div>
                                        </div>`
                userResturantShow.innerHTML = allRestaurant;
            });
        });
}

const getResid= (resid) => {
    console.log(resid);
    localStorage.setItem("resid", resid);
    window.location.href="./userselectresitems.html";
}
