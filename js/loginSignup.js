const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3SN5sUnsXtKPg767fJmVUGBiiptzhm3Q",
    authDomain: "ameen-deliverfood.firebaseapp.com",
    projectId: "ameen-deliverfood",
    storageBucket: "ameen-deliverfood.appspot.com",
    messagingSenderId: "680822620289",
    appId: "1:680822620289:web:0adc2afa389a52aab7cd80",
    measurementId: "G-6YCVQ1XW4R"
});

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user, "user Loged In");
//     } else {
//         console.log("User Logged Out");
//     }
// });

function showusersignuppassword() {
    var signUserPass = document.getElementById('signUserPass');
    if (signUserPass.type === "password") {
        signUserPass.type = "text"
    } else {
        signUserPass.type = "password"
    }
}
function showsignuppassword() {
    var signupResPassword = document.getElementById("signupResPassword");

    if (signupResPassword.type === "password") {
        signupResPassword.type = "text";
    } else {
        signupResPassword.type = "password";
    }
}
// Show Login Password
function showloginpassword() {
    var loginpassword = document.getElementById("loginpassword")
    if (loginpassword.type === "password") {
        loginpassword.type = "text";
    } else {
        loginpassword.type = "password";
    }
}


const validation = () => {
    let signUserName = document.getElementById('signUserName').value;
    let signUserPhone = document.getElementById('signUserPhone').value;
    let signUserCountry = document.getElementById('signUserCountry').value;
    let signUserCity = document.getElementById('signUserCity').value;
    let email = document.getElementById('signUserEmail').value;
    let pass = document.getElementById('signUserPass').value;
    let userSignupButton = document.getElementById('userSignupButton');

    if ((signUserName && signUserPhone && signUserCountry && signUserCity && email && pass).length === 0) {
        userSignupButton.disabled = true;
    } else {
        userSignupButton.disabled = false;
    }
}

const resSignupValidation = () => {
    let signupResName = document.getElementById('signupResName').value;
    let signupResEmail = document.getElementById('signupResEmail').value;
    let signupRescountry = document.getElementById('signupRescountry').value;
    let signuResCity = document.getElementById('signuResCity').value;
    let signupResPassword = document.getElementById('signupResPassword').value;
    let file = document.getElementById('MainResImage').files[0];
    let resSignupButton = document.getElementById('resSignupButton');
    if ((signupResName && signupResEmail && signupRescountry && signuResCity && signupResPassword).length === 0 || (file === undefined)) {
        resSignupButton.disabled = true;
    } else {
        resSignupButton.disabled = false;
    }
}

const validationLogin = () => {
    let loginnameoremail = document.getElementById('loginnameoremail').value;
    let loginpassword = document.getElementById('loginpassword').value;
    let loginBtn = document.getElementById('loginBtn');
    if ((loginnameoremail && loginpassword).length === 0) {
        loginBtn.disabled = true;
    } else {
        loginBtn.disabled = false;
    }
}

const validationForget = () => {
    let forgetInput = document.getElementById('forgetInput').value;
    let sendForgetlinkBtn = document.getElementById('sendForgetlinkBtn');

    if (forgetInput.length === 0) {
        sendForgetlinkBtn.disabled = true;
    } else {
        sendForgetlinkBtn.disabled = false;
    }
}

// SignUp As User
const userSignUp = () => {
    let loader = document.getElementById('loader');

    loader.style.display = "block"
    let email = document.getElementById('signUserEmail').value;
    let pass = document.getElementById('signUserPass').value;
    let signUserName = document.getElementById('signUserName').value;

    auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            user.updateProfile({
                displayName: signUserName,
            })
            setUserInitialData(user);
            sendEmailVerification();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            loader.style.display = "none";
            swal(errorMessage);
        });
}

const setUserInitialData = (user) => {
    let loader = document.getElementById('loader');

    let signUserName = document.getElementById('signUserName').value;
    let signUserPhone = document.getElementById('signUserPhone').value;
    let signUserCountry = document.getElementById('signUserCountry').value;
    let signUserCity = document.getElementById('signUserCity').value;
    let email = document.getElementById('signUserEmail').value;

    db.collection("users").doc(user.uid).set({
        email: email,
        name: signUserName,
        phoneNumber: signUserPhone,
        country: signUserCountry,
        city: signUserCity,
        type: "user",
        userkey: user.uid,
    })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href = "./index.html";
            loader.style.display = "none"
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            alert(error)
        });
}

