var provider = new firebase.auth.GoogleAuthProvider();

let sEmail1 = document.getElementById('email');
let sPassword1 = document.getElementById('password');
let sBot1 = document.getElementById('bot1');
let sEmail2 = document.getElementById('email2');
let sPassword2 = document.getElementById('password2');
let sBot2 = document.getElementById('bot2');
let sGoogle = document.getElementById('google');

//************** FIREBASE ****************\\
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6w4Uz6KnhdYh73nh-J5YC8gK02KgfN0I",
  authDomain: "quiz2-614da.firebaseapp.com",
  projectId: "quiz2-614da",
  storageBucket: "quiz2-614da.appspot.com",
  messagingSenderId: "219029612983",
  appId: "1:219029612983:web:35027a1c542c4edd09a032"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Crear usuario
/*====================================>
const creaUsuario = (email, password) => {
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      let fecha = new Date();
      createUser({
          nombre: sEmail2.value,
          email: sEmail2.value,
          sPasswordN: sPassword2.value,
          fecha: fecha,
          aciertos: "0"
      });
      window.open("./game.html", "_self");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};
document.getElementById("bot2").addEventListener("click", alert("hola"));
//sBot2.addEventListener('click', creaUsuario(sEmail2.value, sPassword2.value));

<==================================0*/

//Crear usuario
const createUser = (user) => {
  db.collection("users")
    .add(user)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      window.open("./game.html", "_self");
    })
    .catch((error) => console.error("Error adding document: ", error));
};
sBot2.addEventListener('click', () => {
  let fecha = new Date();

  firebase
  .auth()
  .createUserWithEmailAndPassword(sEmail2.value, sPassword2.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

  createUser({
      nombre: sEmail2.value,
      email: sEmail2.value,
      sPasswordN: sPassword2.value,
      fecha: fecha,
      aciertos: "0"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error: "+errorCode + ", " + errorMessage);
  });
}); 
});


//Hacer login de usuario registrado
sBot1.addEventListener("click", () => {
  firebase.auth().signInWithEmailAndPassword(sEmail1.value, sPassword1.value)
  .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      //alert(`se ha logado ${user.email} ID:${user.uid}`)
      console.log(user);
      window.open("./game.html", "_self");
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
});


