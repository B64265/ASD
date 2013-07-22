//Jeremy Goldman
//ASD 0713
//main.js

$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
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



function deleteItem(){
		
		var verify = confirm("Are you sure you want to delete this reminder?");
		
		if(verify){
			
			localStorage.removeItem(this.key);
			alert("Reminder was deleted!");
			window.location.reload();
			
		}else{
			
			alert("Reminder was NOT deleted.");
		}
		
	}
	
function editItem(key){
		
		// Get data from Local Storage
		var value = localStorage.getItem(key);
		var reminder = JSON.parse(value);
		
		
		$('#title').val(reminder.remindTitle);
		$('#groups').val(reminder.group);
		$('#due').val(reminder.dueDate);
		$('#recurrence').val(reminder.recurrence);
		$('#description').val(reminder.description);
		
		if(reminder.priority == "Yes"){
			
			$('priority').setAttribute("checked", "checked");
		}
		
		//Change Submit button value to edit button
		$('#submitButton').text = "Edit Reminder";
		var editSubmit = $('#submitButton');
		
		//Save the key created
		editSubmit.on('click', function(data){
			
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

			
			
		})})
		editSubmit.key = reminder.id;
		
	};

	
var storeData = function(){
	
	var id = Math.floor(Math.random()*1000000);
	
		getSelectedRadio();
		
		//Form data into an object..
		//Object properties has array with label and value.
		
		var item 				= {};
		item.group 				= $('#category').val();
		item.remindTitle 		= $('#title').val();
		item.dueDate			= $('#due').val();
		item.priority			= priorityValue;
		item.description		= $('#description').val();
		item.id					= id;
		
		
		//Save to Local Storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Reminder is set!");
		
		console.log(id, JSON.stringify(item));

	

	
};

$('#submitButton').on('click', function(data){

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
	
})});

$('#clearData').on('click', function(){

	var verify = confirm("Are you sure you want to delete all reminders?");
		
		if(verify){
			
			localStorage.clear();
			alert("localStorage has been cleared!!");
			
		}else{
			
			alert("localStorage was NOT cleared.");
		}
		
});

$('#reset').on('click', function(){	
		
		$('#category').val();
		$('#title').val();
		$('#due').val();
		priorityValue = 0;
		$('#description').val();
		
		getCurrentDate();
		
});

$('#showData').on('click', function(){


	if ((this.id === "Personal") || (this.id === "Work") || (this.id === "Other")) {
			var appendLocation = $('#browseReminderList');
			$('#browseReminderList').innerHTML = "";
			console.log("Running like it should....");
			filterCats = this.id;
			browseCheck = true;
		} else {
			var appendLocation = $('#reminderList');
			$('#reminderList').innerHTML = "";
			console.log("Running like it should.... From SEARCH");
			browseCheck = false;
		}
	for (var i = 0, j = localStorage.length; i < j; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			if (browseCheck) {
			console.log(obj.group[1]);
				if (obj.group[1] === filterCats) {
					readyCheck = true;
				} else {
					readyCheck = false;
				}
			} else {
				readyCheck = true;
			}
			
			if (readyCheck) {
				if(browseCheck){
				
				var newImg = document.createElement('img');
				var setSrc = newImg.setAttribute("src", "img/"+ filterCats +".png");
				newImg.setAttribute("height", "128");
				newImg.setAttribute("width", "128");
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				makeNewLi.appendChild(newImg);
				var makeH3 = document.createElement('h3');
				makeH3.innerHTML = obj.remindTitle[1];
				makeNewLi.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description[1];
				makeNewLi.appendChild(makeP);
				makeEntry.setAttribute("id", key);	
					

					
				}else{
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				$('#reminderList').append(makeEntry);
				//appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				//makeNewLi.appendChild(newImg);
				var editButton = document.createElement('a');
				editButton.setAttribute("href", "#home");
				editButton.id = obj.id;
				var makeH3 = document.createElement('h6');
				makeH3.innerHTML = obj.remindTitle;
				editButton.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description;
				editButton.appendChild(makeP);
				makeNewLi.appendChild(editButton);
				makeEntry.setAttribute("id", key);
				console.log(obj.id);

				editButton.addEventListener("click", editItem(obj.id));
			}
			}}		
});



var getCurrentDate = function(){
	var tD = new Date();
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var datestr = monthNames[tD.getMonth()] + " " + tD.getDate()  + ", " + tD.getFullYear();
	$('#due').val(datestr);
		
	
	//console.log("Success!");
	
};

});

