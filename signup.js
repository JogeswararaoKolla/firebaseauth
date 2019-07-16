 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAtYhD69llo1x_lTVRLloD_pfamFiS4Urs",
    authDomain: "signupandsignin-768fe.firebaseapp.com",
    databaseURL: "https://signupandsignin-768fe.firebaseio.com",
    projectId: "signupandsignin-768fe",
    storageBucket: "",
    messagingSenderId: "87064007361",
    appId: "1:87064007361:web:9eefef7b463e10a6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let firebaseStart=firebase.auth();
  let firebaseData=firebase.database();
   
  let userSignObj={};
  let userSignUpObj={};


  $(document).ready(function(eventObj){
    

    $("#todoBtn").click(function(eventAddObj){
      console.log(eventAddObj);
  
      const data=$("#todoId").val();
      const user=firebaseStart.currentUser.uid;
  
      firebaseData.ref("users").child(user).push({todo:data,userID:user});
      $("#todoId").val("");


      });
  
  
  
    $("#signinBtn").click(function(eventObj){
      eventObj.preventDefault();
        console.log(eventObj);
        userSignObj.email=$("#InputEmail1").val();
        userSignObj.password=$("#InputPassword1").val();
        console.log(userSignObj);
        
  
 firebase.auth().signInWithEmailAndPassword(userSignObj.email, userSignObj.password).then(function(sucessObj){
          console.log(sucessObj);
          console.log(sucessObj.user.emailVerified);
          console.log("Sign in Sucess");
          // window.location="signin.html";
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Sign in Error");
        console.log(errorCode,errorMessage);
        if(errorCode=="auth/wrong-password"){
          console.log("Password is invalid");
        }
       $("#messageSignin").text(errorMessage);
      });
  
    });
  
    $("#signupBtn").click(function(eventObj){
        console.log(eventObj);
        userSignUpObj.email=$("#InputEmail1").val().trim();
        userSignUpObj.password=$("#InputPassword1").val();
       console.log(userSignUpObj);
       //clear input fields 
       $("#InputEmail1").val("");
       $("#InputPassword1").val("");
  
       firebase.auth().createUserWithEmailAndPassword(userSignUpObj.email, userSignUpObj.password)
       .then(function(userSignUpObj){
           console.log(userSignUpObj);
       }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if(errorCode=="auth/email-already-in-use")
          {
            console.log("User already exists");
            console.log(errorCode,errorMessage);
          }
        
        });
  
    });
  
    $("#signoutBtn").click(function(eventObj){
      firebase.auth().signOut().then(function(){
        console.log("Signout Sucessful");
        }).catch(function(err){
          console.log("Error Signout");
          console.log(err);
        });
    });
  
    $("#forgotPassword").on('click',function(){
  
     let emailAddress= $("#InputEmail1").val().trim();
      firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        console.log("password reset email sent..please check");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
  
      
    });
  
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      console.log(user);
      console.log(user.uid);
      console.log(firebaseStart.currentUser.uid);
  
  
    //   var userRef = firebaseStart.currentUser;
  
    //   userRef.updateProfile({
    //   displayName: "Jane Q. User",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(function() {
    //   // Update successful.
    //   console.log("Update Sucessfull");
    // }).catch(function(error) {
    //   // An error happened.
    // });
      // window.location="signin.html";
       
      } else {
        // User is signed out.
        console.log("sign out");
      }
    });

  });

 









 

