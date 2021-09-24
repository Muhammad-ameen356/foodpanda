const uploadImage = () => {
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
            })
            .catch((err) => { console.log(err); })
    })
}

const uploadImageFirestore = (url, res) => {
    let mainImage = document.getElementById('mainImage');

    var resRef = db.collection("resturant").doc(res.uid);
    resRef.update({
        imageurl: url
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    resRef.onSnapshot((doc) => {
        mainImage.src = doc.data().imageurl;
    });
}

const profileDataShow = () => {
    let resName = document.getElementById('resName');
    let resAddr = document.getElementById('resAddr');
    let resPhone = document.getElementById('resPhone');
    let resDeal = document.getElementById('resDeal');

    auth.onAuthStateChanged((res) => {
        var resRef = db.collection("resturant").doc(res.uid);
        resRef.onSnapshot((doc) => {
            resName.innerHTML = doc.data().name;
            // resPhone.innerHTML = doc.data();
            resAddr.innerHTML = doc.data().deal;
            resAddr.innerHTML = doc.data().address;
        });
    })

}