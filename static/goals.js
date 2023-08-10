
$(document).ready(function()
{	$('#add-stat').on('submit',function(e)
	{

//this var will be used to reset the form
const form = document.getElementById("add-goal-form");
//later used to insert rows in the table 
const table = document.getElementById("goals-table").getElementsByTagName('tbody')[0];

form.addEventListener("submit", function(event) {
// after this click form should get submitted to db
//use another function to load already added goals 
  event.preventDefault();
  const name = document.getElementById("goal-name").value;
  const description = document.getElementById("goal-description").value;
  const startDate = document.getElementById("goal-start-date").value;
  const endDate = document.getElementById("goal-end-date").value;
  const targetAmount = document.getElementById("goal-target-amount").value;
  const row = table.insertRow();

  row.insertCell().innerText = name;
  row.insertCell().innerText = description;
  row.insertCell().innerText = startDate;
  row.insertCell().innerText = endDate;
  row.insertCell().innerText = targetAmount;
  const progressCell = row.insertCell();
  const progressWrapper = document.createElement("div");
  const progressBar = document.createElement("progress");
  progressBar.value = 0;
  progressBar.max = targetAmount;
  progressWrapper.appendChild(progressBar);
  const progressPercent = document.createElement("div");
  progressPercent.classList.add("progress-percent");
  progressPercent.innerText = "0%";
  progressWrapper.appendChild(progressPercent);
  progressCell.appendChild(progressWrapper);
  const actionsCell = row.insertCell();
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", function() {
    const newProgress = prompt("Enter new progress amount:");
    if (newProgress !== null) {
      progressBar.value = newProgress;
      progressPercent.innerText = Math.round(newProgress / targetAmount * 100) + "%";
    }
  });
  actionsCell.appendChild(editButton);
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function() {
    row.remove();
  });
  actionsCell.appendChild(deleteButton);

  form.reset();
});

table.addEventListener("click", function(event) {
  if (event.target.tagName === "PROGRESS") {
    const newProgress = prompt("Enter new progress amount:");
    if (newProgress !== null) {
      event.target.value = newProgress;
      const progressPercent = event.target.parentNode.querySelector(".progress-percent");
      progressPercent.innerText = Math.round(newProgress / event.target.max * 100) + "%";
    }
  }
});
