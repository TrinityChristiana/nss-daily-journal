// Move the code that deals with getting the data into this file.
const API = {
    // Read
    getJournalEntries() {
        return fetch("http://localhost:8088/journalEntries")
            .then(response => response.json());
    },
    saveJournalEntry(entryObj) {
        // Create
        return fetch("http://localhost:8088/journalEntries", { // Replace "url" with your API's URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        });
    },
    // Delete
    deleteJournalEntry(id) {
        
        return fetch(`http://localhost:8088/journalEntries/${id}`, { // Replace "url" with your API's URL
            method: "DELETE"
        });
    }
};

export default API;