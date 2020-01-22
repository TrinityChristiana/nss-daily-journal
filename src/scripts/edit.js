// edit is totally seperate from rest of program
console.log("running");

const editJournalEntry = (id, entryObj) => {
        
    return fetch(`http://localhost:8088/journalEntries/${id}`, { // Replace "url" with your API's URL
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    });
}

let editButton = document.querySelector("#editEntry");


editButton.addEventListener("click", (e) => {
    let date = document.querySelector("#entry-date").value;
    console.log(date);
    editJournalEntry(1, {"date": `${date}`})
    .then(() => console.log("here"));
    e.preventDefault();
});