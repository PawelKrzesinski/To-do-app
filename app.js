const clear = document.querySelector("#clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("itemInput");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "lineThrough";

let LIST = [];


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
				id++;
				input.value = '';
			}
		}
})
