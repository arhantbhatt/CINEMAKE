//firebase config for webapp
var firebaseConfig = {
    apiKey: "AIzaSyAoFIc0DTnxfEkJ_5UYH7Z58xr_2ZdpnUE",
    authDomain: "cinemake-9f1df.firebaseapp.com",
    projectId: "cinemake-9f1df",
    storageBucket: "cinemake-9f1df.appspot.com",
    messagingSenderId: "55705338459",
    appId: "1:55705338459:web:bab89b3c535ae1f3e4f57e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize variables
const auth = firebase.auth()
const database = firebase.database()

//register function
function register () {
  //get all input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  //validate input fields
  if (validate_email == false || validate_password == false) {
    alert('Email or Password is Incorrect')
    return
    //don't run the code anymore
  }
  if (validate_field(full_name) == false) {
    alert('Full name not entered')
    return
  }

  //move on with auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    //declare user variable
    var user = auth.currentUser

    //add user to firebase database
    var database_ref = database.ref()

    //create user data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)


    alert('User Created!')
  })
  .catch(function(error) {
    //firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

//set up login function
function login() {
  //get all input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  //validate input fields
  if (validate_email == false || validate_password == false) {
    alert('Email or Password is Incorrect')
    return
    //don't run the code anymore
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    //declare user variable
    var user = auth.currentUser

    //add user to firebase database
    var database_ref = database.ref()

    //create user data
    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)


    alert('User Logged In!')
  })
  .catch(function(error) {
    //firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

//validate functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    //email is good
    return true
  } else {
    //email is not good
    return false
  }
}

function validate_password(password) {
  //greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
