const clear = document.querySelector("#clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("itemInput");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "lineThrough";

//get the item from the local storage
let data = localStorage.getItem('TODO');

//check if data is not empty
if(data) {
	LIST = JSON.parse(data)
	loadList(LIST); // load all the items in the array to the UI 
} else {
	//if data is empty
	LIST = [];

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

