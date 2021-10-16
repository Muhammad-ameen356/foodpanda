const showRestaurants = () => {
    loader.style.display = "block";
    let userResturantShow = document.getElementById('userResturantShow');
    let allRestaurant = '';

    db.collection("resturant").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());

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
                                                        <p class="card-text" style="font-size: 15px; margin-top: -10px;"><b>Rs. ${doc.data().deliverycharges}</b> <span>Delivery fee</span></p>

                                                </div>
                                            </div>
                                        </div>`
            userResturantShow.innerHTML = allRestaurant;
            loader.style.display = "none";

        });
    });
}

const getResid = (resid) => {
    console.log(resid);
    localStorage.setItem("resid", resid);
    window.location.href = "./userselectresitems.html";
}
