

let timer = window.setInterval(updateAll, 5 * 1000); //update information every 60 seconds


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
console.log("interval running");

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
  		"<tr class='trainData'><td class='edit trainName'>" + childSnapshot.val().trainName + "</td>" +
  		"<td class='edit destination'>" + childSnapshot.val().destination + "</td>" +
  		"<td class='edit frequency'>" + childSnapshot.val().frequency + "</td>" +
  		"<td>" + moment(nextTrain).format("LT") + "</td>" +
  		"<td>" + tMinutesTillTrain + "</td>" +
      "<td class='buttonSpace'><button type='button' data-key='" + childSnapshot.key + "' class='btn-xs btn-warning update updateStyle'>Update</button><button type='button' data-key='" + childSnapshot.key + "' class='btn-xs btn-danger clear'>Clear</button></td></tr>");

	


  });

});
}


$("#trainTable").on('click', ".update", function() {
  $(this).text("Confirm");
  $(this).removeClass('btn-warning update');
  $(this).addClass('btn-success confirm');
  let $editables = $(this).closest("tr").children(".edit");

    $editables.each(function(index){
      let currentContent = $(this).text()
      $(this).text("");
      let $newInput = $("<input class='tableInput' type='text'/>");
      $(this).append($newInput.val(currentContent));
      clearInterval(timer);
      
    });

  $(".confirm").on('click', function() {
    let $currentKey = $(this).data('key');
    let $trainName = $(this).closest("tr").children(".trainName").children("input").val();
    let $destination = $(this).closest("tr").children(".destination").children("input").val();
    let $frequency = $(this).closest("tr").children(".frequency").children("input").val();
    
      
     
  
    var updates = {};
    
    updates = {
    
      trainName : $trainName,
      destination: $destination,
      frequency : $frequency

    };

    database.ref($currentKey).update(updates);
     

    updateAll();
  })

});





$("#trainTable").on('click', ".clear", function() {
  let key = $(this).data('key');
  database.ref().child(key).remove();
  $(this).closest("tr").remove();
  updateAll();
});



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







