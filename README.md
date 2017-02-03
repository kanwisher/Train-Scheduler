# Train-Scheduler


PLANNING/PSEUDOCODE






LAYOUT


Title/Heading, bootstap Jumbotron

Train schedule Div, bootstrap panel/panelheading
	Table with headings, bootstrap table
		 Train Name   Destination   Frequency(min)   Next Arrival   Minutes Away

Add train Div, bootstrap panel/panelheading
	Input headings with input boxes, content with inputs
		Train Name   Destination   First Train Time(HH:mm - military time) Frequency (min)


Submit button







LOGIC

On page load, Previous entries will be appended to the table from Firebase database, concurrently
functions/formulas will calculate "Next Arrival" and "Minutes Away" then append the return values


When filling out input boxes:
	Input validation: Train Name: Text, no numbers, capitalize first letter of each word
						Destination: Text, no numbers, capitalie first letter of each word
						First Train Time (HH:mm-military time): Require military time format
						Frequency: Numbers between 1 and 9999 only

On submit click:
	Make sure that train name validates, else give error
		then
	Make sure that destination validates, else give error
		then
	Make sure that First Train validates, else give error
		then
	Make sure that Frequency validates, else give error
		then
	Save input values to variables
		then
	Clear all input boxes
		then
	Store each of these variables into individual Firebase keys object
		then
	Send keys to Firebase database


When page loads, and when any new data has been added to Firebase:
		Append table data to the table div from Firebase database keys, call a function to return the results of "Next Arrival" && "Minutes Away"




