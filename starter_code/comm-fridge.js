
var xhttp;
var xhttpF;
var data1;

window.onload = function(){
	let pageId = document.getElementsByTagName("body")[0].id;
	if(pageId != null && pageId == "view_items"){
		displayFridges(pageId);
	}
	if(pageId != null && pageId == "add_items"){
		retrieveGroceryData();
	}
}

function displayFridges(pageId){
	let fridgesSection = document.getElementById("fridges");
	let header = document.createElement("h1");
	header.textContent = "Available fridges";
	fridgesSection.appendChild(header);
	xhttpF = new XMLHttpRequest();
	xhttpF.open("GET", "http://localhost:8000/js/comm-fridge-data.json" , true);
	xhttpF.onload = function(){
		if(xhttpF.readyState === XMLHttpRequest.DONE && xhttpF.status === 200){
			let data = JSON.parse(xhttpF.responseText);								//get all the data from the JSON file
			for(let i = 0; i < data.length; i++){
				let fridgeData = document.createElement("div");
				fridgeData.id = "fridge_" + i;
				let fridgeContent = "<img src='images/fridge.svg'></span>";
				fridgeContent += "<span><strong>" + data[i].name + "</strong></span>";
				fridgeContent	+= "<span>" + data[i].address.street + "</span>";
				fridgeContent += "<span>" + data[i].contact_phone + "</span>"
		
				fridgeData.innerHTML = fridgeContent;
				fridgeData.addEventListener("click", function(event){
					let fridgeID = event.currentTarget.id.split("_")[1];
					displayFridgeContents(parseInt(fridgeID), data);
				});
				fridgesSection.appendChild(fridgeData);
			}
		}
	}
	xhttpF.send();
}

function displayFridgeContents(fridgeID,fridges ){	
	document.getElementById("frigeHeading").innerHTML = "Items in the " + fridges[fridgeID].name;
	let bioInformation = "<span id='fridge_name'>" + fridges[fridgeID].name + "</span><br />" + fridges[fridgeID].address.street + "<br />" + fridges[fridgeID].contact_phone;

	document.getElementById("left-column").firstElementChild.innerHTML = bioInformation;
	document.getElementById("meter").innerHTML = "<span style='width: " + (fridges[fridgeID].capacity + 14.2)  + "%'>" + fridges[fridgeID].capacity + "%</span>";

	populateLeftMenu(fridgeID, fridges);

  let mdElements = "";
  for(let k = 0; k<fridges[fridgeID].items.length; k++){ //create all the fridge items
	mdElements += "<div id='item-" + fridges[fridgeID].items[k].name + "' class='item " + fridges[fridgeID].items[k].type + "'>";
	mdElements += "<img src='" + fridges[fridgeID].items[k].img + "' width='100px' height='100px'; />";
	mdElements += "<div id='item_details'>";
	mdElements += "<p>" + fridges[fridgeID].items[k].name + "</p>";
	mdElements += "<p>Quantity: <span id='qt-" + fridges[fridgeID].items[k].name + "'>" + fridges[fridgeID].items[k].quantity + "</span></p>";
	mdElements += "<p>Pickup item:</p>";
	mdElements += "</div></div>";
	}
	document.getElementById("middle-column").innerHTML = mdElements;
	document.getElementById("fridges").classList.add("hidden");
	document.getElementById("fridge_details").classList.remove("hidden");
}

function populateLeftMenu(fridgeID, fridges){		//creates the item categories
	let categories = {};

	for(let k = 0; k<fridges[fridgeID].items.length; k++){
		let type = fridges[fridgeID].items[k].type;
		if(type in categories == false){
			categories[type] = 1;
		}
		else {
			categories[type]++;
		}
	}

	let leftMenu = document.getElementById("categories");
	for (const[key, value] of Object.entries(categories)){
		let label = key.charAt(0).toUpperCase() + key.slice(1);
		let listItem = document.createElement("li");
		listItem.id = key;
		listItem.className = "category";
		listItem.textContent = label + " (" + value  + ")";

		listItem.addEventListener("click", filterMiddleView);
		leftMenu.appendChild(listItem);
	}
}

function filterMiddleView(event){
	let elements = document.getElementById("middle-column").children;
	let category = event.target.id;

	for(let i = 0; i < elements.length; i++){
		let item = elements[i];
		if(!item.classList.contains(category)){
			item.classList.add("hidden");
		}
		else{
			item.classList.remove("hidden");
		}
	}
}

function retrieveGroceryData(){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = DropOff;
	xhttp.open("GET", "http://localhost:8000/js/comm-fridge-items.json" , true);
	xhttp.send();
}