// Acceso con GOOGLE
sGoogle.addEventListener("click", () => {
  let provider = new firebase.auth.GoogleAuthProvider(); //Google
  firebase.auth() //Login a través de Google
  .signInWithPopup(provider)
  .then((result) => {
    /* @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
})

//Validar email  
let reDNI = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function checkEmail(emailParaValidar){
  console.log(reDNI.test(emailParaValidar));
  if (!reDNI.test(emailParaValidar)) {
    alert(emailParaValidar + " ez dago ondo!!");
    return false;
  }
  console.log(emailParaValidar);
  return true;
};

//Hacer Login de usuario registrado
/*
const signUpUser = (email, password) => {
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha registrado ${user.email} ID:${user.uid}`)
      alert(`se ha registrado ${user.email} ID:${user.uid}`)
  // ...
  // Guarda El usuario en Firestore
      let fecha = new Date();
      createUser({
          nombre: sEmail2.value,
          email: sEmail2.value,
          sPasswordN: sPassword2.value,
          fecha: fecha,
          aciertos: "0"
      });
      window.open("./game.html", "_self");
  })
  .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Error en el sistema"+error.message);
  });
};

sBot1.addEventListener('click', signUpUser(sEmail1.value, sPassword1.value));
*/




/*

function logInUser(email, password) { //login
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      alert(`se ha logado ${user.email} ID:${user.uid}`)
      console.log(user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

function crearUser (email, password) { 
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha registrado ${user.email} ID:${user.uid}`)
      alert(`se ha registrado ${user.email} ID:${user.uid}`)
      // ...
      // Guarda El usuario en Firestore
      createUser({
        id:user.uid,
        email:user.email,
        message:"Hola que tal"
      });
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Error en el sistema"+error.message);
    });
};





   //Sortzeko
document.getElementById("bot2").addEventListener("click", () => {
//let sNombre = document.getElementById('txtNombre');
//let sEmail = document.getElementById('txtEmail');
let fecha = new Date();
//emailOK = checkEmail(sEmail.value);//******************* 
//console.log("El correo a validar es: ", + emailOK);
  createUser({
    //nombre: sNombre.value,
    nombre: sEmail.value,
    fecha: fecha,
  });
});
let emailOK = false;
let sEmpezar = document.getElementById('btnEmpezar');
let sEmail = document.getElementById('email');
//let sRegistro = document.getElementById('registro');
/*sEmpezar.addEventListener('click', () => {
  emailOK = checkEmail(sEmail.value);
  if (emailOK) {

    
  } else {
    alert("El email ", `${sEmail.value}`, " no es correcto");
    
    return;
  }
});*/



/*===================================================================
function nuevoUsuario(nombre, pass){// Add a new document with a generated id.
  db.collection("Quiz").add({
    name: nombre,
    password: pass
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
};
sBot2.addEventListener('click', nuevoUsuario(sEmail2.value, sPassword2.value));
==================================================================00 */
/*
//********** PREGUNTAS ************\
//misPreguntas
let sQuestion = document.getElementById('question');
let sButtons = document.getElementsByName('buttons');
let sBtn0 = document.getElementById('btn0');
let sBtn1 = document.getElementById('btn1');
let sBtn2 = document.getElementById('btn2');
let sBtn3 = document.getElementById('btn3');
let sProgress = document.getElementById('progress');

//************* ASYNC / AWAIT ************\\
let misPreguntas = [];
async function getPreguntas() {
  try {
      let response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple')
      let data = await response.json();
      for (let i=0; i<data.length; i++){
        //misPreguntas[i].question.push(data.result)
      }
      misPreguntas = data;
  } catch (error) {
      console.log("Se ha producido un error: " + error);
      alert("Se ha producido el error: " + error);
  }
};
getPreguntas();
console.log(misPreguntas);

sQuestion.innerText = misPreguntas.results[0].question;
sBtn0.innerText = misPreguntas.results[0].incorrect_answers[0];
sBtn1.innerText = misPreguntas.results[0].incorrect_answers[1];
sBtn2.innerText = misPreguntas.results[0].incorrect_answers[02];
sBtn3.innerText= misPreguntas.results[0].correct_answer;


*/



 /* ================================================00

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }
  this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}
function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
      // show options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }
      showProgress();
  }
};
function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Pregunta " + currentQuestionNumber + " de " + quiz.questions.length;
};
function showScores() {
  var gameOverHTML = "<h1>Resultado</h1>";
  gameOverHTML += "<h2 id='score'> Has acertado " + quiz.score + " de 6</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};
// crea las preguntas
var questions = [
  new Question("¿Cuántas zonas horarias hay en Rusia?", ["1000", "13","12", "11"], "11"),
  new Question("¿Qué país tiene más islas en el mundo?", ["Suecia", "Nueva Zelanda", "Melilla", "Francia"], "Suecia"),
  new Question("¿Cuál es el nombre en argot de la ciudad de Nueva York, utilizado por los locales?", ["Gotham", "Big Apple","Algorta", "The City"], "Gotham"),
  new Question("¿Cuándo se inauguró el metro de Londres?", ["1992", "1863", "1856", "1968"], "1863"),
  new Question("¿Cuándo se fundó Netflix?", ["2001", "2009", "1997", "2015"], "1997"),
  new Question("¿Cuál de los siguientes imperios no tenía lengua escrita?", ["Inca", "Azteca", "Egipcio", "Romano"], "Inca")
];
// crea el quiz
var quiz = new Quiz(questions);
// display quiz
populate();
==============================================00*/


/*
const PREGUNTAS = [{
  pregunta: "¿Cuántas zonas horarias hay en Rusia?",
  r1: 1000,
  r2: 13,
  r3: 12,
  r4: 11,
  corr: 11
},
{pregunta: "¿Qué país tiene más islas en el mundo?", 
r1: "Suecia",
r2: "Nueva Zelanda",
r3: "Melilla",
r4: "Francia",
corr: "Suecia"
},
{pregunta: "¿Cuál es el nombre en argot de la ciudad de Nueva York, utilizado por los locales?", 
r1: "Gotham",
r2: "Big Apple",
r3: "Algorta",
r4: "The City",
corr: "Gotham"
},
{pregunta: "¿Cuándo se inauguró el metro de Londres?", 
r1: "1992",
r2: "1863",
r3: "1856",
r4: "1968",
corr: "1863"
},
{pregunta: "¿Cuándo se fundó Netflix?", 
r1: "2001",
r2: "2009 Apple",
r3: "1997",
r4: "2015",
corr: "1997"
},
{pregunta: "¿Cuál de los siguientes imperios no tenía lengua escrita?", 
r1: "Inca",
r2: "Azteca",
r3: "Egipcio",
r4: "Romano",
corr: "Inca"
}];

const SPREGUNTA = document.getElementById('pregunta');
const SRESP1 = document.getElementById('resp1');
const SRESP2 = document.getElementById('resp2');
const SRESP3 = document.getElementById('resp3');
const SRESP4 = document.getElementById('resp4');
const SBOTON = document.getElementsByName('rusia');

var contador = 2;
switch (contador) {
  case 0:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;
  case 1:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;
  case 2:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;
  case 3:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;
  case 4:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;
  case 5:
    SPREGUNTA.innerHTML = PREGUNTAS[contador].pregunta;
    SRESP1.innerHTML = PREGUNTAS[contador].r1;
    SRESP2.innerHTML = PREGUNTAS[contador].r2;
    SRESP3.innerHTML = PREGUNTAS[contador].r3;
    SRESP4.innerHTML = PREGUNTAS[contador].r4;
    contador++;
    break;

  default:
    alert("unexpected error!!")
    break;
} 
*/

/*
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }
  this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}
function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
      // show options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }
      showProgress();
  }
};
function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Pregunta " + currentQuestionNumber + " de " + quiz.questions.length;
};
function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Tu resultado: " + quiz.score + " de 6</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};
// ccrea las preguntas
var questions = [
  new Question("¿Cuántas zonas horarias hay en Rusia?", ["1000", "13","12", "11"], "11"),
  new Question("¿Qué país tiene más islas en el mundo?", ["Suecia", "Nueva Zelanda", "Melilla", "Francia"], "Suecia"),
  new Question("¿Cuál es el nombre en argot de la ciudad de Nueva York, utilizado por los locales?", ["Gotham", "Big Apple","Algorta", "The City"], "Gotham"),
  new Question("¿Cuándo se inauguró el metro de Londres?", ["1992", "1863", "1856", "1968"], "1863"),
  new Question("¿Cuándo se fundó Netflix?", ["2001", "2009", "1997", "2015"], "1997"),
  new Question("¿Cuál de los siguientes imperios no tenía lengua escrita? Inca, azteca, egipcio, romano?", ["Inca", "Azteca", "Egipcio", "Romano"], "Inca")
];
// crea el quiz
var quiz = new Quiz(questions);
// display quiz
populate();

*/


/*const sBtResultados = document.getElementById('finalResult');
sBtResultados.addEventListener("click", getResults);

function getResults() {

    //respuestas correctas
    var amountCorrect = 0;
  
  // LOOP para hacer check de las preguntas
    for(var i = 1; i <= 5; i++) {
      var radiosName = document.getElementsByName('answer'+i);
  
  //LOOP para comprobar las respuestas dentro de cada radio
      for(var j = 0; j < radiosName.length; j++) {
        var radiosValue = radiosName[j];
        if(radiosValue.value == "correct" && radiosValue.checked) {
          amountCorrect++;
          radiosValue.style.color = "green";
        }
      }
    }
  document.getElementById('results').innerHTML =
  "Respuestas correctas " + amountCorrect;
  
  }*/

