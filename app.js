const clear = document.querySelector("#clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("itemInput");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "lineThrough";

//get the item from the local storage
let data = localStorage.getItem('TODO');
let LIST = [];
//check if data is not empty
if(data) {
	LIST = JSON.parse(data)
	loadList(LIST); // load all the items in the array to the UI 
} else {
	//if data is empty
	LIST = [];
}

function loadList(array) {
	array.forEach(item => {
		addToDo(item.name, item.id, item.done, item.trash);
	})
}

function currentTime () {
	// set clock
	let date = new Date;
	let hours = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let midday = "AM";
	midday = (hours >= 12) ? "PM" : "AM";
	hours = updateTimeAndDate(hours);
	min = updateTimeAndDate(min);
	sec = updateTimeAndDate(sec);
	hours = (hours == 0) ? 12 : ((hours > 12) ? (hours - 12): hours)
	document.getElementById('time').innerHTML = hours + ":" + min + ":" + sec + midday;
	setTimeout(currentTime, 1000);
	// set date
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDate();
	month = updateTimeAndDate(month); // instead i could do:  let month = `${date.getMonth()+1}`.padStart(2, "0");
	day = updateTimeAndDate(day);	// instead i could do: let day = `${date.getDate()}`.padStart(2, "0");
	let dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	let weekDay = dayOfTheWeek[date.getDay()];
	document.getElementById('date').innerHTML = year + "." + month + "." + day + " " + weekDay;
}

function updateTimeAndDate(k) {
	if(k < 10){
		return "0" + k;
	} else {
		return k;
	}
}

currentTime();



function addToDo(toDo, id, done, trash) {
	
	// if trash is true do not execute the code below
	if (trash) {return ;}
	const DONE = done ? check : uncheck;
	const LINE = done ? lineThrough : "";
	
	const text =`
	<li class="item">
		<i class="far ${DONE}" id='${id}'></i>
			<div class="description ${LINE} wrap">${toDo}</div>
		<i class="fas fa-trash-alt" id='${id}'></i>
	</li>`;
	const position = "beforeend";
	list.insertAdjacentHTML(position, text);		
}

// complete to-do
function jobComplete(element) { 
	element.classList.toggle(check);
	element.classList.toggle(uncheck);
	element.parentNode.querySelector(".description").classList.toggle(lineThrough);
	LIST.forEach(item => {
		if(item.id === element.id){
			if(item.done){
				item.done = false;
			} else {
				item.done = true;
			}
		}
	})
}	

// remove to-do
function removeToDo(element) {	
	element.parentNode.remove();
	LIST = LIST.filter(element => element.id !== event.target.id);
	localStorage.setItem('TODO', JSON.stringify(LIST));
	console.log(LIST);
	return LIST;
}

// click listener for job complete and job delete
list.addEventListener('click', e => {
	const element = e.target;
	if(e.target.className == "fas fa-trash-alt" ){
		removeToDo(element);
	}else if(e.target.className == "far fa-circle") {
		jobComplete(element);
	}else if(e.target.className == "far fa-check-circle"){
	 	jobComplete(element);
	}	
})

//add a task with "enter" key
document.addEventListener("keyup", (event) => {
	if(event.keyCode == 13){
		const toDo = input.value;
			if(toDo) {
				//gen id
				const id = uuidv4();
				addToDo(toDo, id, false, false);
				LIST.push(
					{
						name: toDo,
						id: id,
						done: false,
						trash: false
					}
				);
				localStorage.setItem('TODO', JSON.stringify(LIST));
				input.value = '';
			}
		}
})
//clear all items
clear.addEventListener('click', () => {
	localStorage.clear()
	location.reload();
	}
)

// add a task by clicking the plus icon
document.getElementById("addButton").addEventListener('click', (event) =>{
	const toDo = input.value;	
	if(toDo) {
		//gen id
		const id = uuidv4();
		addToDo(toDo, id, false, false);
		LIST.push(
			{
				name: toDo,
				id: id,
				done: false,
				trash: false
			}
			
		);
		localStorage.setItem('TODO', JSON.stringify(LIST));
		input.value = '';
		
	}
})