//grocery_items
function DropOff(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
		let dropdown = document.getElementById('grocery_items');
		let defaultOption = document.createElement('option');
		defaultOption.text = "Select a Grocery Item";
		dropdown.add(defaultOption);
		dropdown.selectedIndex = 0;
		data1 = JSON.parse(xhttp.responseText);
		let option;
		for(let i = 0; i<data1.length; i++){			//populates the drop down menu of items that can be selected
			option = document.createElement("option");
			option.text = data1[i].name;
			dropdown.add(option);
		}
		enButton();
	}
	else {
		console.log("There was a problem with the request.");
	}
}

function enButton(){
	let dropdown = document.getElementById('grocery_items');
	let numInput = document.getElementById('number_items');
	let addButt = document.getElementById('add_item');
	dropdown.addEventListener("click", checkTextField);
	numInput.addEventListener("input", checkTextField);
	addButt.addEventListener("click", addItemClick);
}

function checkTextField(event){
	document.getElementById("submit_btn").disabled = true;
	var valueDrop = document.getElementById('grocery_items').selectedOptions[0].value;
	if(valueDrop != "Select a Grocery Item"){
		document.getElementById("respArea").style.display = "none";
		var valueNum = document.getElementById('number_items').value;
		if(valueNum>0 && valueNum*10%10 == 0){							//ensures to only enable the frind fridges button when all the fields are entered correctly
			document.getElementById("respArea").style.display = "none";
			document.getElementById("submit_btn").disabled = false;
			document.getElementById("submit_btn").addEventListener("click", fridgeList);
		}
	}
}


function fridgeList(){
	document.getElementById("view_results").style.display = "block";
	xhttpF = new XMLHttpRequest();
	xhttpF.open("GET", "http://localhost:8000/js/comm-fridge-data.json" , true);
	xhttpF.onload = function(){
		if(xhttpF.readyState === XMLHttpRequest.DONE && xhttpF.status === 200){
			let res =  document.getElementById("respArea");
			res.innerHTML = "The item has been successfully added to the fridge!";
			let fridgeList = document.getElementById('view_results');
			let fHead = document.createElement("HEADER");
			fHead.innerHTML = "Available fridges:" + "</br>";
			fridgeList.innerHTML = "";
			fridgeList.innerHTML = fHead.innerHTML.fontsize(4);
			let data = JSON.parse(xhttpF.responseText);
			let option;
			const quantity = [];
			const cap = [];
			const id = [];
			let idC = 0;
			let qpos = 0;
			let cpos = 0;
			for(let i = 0; i<data.length; i++){	//loops throught each fridge
				var item = document.getElementById('grocery_items').selectedOptions[0].value;
				var itemNum = document.getElementById('number_items').value;
				if(data[i].capacity != 100){
					for(let k = 0; k<data[i].accepted_types.length; k++){
						let typeItem;
						for(let q = 0; q<data[i].items.length; q++){
							if(data[i].items[q].name.localeCompare(item) == 0){
								typeItem = data[i].items[q].type;
							}
						}
						if(data[i].accepted_types[k].localeCompare(typeItem) == 0 ){
							if(data[i].can_accept_items >= itemNum){		//checks to make sure only the appropriate fridges are added to be selected
								option = document.createElement("div");
								option.id = data[i].name;
								option.innerHTML ='<img src="images/fridge.svg" />' + data[i].name + "</br>" + data[i].address.street + "</br>" + data[i].contact_phone + "</br>" + "Capacity: "+ data[i].capacity +"%" + "</br>" + "Can accept # of items: " + data[i].can_accept_items;
								//fridgeList.innerHTML = fridgeList.innerHTML + option.innerHTML;
								for(let s = 0; s<data[i].items.length; s++){
									if(data[i].items[s].name.localeCompare(item) == 0){
										quantity[qpos] = data[i].items[s].quantity;
										qpos++;
									}
								}
								cap[cpos] = data[i].capacity
								cpos++;
								id[idC] = data[i].name
								idC++;
								fridgeList.appendChild(option);
								option.onclick = () => {                          
									fridgeClick(i, data);	//once a fridge is selected the data is then proccesed and writen to the JSON
								}

							}
						}
					}
				}
			}
			bestFridge(quantity, cap, id);	//checks of the fridges that have been added which one is the best option (selected in green)
		}
	}
	xhttpF.send();
}