// SignUp As Resturant
const resturantSignUp = () => {
    let loader = document.getElementById('loader');

    loader.style.display = "block";
    let signupResEmail = document.getElementById('signupResEmail').value;
    let signupResPassword = document.getElementById('signupResPassword').value;

    auth.createUserWithEmailAndPassword(signupResEmail, signupResPassword)
        .then((userCredential) => {
            var resturant = userCredential.user;
            console.log(resturant);
            setresturantInitialData(resturant);
            sendEmailVerification();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            loader.style.display = "none";
            swal(errorMessage);
        });
}

const setresturantInitialData = (resturant) => {
    let loader = document.getElementById('loader');

    let signupResName = document.getElementById('signupResName').value;
    let signupRescountry = document.getElementById('signupRescountry').value;
    let signuResCity = document.getElementById('signuResCity').value;
    let signupResEmail = document.getElementById('signupResEmail').value;


    db.collection("resturant").doc(resturant.uid).set({
        email: signupResEmail,
        name: signupResName,
        country: signupRescountry,
        city: signuResCity,
        type: "resturant",
        restaurantkey: resturant.uid,
        imageurl: "",
        deal: "No deal",
        operorclose: "",
        wrkinghours: "",
        address: "",
        category: "",
        phonenumber: "",
        deliverycharges: "0",
    })
        .then(() => {
            console.log("Document successfully written!");
            loader.style.display = "none"
            uploadImageSignup(resturant);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            loader.style.display = "none";
            swal(error)

        });
}

function sendEmailVerification() {
    auth.currentUser.sendEmailVerification()
        .then(() => {
            console.log("send");
        });
}

const login = () => {
    let loginnameoremail = document.getElementById('loginnameoremail').value;
    let loginpassword = document.getElementById('loginpassword').value;
    let loader = document.getElementById('loader');

    loader.style.display = "block";
    auth.signInWithEmailAndPassword(loginnameoremail, loginpassword)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user.uid);
            authStateListener();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            loader.style.display = "none";
            swal(errorMessage);
        });
}

const authStateListener = () => {
    let loader = document.getElementById('loader');
    let sendverfemailagain = document.getElementById('sendverfemailagain');
    auth.onAuthStateChanged((user) => {
        if (user.emailVerified === true) {
            if (user) {
                var uid = user.displayName;
                console.log(user.emailVerified);
                typeCheck(user);
            } else {
                console.log("no user");
            }
        } else {
            loader.style.display = "none"
            swal("Please verify your email address, Go on your given email and click on the given link. If you did not receive any Email Click on SEND EMAIL VERIFICATION to receive an email");
            sendverfemailagain.style.display = "block";
        }
    });
}

const typeCheck = (user) => {
    let loader = document.getElementById('loader');

    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((usersnapshot) => {
        if (usersnapshot.data() == undefined) {
            var resdocRef = db.collection("resturant").doc(user.uid);
            resdocRef.get().then((ressnapshot) => {
                if (ressnapshot.data().type == "resturant") {
                    // console.log("resturant mil gya");
                    window.location.href = "./resturantDash.html";
                    loader.style.display = "none"
                }
            });
        } else if (usersnapshot.data().type == "user") {
            // console.log("user found", usersnapshot.data());
            window.location.href = "./userhome.html"
            loader.style.display = "none"
        }
    });
}

const logout = () => {
    let loader = document.getElementById('loader');

    loader.style.display = "block"
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        loader.style.display = "none";
        window.location.href = "./index.html"
    }).catch((error) => {
        // An error happened.
        console.log(error);
        loader.style.display = "none"
    });
}

const forgetpassword = () => {
    let loader = document.getElementById('loader');
    loader.style.display = "block";

    const email = document.getElementById('forgetInput').value;
    auth.sendPasswordResetEmail(email)
        .then(() => {
            console.log("Password reset email sent!");
            // window.location.href = "./index.html"
            loader.style.display = "none";
            swal("Password reset email sent!");
            document.getElementById('forgetInput').value = "";
        })
        .catch((error) => {
            loader.style.display = "none";
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            swal(errorMessage)
        });
}

// Image upload

const uploadImageSignup = (res) => {
    let loader = document.getElementById('loader');
    loader.style.display = "block";
    const ref = storage.ref('resturantProfile');
    let file = document.getElementById('MainResImage').files[0];
    const metadata = {
        contentType: file.type
    }
    const task = ref.child(res.uid).put(file, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            uploadImageFirestoreSignup(url, res)
            console.log(url);
            window.location.href = "./index.html";
            loader.style.display = "none";
        })
        .catch((err) => { console.log(err); swal(err) })
}

const uploadImageFirestoreSignup = (url, res) => {
    var resRef = db.collection("resturant").doc(res.uid);
    resRef.update({
        imageurl: url
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            console.log(error);
        });
}
