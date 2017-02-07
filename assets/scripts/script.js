

setInterval(updateAll, 60 * 1000); //update information every 60 seconds


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



updateAll(); //display info on initial page load


function updateAll(){

$(".trainData").remove(); //remove existing rows since appending


  database.ref().on('value', function(snapshot) {

  snapshot.forEach(function(childSnapshot){
    
  	

	let tFrequency = childSnapshot.val().frequency;

	let firstTime = childSnapshot.val().firstTrainTime;

  let firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  let tRemainder = diffTime % tFrequency;

  let tMinutesTillTrain = tFrequency - tRemainder;

  let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    

  
    //for each child, append new row of data
  	$("#trainTable").append(
  		"<tr class='trainData'><td>" + childSnapshot.val().trainName + "</td>" +
  		"<td>" + childSnapshot.val().destination + "</td>" +
  		"<td>" + childSnapshot.val().frequency + "</td>" +
  		"<td>" + moment(nextTrain).format("LT") + "</td>" +
  		"<td>" + tMinutesTillTrain + "</td></tr>");

	


  });

});
}





  $("#submitTable").on('click', function (){

      //save form input values
  		let tName = $("#inputTrainName").val().trim();
  		let dest = $("#inputDestination").val().trim();
  		let firstTT = $("#inputFirstTrainTime").val().trim();
  		let freq = $("#inputFrequency").val().trim();

  		let newTrain = {
  			trainName : tName,
	  		destination : dest,
	  		firstTrainTime : firstTT,
	  		frequency: freq
  		};

	  	database.ref().push(newTrain); //push object to FireBase

      //clear forms
	  $("#inputTrainName").val("");
		$("#inputDestination").val("");
		$("#inputFirstTrainTime").val("");
		$("#inputFrequency").val("");

    updateAll(); //don't wait for interval, update info now

  });