function bestFridge(numQ, caps, names){
	if(numQ.length == 1){
		document.getElementById(names[0]).classList.add("recommended");
	}
	if(numQ.length == 2){
		if(numQ[0] == numQ[1]){
			if(caps[0] < caps[1]){
				document.getElementById(names[0]).classList.add("recommended");
			}else{
				document.getElementById(names[1]).classList.add("recommended");
			}
		}else{
			if(numQ[0] < numQ[1]){
				document.getElementById(names[0]).classList.add("recommended");
			}else{
				document.getElementById(names[1]).classList.add("recommended");
			}
		}
	}
	if(numQ.length == 3){
		if(numQ[0] == numQ[1] == numQ[2]){
			let sIndex = 0;
			for(let k = 0; k<caps.length;k++){
				if(caps[k] < caps[sIndex]){
					sIndex = k;
				}
			}
			document.getElementById(names[sIndex]).classList.add("recommended");
		}else if(numQ[0] == numQ[1]){
			if(numQ[0] < numQ[2]){
				if(caps[0] < caps[1]){
					document.getElementById(names[0]).classList.add("recommended");
				}else{
					document.getElementById(names[1]).classList.add("recommended");
				}
			}else{
				document.getElementById(names[2]).classList.add("recommended");
			}

		}else if(numQ[1] == numQ[2]){
			if(numQ[1] < numQ[0]){
				if(caps[1] < caps[2]){
					document.getElementById(names[1]).classList.add("recommended");
				}else{
					document.getElementById(names[2]).classList.add("recommended");
				}
			}else{
				document.getElementById(names[0]).classList.add("recommended");
			}
		}
		else if(numQ[0] == numQ[2]){
			if(numQ[0] < numQ[1]){
				if(caps[0] < caps[2]){
					document.getElementById(names[0]).classList.add("recommended");
				}else{
					document.getElementById(names[2]).classList.add("recommended");
				}
			}else{
				document.getElementById(names[1]).classList.add("recommended");
			}
		}else{
			let sIndex = 0;
			for(let k = 0; k<numQ.length;k++){
				if(numQ[k] < numQ[sIndex]){
					sIndex = k;
				}
			}
			document.getElementById(names[sIndex]).classList.add("recommended");
		}
	}
}

function fridgeClick(fridgeNum, jsonInfo){ 	//num_items_accepted, can_accept_items, items
	let q;
	document.getElementById("respArea").style.display = "block";
	var item = document.getElementById('grocery_items').selectedOptions[0].value;
	var itemNum = document.getElementById('number_items').value;
	jsonInfo[fridgeNum].num_items_accepted = parseInt(jsonInfo[fridgeNum].num_items_accepted) + parseInt(itemNum);
	jsonInfo[fridgeNum].can_accept_items = jsonInfo[fridgeNum].can_accept_items - parseInt(itemNum);
	for(let k = 0; k<jsonInfo[fridgeNum].items.length; k++){
			if(jsonInfo[fridgeNum].items[k].name == item){
				jsonInfo[fridgeNum].items[k].quantity = jsonInfo[fridgeNum].items[k].quantity + parseInt(itemNum);
				q = jsonInfo[fridgeNum].items[k].quantity;
			}
	}
	let p = 0;
	let URL = "http://localhost:8000/index.html";
	let data = "?=&num_items=" + jsonInfo[fridgeNum].num_items_accepted;
	data += "&can_accept=" + jsonInfo[fridgeNum].can_accept_items;
	data += "&quantity=" + q;
	data += "&fnum=" + fridgeNum;
	data += "&Iname=" + item;
	data += "&pro=" + p;
	sendData(URL, data);	//writes to JSON file

}

function sendData(URL, data){
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = nothing; // specify what should happen when the server sends a response
  xhttp.open("POST", URL, true); // open a connection to the server using the GET prot
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);
}

function nothing(){

}

function addItemClick(){		//ensures only the appropriate divs are shown when the add item is selected
	document.getElementById("respArea").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("item").style.display = "block";
	document.getElementById("view_results").style.display = "none";
	document.getElementById('item_name').value = "";
	document.getElementById('item_type').value = "";
	document.getElementById('item_img').value = "";
	document.getElementById("submit_btn1").disabled = true;
}

function takeItem(){ // adds the typed in item to the list of items and shows the correct info 
	var valueName = document.getElementById('item_name').value;
	var valueType = document.getElementById('item_type').value;
	var valueImg = document.getElementById('item_img').value;
	if(valueName.length != 0 && valueType.length != 0 && valueImg.length != 0){
		let sub = document.getElementById("submit_btn1");
		sub.disabled = false;
		sub.onclick = () => { 
			let dropdown = document.getElementById('grocery_items');
			let	newOption = document.createElement('option');
			newOption.text = valueName;
			dropdown.add(newOption);
			let res =  document.getElementById("respArea");
			res.innerHTML =   valueName + " was successfully added to the items list!";  
			res.style.display = "block";
			document.getElementById("items").style.display = "block";
			document.getElementById("item").style.display = "none";
			document.getElementById("view_results").style.display = "block";
			document.getElementById('grocery_items').value = "";
			document.getElementById('number_items').value = "";
			document.getElementById('view_results').innerHTML = "";
			let newItem = {
				name: valueName,
				type: valueType,
				img: valueImg
			};

			data1.push(newItem);
			let p = 1;
			let URL = "http://localhost:8000/index.html";
			let data = "?=&valN=" + valueName;
			data += "&valT=" + valueType;
			data += "&valI=" + valueImg;
			data += "&pro=" + p;
			sendData(URL, data); //writes to JSON file
		}
	}
}

