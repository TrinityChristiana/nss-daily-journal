// Move the code that deals with getting the data into this file.
const API = {
    getJournalEntries () {
        return fetch("http://localhost:8088/journalEntries")
            .then(response => response.json());
    }
};

export default API;