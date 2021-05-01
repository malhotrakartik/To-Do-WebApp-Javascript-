let tc = document.querySelector(".ticket-container");

let allFilters = document.querySelectorAll(".filter");
let selectedPriority = "pink";
// let allTasks = [];
function loadTickets(priority){
    let allTaskData = localStorage.getItem("allTasks");
 

if(allTaskData != null) {
    let data = JSON.parse(allTaskData);
    if(priority){
       data = data.filter((ticket) => {
            return ticket.selectedPriority == priority;
        })
    }
    tc.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");
        ticket.innerHTML =  `<div class="ticket-color ticket-color-${data[i].selectedPriority}"></div>
                    <div class="ticket-id">${data[i].taskId}</div>
                    <div class="task">
                        ${data[i].task}
                    </div>`;
        ticket.addEventListener("click", function(e) {
            if(e.currentTarget.classList.contains("active")) {
                e.currentTarget.classList.remove("active");
            } else {
                e.currentTarget.classList.add("active");
            }
        });
        tc.appendChild(ticket);
    }
}
}

loadTickets();

let deleteButton = document.querySelector(".delete");

for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", filterHandler);
}
function filterHandler(e) {
    if(e.currentTarget.classList.contains("active")){
        e.currentTarget.classList.remove("active");loadTickets();
    }else{
        let selectedFilter = document.querySelector(".filter.active");
        if(selectedFilter){
          selectedFilter.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        let color = e.currentTarget.children[0].classList[0].split("-")[0];
        loadTickets(color);


    }

}
let modalVisible = false;

let addButton = document.querySelector(".add");
addButton.addEventListener("click", showModal);
function showModal(e) {
    if (!modalVisible) {
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
        <div class="task-to-be-added" data-type="false" contenteditable="true">
            <span class="placeholder">Enter Your Text Here</span>
        </div>
        <div class="priority-list">
            <div class="modal-filter pink-modal-filter active"></div>
            <div class="modal-filter blue-modal-filter"></div>
            <div class="modal-filter yellow-modal-filter"></div>
            <div class="modal-filter green-modal-filter"></div>
    </div>`

        tc.appendChild(modal);
        let taskTyper = document.querySelector(".task-to-be-added");
        taskTyper.addEventListener("click", (e) => {
            if (e.currentTarget.getAttribute("data-type") == "false") {

                e.currentTarget.setAttribute("data-type", "true");
                e.currentTarget.innerHTML = "";


            }
        })
        taskTyper.addEventListener("keypress", addTicket.bind(this, taskTyper));
        modalVisible = true;
        let modalFilters = document.querySelectorAll(".modal-filter");
        for (let i = 0; i < modalFilters.length; i++) {
            modalFilters[i].addEventListener("click", setPriority);
        }

    }


}
function setPriority(e) {
    let activeFilter = document.querySelector(".modal-filter.active");
    selectedPriority = e.currentTarget.classList[1].split("-")[0];
    console.log(selectedPriority);
    activeFilter.classList.remove("active");
    e.currentTarget.classList.add("active");

}
function addTicket(taskTyper, e) {
    if (e.key == "Enter" && e.shiftKey == false && taskTyper.innerText.trim() != "") {
        let ticket = document.createElement("div");
        let id = uid();
        let task = taskTyper.innerText;
        ticket.classList.add("ticket");
        ticket.innerHTML = `
        <div class="ticket-color ticket-color-${selectedPriority}"></div>
        <div class="ticket-id">${id}</div>
        <div class="task">
          ${task}
        
    </div>`
        document.querySelector(".modal").remove();
        ticket.addEventListener("click",(e)=>{
            if(e.currentTarget.classList.contains("active")){
                e.currentTarget.classList.remove("active");
            }else{
                e.currentTarget.classList.add("active");
            }
        })
        
        // tc.innerHTML = tc.innerHTML + ticket;
        // tc.innerHTML = tc.innerHTML + ticket;

        let allTaskData = localStorage.getItem("allTasks");
        if(allTaskData == null) {
            let data = [{"taskId" : id, "task" : task, "selectedPriority" : selectedPriority}];
            localStorage.setItem("allTasks", JSON.stringify(data));
        } else {
            let data = JSON.parse(allTaskData);
            data.push({"taskId" : id, "task" : task, "selectedPriority" : selectedPriority});
            localStorage.setItem("allTasks", JSON.stringify(data));
        }
        tc.appendChild(ticket);
        modalVisible = false;
        selectedPriority = "pink";

    } else if (e.key == "Enter" && e.shiftKey == false) {
        e.preventDefault();
        alert("Your Task Is Empty");
    }
}

deleteButton.addEventListener("click",(e)=>{
    let selectedTickets = document.querySelectorAll(".ticket.active");
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    for(let i=0;i<selectedTickets.length;i++){
           selectedTickets[i].remove();
           allTasks = allTasks.filter((data) =>{ 
               return data.taskId != selectedTickets[i].querySelector(".ticket-id").innerText;
           })
    }
    localStorage.setItem("allTasks",JSON.stringify(allTasks));
})