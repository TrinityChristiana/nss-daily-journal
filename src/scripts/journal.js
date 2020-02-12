// Main Js File
import convertEntryData from './convertEntryData.js';
import entriesDOM from './entriesDOM.js';
import API from './data.js';
import collectInput from './collectInput.js';
import validate from './validate.js';

let clickedID;
let backUpdateArray = null;
// // sessionStorage.removeItem(`entry-data`);
let entries = JSON.parse(sessionStorage.getItem(`entry-data`));

entriesDOM.renderMoods();

let eventHandler = id => {
	event.preventDefault();
	const inputArray = createCheckBooleans();
	const checkForm = validate.createFormChecker(inputArray);
	const formHasSpaces = checkForm[1];
	const formIsEmpty = checkForm[2];

	let date = document.querySelector('#entry-date').value;
	let concept = document.querySelector('#concept-text').value;
	let entry = document.querySelector('#journal-entry').value.trim();
	let mood = document.querySelector('#mood-select').value;

	if (formHasSpaces) {
		alert('Please enter in all information');
		e.preventDefault();
	} else if (!formIsEmpty) {
		entriesDOM.showSubmitEntryButton();
		const editedEntryObj = {
			date: `${date}`,
			concept: `${concept}`,
			entry: `${entry}`,
			moodId: `${mood}`
		};
		API.editJournalEntry(id, editedEntryObj)
			.then(() => {
				renderDOM(true);
				document.getElementById('entry-date').value = '';
				document.getElementById('concept-text').value = '';
				document.getElementById('journal-entry').value = '';
				document.getElementById('mood-select').value = '';
			})
			.catch(() => {
				backUpData(Number(id), editedEntryObj);
			});
	}
};

const renderDOM = (hasUpdated, wasEdited) => {
	API.getJournalEntries().then(data => {
		entries = JSON.parse(sessionStorage.getItem(`entry-data`));
		composeDOM(data);

		for (let i = 0; i < moodFilter.length; i++) {
			moodFilter[i].addEventListener('click', () => {
				document.querySelector('.entryLog').innerHTML = '';
				const filterBy = moodFilter[i].value;
				const moodFiltered = data.filter(entry => {
					if (entry.mood.label == filterBy) return entry;
				});

				let component = [];
				composeDOM(moodFiltered);
			});
		}
	});

	const editEntryButton = document.getElementById('editEntry');

	editEntryButton.addEventListener(
		'click',
		function _listener() {
			eventHandler(clickedID);
			editEntryButton.removeEventListener('click', _listener, true);
		},
		true
	);
};
const composeDOM = entries => {
	document.querySelector('.entryLog').innerHTML = '';
	let component = [];
	entries.forEach(entry => {
		let section = convertEntryData.makeJournalEntryComponent(entry);
		let deleteButton = section.querySelector('.deleteButton');
		let editButton = section.querySelector('.editButton');
		component.push(section);
		deleteButton.addEventListener('click', e => {
			deleteEntry(e.target.parentElement.id);
		});
		editButton.addEventListener('click', e => {
			// Shows entry values in form to edit
			entriesDOM.renderEntryInput(e).then(() => {
				entriesDOM.showEditEntryButton();
				clickedID = e.target.parentNode.id;
			});
		});
	});

	entriesDOM.renderJournalEntries(component);
};

renderDOM(false);

const deleteEntry = id => {
	API.deleteJournalEntry(id)
		.then(() => renderDOM(true))
		.catch(error => {
			alert('Entries cannot be deleted at this time');
		});
};

const createCheckBooleans = () => {
	const inputArray = [];

	// collect form values in an Obj
	const dateObj = collectInput.getInputValues('#entry-date', 'date');
	const conceptObj = collectInput.getInputValues('#concept-text', 'concept');
	const entryObj = collectInput.getInputValues('#journal-entry', 'entry');
	const moodObj = collectInput.getInputValues('#mood-select', 'mood');

	// Pushes obj to array
	inputArray.push(dateObj);
	inputArray.push(conceptObj);
	inputArray.push(entryObj);
	inputArray.push(moodObj);

	// checks form to see if any fields are empty or filled with spaces

	return inputArray;
	// pulls out boolean values of checkForm for conditional
};

// Listen for Submit Button Click
document.getElementById('submitEntry').addEventListener('click', e => {
	e.preventDefault();

	const inputArray = createCheckBooleans();
	const checkForm = validate.createFormChecker(inputArray);
	const formHasSpaces = checkForm[1];
	const formIsEmpty = checkForm[2];
	if (formHasSpaces) {
		alert('Please enter in all information');
		e.preventDefault();
	} else if (!formIsEmpty) {
		const newJournalEntry = convertEntryData.createEntryObject(inputArray);
		e.preventDefault();

		API.saveJournalEntry(newJournalEntry) /* post */
			/* .then(get) */
			.then(() => renderDOM(true));

		inputArray[0].selector.focus();
		document.getElementById('entry-date').value = '';
		document.getElementById('concept-text').value = '';
		document.getElementById('journal-entry').value = '';
		document.getElementById('mood-select').value = '';
	}
});

const backUpData = (id, editedEntryObj) => {
	if (backUpdateArray == null) {
		backUpdateArray = [];
		entries.forEach(element => {
			backUpdateArray.push(element);
		});
		sessionStorage.setItem(`backupData`, JSON.stringify(entries));
	} else {
		if (typeof id == 'number') {
			editedEntryObj.id = id;
			backUpdateArray.forEach((element, index) => {
				if (id == element.id) {
					backUpdateArray[index] = editedEntryObj;
				}
			});
		} else {
		}

		sessionStorage.setItem(`backupData`, JSON.stringify(backUpdateArray));
		renderDOM(true, true);
	}
};

let moodFilter = document.forms['mood-filter-form'].getElementsByTagName(
	'input'
);

document.getElementById('searchBox').addEventListener('keyup', e => {
	if (e.keyCode == 13) {
		const data = JSON.parse(sessionStorage.getItem(`entry-data`));
		const searchKeyword = document.getElementById('searchBox').value;
		let idCollection = [];
		for (const prop in data) {
			for (const value of Object.values(data[prop])) {
				const valueStr = JSON.stringify(value).toLowerCase();

				if (
					typeof value != 'number' &&
					valueStr.includes(searchKeyword.toLowerCase())
				) {
					idCollection.push(data[prop].id);
				}
			}
		}
		idCollection = new Set(idCollection);
		const searchFiltered = data.filter(entry => {
			let equal = false;
			idCollection.forEach(id => {
				if (entry.id == id) equal = true;
			});

			if (equal == true) return entry;
		});

		composeDOM(searchFiltered);
	}
});

// TODO: Make a collection of moods.
