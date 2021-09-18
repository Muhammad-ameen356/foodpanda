const firebaseApp = firebase.initializeApp({
   
});

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

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

// SignUp As User
const userSignUp = () => {
    let email = document.getElementById('signUserEmail').value;
    let pass = document.getElementById('signUserPass').value;

    auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            setUserInitialData(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

const setUserInitialData = (user) => {
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
    })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href = "./login.html";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

// SignUp As Resturant
const resturantSignUp = () => {
    let signupResEmail = document.getElementById('signupResEmail').value;
    let signupResPassword = document.getElementById('signupResPassword').value;

    auth.createUserWithEmailAndPassword(signupResEmail, signupResPassword)
        .then((userCredential) => {
            var resturant = userCredential.user;
            console.log(resturant);
            setresturantInitialData(resturant);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

const setresturantInitialData = (resturant) => {
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
    })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href = "./login.html";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

const login = () => {
    let loginnameoremail = document.getElementById('loginnameoremail').value;
    let loginpassword = document.getElementById('loginpassword').value;

    auth.signInWithEmailAndPassword(loginnameoremail, loginpassword)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user.uid);
            authStateListener();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

const authStateListener = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            var uid = user.displayName;
            console.log(user.uid);
            typeCheck(user);
        } else {
            console.log("no user");
        }
    });
}

const typeCheck = (user) => {
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((usersnapshot) => {
        if (usersnapshot.data() == undefined) {
            var resdocRef = db.collection("resturant").doc(user.uid);
            resdocRef.get().then((ressnapshot) => {
                if (ressnapshot.data().type == "resturant") {
                    // console.log("resturant mil gya");
                    window.location.href = "./resturantDash.html";
                }
            });
        } else if (usersnapshot.data().type == "user") {
            // console.log("user found", usersnapshot.data());
            window.location.href = "./userhome.html"
        }
    });
}

const logout = () =>{
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        window.location.href="./login.html"
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
}