const validate = {
    createFormChecker(formInputArray) {
        
        let checkForm = [];
        formInputArray.forEach(element => {
            const elementValue = element.value;
            const boolean = !(/\S/.test(elementValue));
            const value = elementValue;
            
            checkForm.push({
                boolean: boolean,
                value: value
            });
        });
        

        let formHasSpaces = checkForm.some(element => element.boolean === true);
        let formIsEmpty = checkForm.some(element => element.value === "");

        return [formHasSpaces, formIsEmpty];
    }
};

export default validate;