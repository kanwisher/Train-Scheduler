    

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAjoRvpZ7YCCINdxtFnQ5G4uEG16-1tqGg",
    authDomain: "trainscheduler-5e5c9.firebaseapp.com",
    databaseURL: "https://trainscheduler-5e5c9.firebaseio.com",
    storageBucket: "trainscheduler-5e5c9.appspot.com",
    messagingSenderId: "419241994286"
  };

  firebase.initializeApp(config);

  let database = firebase.database();


database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  	
	var tFrequency = childSnapshot.val().frequency;

	var firstTime = childSnapshot.val().firstTrainTime;

  	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  	var tRemainder = diffTime % tFrequency;

  	var tMinutesTillTrain = tFrequency - tRemainder;

  	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    

    console.log(firstTimeConverted);

  	$("#trainTable").append(
  		"<tr><td>" + childSnapshot.val().trainName + "</td>" +
  		"<td>" + childSnapshot.val().destination + "</td>" +
  		"<td>" + childSnapshot.val().frequency + "</td>" +
  		"<td>" + moment(nextTrain).format("LT") + "</td>" +
  		"<td>" + tMinutesTillTrain + "</td></tr>");

	


  });



  $("#submitTable").on('click', function (){

  		let tName = $("#inputTrainName").val().trim();
  		let dest = $("#inputDestination").val().trim();
  		let firstTT = $("#inputFirstTrainTime").val().trim();
  		let freq = $("#inputFrequency").val().trim();

  		var newTrain = {
  			trainName : tName,
	  		destination : dest,
	  		firstTrainTime : firstTT,
	  		frequency: freq
  		};

	  	database.ref().push(newTrain);


	  	$("#inputTrainName").val("");
		$("#inputDestination").val("");
		$("#inputFirstTrainTime").val("");
		$("#inputFrequency").val("");



  });







