const collectInput = {
    getInputValues(id, item) {
        let selector = document.querySelector(`${id}`);
        let value = document.querySelector(`${id}`).value;

        return {
            name: item,
            selector: selector,
            value: value
        };
    },
    getFilterValues(id) {
        let filter = document.getElementById(id).value();
        return filter;
    }

}

export default collectInput;