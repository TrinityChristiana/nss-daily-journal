const collectInput = {
    getInputValues(id, item) {
        let selector = document.querySelector(`${id}`);
        let value = document.querySelector(`${id}`).value;

        return {
            name: item,
            selector: selector,
            value: value
        };
    }

}

export default collectInput;