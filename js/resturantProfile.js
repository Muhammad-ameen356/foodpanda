const uploadImage = () => {
    loader.style.display = "block";
    auth.onAuthStateChanged((res) => {
        const ref = storage.ref('resturantProfile');
        let file = document.getElementById('MainResImage').files[0];
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(res.uid).put(file, metadata);
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                uploadImageFirestore(url, res)
                console.log(url);
                loader.style.display = "none";

            })
            .catch((err) => { console.log(err); })
    })
}

const uploadImageFirestore = (url, res) => {
    var resRef = db.collection("resturant").doc(res.uid);
    resRef.update({
        imageurl: url
    })
        .then(() => {
            console.log("Document successfully updated!");

        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

const profileDataShow = () => {
    loader.style.display = "block";
    let resName = document.getElementById('resName');
    let resAddr = document.getElementById('resAddr');
    let resPhone = document.getElementById('resPhone');
    let resDeal = document.getElementById('resDeal');
    let resDelivcharg = document.getElementById('resDelivcharg');
    let mainImage = document.getElementById('mainImage');


    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            resName.innerHTML = doc.data().name;
            if (doc.data().address == "") {
                console.log("khali he");
            } else {
                resAddr.innerHTML = doc.data().address;
            }
            if (doc.data().phonenumber == "") {
                console.log("Empty phone");
            } else {
                resPhone.innerHTML = doc.data().phonenumber;
            }
            if (doc.data().deal == "") {
                console.log("Empty deal");
            } else {
                resDeal.innerHTML = doc.data().deal;
            }
            if (doc.data().deliverycharges == "") {
                console.log("Empty delivery charges");
            } else {
                resDelivcharg.innerHTML = doc.data().deliverycharges;
            }
            if (doc.data().imageurl == "") {
                console.log("Empty image");
            } else {
                mainImage.src = doc.data().imageurl;
            }
            loader.style.display = "none";
        });
    })
}

let modalInp = document.getElementById('resProfileEditModal');
let updateNamebtn = document.getElementById('updateNamebtn');
let updateAddbtn = document.getElementById('updateAddbtn');
let updatePhonebtn = document.getElementById('updatePhonebtn');
let addDealbtn = document.getElementById('addDealbtn');
let addDelvChargbtn = document.getElementById('addDelvChargbtn');
let dealoption = document.getElementById('dealoption');
let dealnumber = document.getElementById('dealnumber');


const getResName = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            modalInp.value = doc.data().name;
        });
    })
    modalInp.disabled = false; updateNamebtn.style.display = "block"; updateAddbtn.style.display = "none"; updatePhonebtn.style.display = "none"; addDealbtn.style.display = "none"; dealoption.style.display = "none"; dealnumber.style.display = "none"; addDelvChargbtn.style.display = "none"
}

const getResAdress = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            modalInp.value = doc.data().address;
        });
    })

    modalInp.disabled = false; updateNamebtn.style.display = "none"; updateAddbtn.style.display = "block"; updatePhonebtn.style.display = "none"; addDealbtn.style.display = "none"; dealoption.style.display = "none"; dealnumber.style.display = "none"; addDelvChargbtn.style.display = "none"
}

const getResPhone = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            modalInp.value = doc.data().phonenumber;
        });
    })

    modalInp.disabled = false; updateNamebtn.style.display = "none"; updateAddbtn.style.display = "none"; updatePhonebtn.style.display = "block"; addDealbtn.style.display = "none"; dealoption.style.display = "none"; dealnumber.style.display = "none"; addDelvChargbtn.style.display = "none"
}

const getResDeal = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            modalInp.value = doc.data().deal;
        });
    })
    modalInp.disabled = true; updateNamebtn.style.display = "none"; updateAddbtn.style.display = "none"; updatePhonebtn.style.display = "none"; addDealbtn.style.display = "block"; dealoption.style.display = "block"; dealnumber.style.display = "block"; addDelvChargbtn.style.display = "none"
}

const getResDelvCharg = () => {
    auth.onAuthStateChanged((res) => {
        // modalInp.type = "number";
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            modalInp.value = doc.data().deliverycharges;
        });
    })
    modalInp.disabled = false; updateNamebtn.style.display = "none"; updateAddbtn.style.display = "none"; updatePhonebtn.style.display = "none"; addDealbtn.style.display = "none"; dealoption.style.display = "none"; dealnumber.style.display = "none"; addDelvChargbtn.style.display = "block"
}

// Update Buttons

const updateName = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        return resRef.update({
            name: modalInp.value,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    })
}

const updateAddress = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        return resRef.update({
            address: modalInp.value,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    })
}

const updateNumber = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        return resRef.update({
            phonenumber: modalInp.value,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    })
}

const addDeal = () => {
    var selectedDeal = (dealoption.value + " " + dealnumber.value);
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        return resRef.update({
            deal: selectedDeal,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    })
}

const addDealvcharg = () => {
    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        return resRef.update({
            deliverycharges: modalInp.value,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    })
}