$('#json').on('pageinit', function(){
	//code needed for home page goes here
	
	
	
	for(var n in json){
			
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
			
		}



	if ((this.id === "Personal") || (this.id === "Work") || (this.id === "Other")) {
			var appendLocation = $('#jsonDisplay');
			$('#jsonDisplay').innerHTML = "";
			console.log("Running like it should....");
			filterCats = this.id;
			browseCheck = true;
		} else {
			var appendLocation = $('#jsonDisplay');
			$('#jsonDisplay').innerHTML = "";
			console.log("Running like it should.... From SEARCH");
			browseCheck = false;
		}
	for (var i = 0, j = localStorage.length; i < j; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			if (browseCheck) {
			console.log(obj.group[1]);
				if (obj.group[1] === filterCats) {
					readyCheck = true;
				} else {
					readyCheck = false;
				}
			} else {
				readyCheck = true;
			}
			
			if (readyCheck) {
				if(browseCheck){
				
				var newImg = document.createElement('img');
				var setSrc = newImg.setAttribute("src", "img/"+ filterCats +".png");
				newImg.setAttribute("height", "128");
				newImg.setAttribute("width", "128");
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				makeNewLi.appendChild(newImg);
				var makeH3 = document.createElement('h3');
				makeH3.innerHTML = obj.remindTitle[1];
				makeNewLi.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description[1];
				makeNewLi.appendChild(makeP);
				makeEntry.setAttribute("id", key);	
					

					
				}else{
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				$('#jsonDisplay').append(makeEntry);
				//appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				//makeNewLi.appendChild(newImg);
				var editButton = document.createElement('a');
				editButton.setAttribute("href", "#home");
				editButton.id = obj.id;
				var makeH3 = document.createElement('h6');
				makeH3.innerHTML = obj.remindTitle;
				editButton.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description;
				editButton.appendChild(makeP);
				makeNewLi.appendChild(editButton);
				makeEntry.setAttribute("id", key);
				

				//editButton.addEventListener("click", editItem(obj.id));
			}
			}}		
});


$('#moreInfo').on('pageinit', function(){
	//code needed for home page goes here
	
	 $('#moreInfo').get('xml.xml', function(d){  
        $('body').append('<h1> Recommended Web Development Books </h1>');  
        $('body').append('<dl>');  
		console.log("This is the Title:");
        $(d).find('book').each(function(){  
  
            var $book = $(this);   
            var title = $book.attr("title");
            console.log("This is the Title:" + title);
            var description = $book.find('description').text();  
            var imageurl = $book.attr('imageurl');  
  
            var html = '<dt> <img class="bookImage" alt="" src="' + imageurl + '" /> </dt>';  
            html += '<dd> <span class="loadingPic" alt="Loading" />';  
            html += '<p class="title">' + title + '</p>';  
            html += '<p> ' + description + '</p>' ;  
            html += '</dd>';  
  
            $('dl').append($(html));  
              
            $('.loadingPic').fadeOut(1400);  
        });  
    });  
    
    
	if ((this.id === "Personal") || (this.id === "Work") || (this.id === "Other")) {
			var appendLocation = $('#XMLDisplay');
			$('#XMLDisplay').innerHTML = "";
			console.log("Running like it should....");
			filterCats = this.id;
			browseCheck = true;
		} else {
			var appendLocation = $('#XMLDisplay');
			$('#XMLDisplay').innerHTML = "";
			console.log("Running like it should.... From XML");
			browseCheck = false;
		}
	for (var i = 0, j = localStorage.length; i < j; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			
			if (browseCheck) {
			console.log(obj.group[1]);
				if (obj.group[1] === filterCats) {
					readyCheck = true;
				} else {
					readyCheck = false;
				}
			} else {
				readyCheck = true;
			}
			
			if (readyCheck) {
				if(browseCheck){
				
				var newImg = document.createElement('img');
				var setSrc = newImg.setAttribute("src", "img/"+ filterCats +".png");
				newImg.setAttribute("height", "128");
				newImg.setAttribute("width", "128");
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				makeNewLi.appendChild(newImg);
				var makeH3 = document.createElement('h3');
				makeH3.innerHTML = obj.remindTitle[1];
				makeNewLi.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description[1];
				makeNewLi.appendChild(makeP);
				makeEntry.setAttribute("id", key);	
					

					
				}else{
				

				var makeEntry = document.createElement('ul');
				makeEntry.setAttribute("data-role", "listview");
				$('#XMLDisplay').append(makeEntry);
				//appendLocation.appendChild(makeEntry);
				var makeNewLi = document.createElement('li');
				makeEntry.appendChild(makeNewLi);
				//makeNewLi.appendChild(newImg);
				var editButton = document.createElement('a');
				editButton.setAttribute("href", "#home");
				editButton.id = obj.id;
				var makeH3 = document.createElement('h6');
				makeH3.innerHTML = obj.remindTitle;
				editButton.appendChild(makeH3);
				var makeP = document.createElement('p');
				makeP.innerHTML = obj.description;
				editButton.appendChild(makeP);
				makeNewLi.appendChild(editButton);
				makeEntry.setAttribute("id", key);
				

				//editButton.addEventListener("click", editItem(obj.id));
			}
			}}		
});


