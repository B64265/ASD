//Jeremy Goldman
//ASD 0713
//main.js

$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
	
		var myForm = $('#reminderForm'),
			reminderErrorLink = $('#reminderErrorLink');
		 
		    myForm.validate({
			invalidHandler: function(form, validator) {
				reminderErrorLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldName +'</li>';
				};
				
				$("#reminderErrors ul").html(html);
			},
			submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var getData = function(){

};

//Find value of radio button
	function getSelectedRadio(){
		
		var radioButtons = document.forms[0].priority;
		for(var i=0; i<radioButtons.length; i++){
			
			if(radioButtons[i].checked){
				priorityValue = radioButtons[i].value;
			}
		}
	}


var storeData = function(data){
		
		var id = Math.floor(Math.random()*1000000);
	
		getSelectedRadio();
		
		//Form data into an object..
		//Object properties has array with label and value.
		
		var item 				= {};
		item.group 				= ["Group:", $('#category').val()];
		item.remindTitle 		= ["Reminder Title:", $('#title').val()];
		item.dueDate			= ["Due Date:", $('#due').val()];
		item.priority			= ["Priority:", priorityValue];
		item.description		= ["Description:", $('#description').val()];
		
		
		//Save to Local Storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Reminder is set!");
		
		console.log(id, JSON.stringify(item));

	
}; 

var	deleteItem = function (key){
	localStorage.removeItem(key);
};
					
var clearLocal = function(){

};

var getCurrentDate = function(){
	var tD = new Date();
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var datestr = monthNames[tD.getMonth()] + " " + tD.getDate()  + ", " + tD.getFullYear();
	
	var due = document.getElementById("due");
		due.setAttribute("value", datestr);
	
	//console.log("Success!");
	
};


