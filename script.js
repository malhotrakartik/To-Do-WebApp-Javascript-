let tc = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
for(let i =0;i<allFilters.length;i++){
allFilters[i].addEventListener("click",filterHandler);
}
function filterHandler(e){
    let filter = e.currentTarget.children[0].classList[0];
    tc.style.backgroundColor = filter.split("-")[0];

}
let modalVisible = false;

let addButton = document.querySelector(".add");
addButton.addEventListener("click",showModal);
function showModal(e){
    if(!modalVisible){
        let modal = `<div class="modal">
        <div class="task-to-be-added" data-type="false" contenteditable="true">
            <span class="placeholder">Enter Your Text Here</span>
        </div>
        <div class="priority-list">
            <div class="modal-filter pink-modal-filter active"></div>
            <div class="modal-filter blue-modal-filter"></div>
            <div class="modal-filter yellow-modal-filter"></div>
            <div class="modal-filter green-modal-filter"></div>
    
        </div>
    </div>`
    
    tc.innerHTML = tc.innerHTML + modal;
    let taskTyper = document.querySelector(".task-to-be-added");
    taskTyper.addEventListener("click",(e)=>{
        if(e.currentTarget.getAttribute("data-type") == "false"){

            e.currentTarget.setAttribute("data-type","true");
            e.currentTarget.innerHTML = "";


        }
    })
    modalVisible = true;
    let modalFilters = document.querySelectorAll(".modal-filter");
    for(let i=0;i<modalFilters.length;i++){
        modalFilters[i].addEventListener("click",setPriority);
    }

    }
    
    
}
function setPriority(e){
    let activeFilter = document.querySelector(".modal-filter.active");
    activeFilter.classList.remove("active");
    e.currentTarget.classList.add("active");
        
}