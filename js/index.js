var taskInputBtn  = document.getElementById("taskInput");// The input field for adding new tasks
var todoAddButton = document.getElementById("todo-button");// The button to add a new task

// The container that holds all the displayed tasks
var todosContainer = document.getElementById("todos-container");
// The dropdown menu for selecting the task view (all, completed, uncompleted)
var mySelect  = document.getElementById("mySelect");

// The search input field for searching tasks by name

var searchInput=document.getElementById("searchInput");
// An array to store all the tasks
 var allTodos = []
 // If there are tasks stored in local storage, load them into the array and display them
 if(localStorage.getItem('allTodos') !=null){
    allTodos = JSON.parse(localStorage.getItem("allTodos"));
    displayData(allTodos)
 }
 // Add an event listener to the "Add Todo" button to handle adding new tasks
todoAddButton.addEventListener('click',function(){
   // Create a new task object with the input value, completion status, and a unique ID
    var task = {
        taskDetails:taskInputBtn.value,
        isCompleted:false,
        id:`${Math.random()*10000}-${Math.random()*10000}`
    }
       // Add the new task to the allTodos array
    allTodos.push(task);
    // Show a success notification to the user
    showNotification('Task added successfully!', 'success');
       // Save the updated tasks array to local storage
    localStorage.setItem('allTodos',JSON.stringify(allTodos));
      // Display the updated tasks list on the screen
    displayData(allTodos);

    // Clear the input field after adding the task
    clear()
})

// Function to display the tasks on the screen

function displayData(arr) {
    // Initialize an empty string to hold the HTML content
  var cartoona = "";
    // Loop through the array of tasks
  for (var task of arr) {
     // Append HTML for each task to the string, including its details and action buttons
      cartoona += `
      <div class="col-11 todo ${task.isCompleted ? "completed" : ""}">
          <div class="row bg-dark">
              <div class="col-7 py-3 fs-5">${task.taskDetails}</div>
              <div class="col-1 py-3 bg-primary d-flex justify-content-center" onclick="editTask('${task.id}')">
                  <i class="fa-solid fa-pen fs-3 d-flex align-items-center"></i>
              </div>
              <div class="col-2 py-3 bg-success d-flex justify-content-center" onclick="beCompleted('${task.id}')">
                  <i class="fa-solid fa-check fs-3 d-flex align-items-center"></i>
              </div>
              <div class="col-2 py-3 bg-danger d-flex justify-content-center" onclick="deltedTodo('${task.id}')">
                  <i class="fa-solid fa-trash fs-3 d-flex align-items-center"></i>
              </div>
          </div>
      </div>`;
  }
   // Update the inner HTML of the todos container with the generated HTML content
  todosContainer.innerHTML = cartoona;
}





// Function to toggle the completion status of a task
function beCompleted(id){
     // Find the index of the task with the given ID in the allTodos array
 var foundedIndex = allTodos.findIndex(function(task){return task.id == id });

    // Toggle the isCompleted property of the found task
 allTodos[foundedIndex].isCompleted = allTodos[foundedIndex].isCompleted == true ? false : true
    // Save the updated tasks array to local storage
 localStorage.setItem('allTodos',JSON.stringify(allTodos));
   // Update the displayed tasks according to the selected filter (all, completed, uncompleted)
 DisplayAccordingToSelectValue();

}
// Add an event listener to the dropdown menu to handle changes in the selected filter

mySelect.addEventListener('change',function(){
  // Display tasks according to the selected filter value (all, completed, uncompleted)
    DisplayAccordingToSelectValue()
})

// Function to display tasks based on the selected filter value from the dropdown menu
function DisplayAccordingToSelectValue (){
    // Get the selected value from the dropdown menu
    switch(mySelect.options[mySelect.options.selectedIndex].value){
      // If "all" is selected, display all tasks
        case 'all':
            displayData(allTodos);
            break;
              // If "completed" is selected, filter and display only the completed tasks
        case 'completed':
           var compltedFilterd =  allTodos.filter(function(hamada){ return hamada.isCompleted == true});
           displayData(compltedFilterd);
           break;
            // If "uncompleted" is selected, filter and display only the uncompleted tasks
        case 'uncompleted' : 
        var unCompletedFilter =allTodos.filter(function(hambozo){ return hambozo.isCompleted==false});
        displayData(unCompletedFilter)
    }
}




// Function to delete a task by its ID
function deltedTodo(id){
      // Log the ID of the task being deleted for debugging purposes
    console.log(id);
       // Find the index of the task with the given ID in the allTodos array
    var index = allTodos.findIndex(function(task){return task.id == id});
        // Remove the task from the allTodos array using splice
    allTodos.splice(index,1)
     // Update the displayed tasks after deletion
    displayData(allTodos);
     // Show a notification indicating that the task was deleted successfully
    showNotification('Task deleted successfully!', 'error');
       // Save the updated tasks array to local storage
    localStorage.setItem("allTodos",JSON.stringify(allTodos));    
}


// Add an event listener to the search input field to handle input events
searchInput.addEventListener('input',function(e){
  // Log the current value of the search input for debugging purposes
    console.log(e.target.value);

    // Initialize an array to hold the search results
    var searchResult=[] 
    // Loop through all tasks to find matches based on the search input
    for(var i = 0 ; i<allTodos.length ;i++){
        // Check if the task details include the search input (case insensitive)
        if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase())){
           // If a match is found, add the task to the search results array
            searchResult.push(allTodos[i])
        }
    }
      // Display the filtered tasks based on the search results
    displayData(searchResult)
});

// Function to clear the input field for adding new tasks
function clear(){
   // Set the value of the task input field to an empty string
    taskInputBtn.value= ""
}



// Function to display a notification message on the screen
function showNotification(message, type) {
     // Get the container element where notifications will be displayed
  const container = document.getElementById('notification-container');
    // Create a new div element for the notification
  const notification = document.createElement('div');
   // Set the class name of the notification based on the type (success, error, info, etc.)
  notification.className = `notification ${type}`;
   // Set the text content of the notification to the provided message
  notification.textContent = message;
     // Append the notification to the notification container
  container.appendChild(notification);
 // Set a timeout to hide the notification after 3 seconds
  setTimeout(() => {
     // Add a class to trigger the hiding animation
      notification.classList.add('hide');
        // Set another timeout to remove the notification from the DOM after the animation
      setTimeout(() => {
          notification.remove();
      }, 300);
  }, 3000);
}

// Function to edit a task by its ID

function editTask(id) {
   // Find the index of the task with the given ID in the allTodos array
  var foundedIndex = allTodos.findIndex(function(task) { return task.id == id });
    // Get the task details to be edited
  var taskToEdit = allTodos[foundedIndex];

  // Prompt the user to edit the task
  var newTaskDetails = prompt("Edit your task:", taskToEdit.taskDetails);

   // If the user provides a new task (not cancelled)
  if (newTaskDetails !== null) {
     // Update the task details with the new input
      allTodos[foundedIndex].taskDetails = newTaskDetails;
           // Save the updated tasks array to local storage
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
        // Refresh the displayed tasks
      displayData(allTodos);
         // Show a notification indicating that the task was edited successfully
      showNotification('Task edited successfully!', 'info');
  }
}
