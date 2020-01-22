// edit is totally seperate from rest of program
console.log("running");



let editButton = document.querySelector("#editEntry");


editButton.addEventListener("click", (e) => {
    let date = document.querySelector("#entry-date").value;
    console.log(date);
    editJournalEntry(1, {"date": `${date}`})
    .then(() => console.log("here"));
    e.preventDefault();
});