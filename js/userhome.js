auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        // console.log(user.uid);
    } else {
        console.log("User Logged Out");
    }
});



const showRestaurants = () => {
    let userResturantShow = document.getElementById('userResturantShow');
    let allRestaurant = '';

            // console.log(user.uid);
            db.collection("resturant").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    // console.log(doc.id, " => ", doc.data().name);
                    var a = doc.data().name
                    console.log(a);
                    
                    allRestaurant += `<div onclick="showAllResItem(${a})">
                    <div class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
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
                                            <a href="#" onclick="showAllResItem(${doc.id})">Delete</a>
                                        </div></div>`
                                        userResturantShow.innerHTML = allRestaurant;
                });
            });

}

function showAllResItem(b){
    console.log(b);
}
