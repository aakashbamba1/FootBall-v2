class ValidationResponse {
    /**
     * create new instance of ValidationData
     * 
     * @param {boolean} status set false, if there is any validation error, else true.
     * @param {boolean} success set false, if there is any error occured while processing, else true.
     */
    constructor(status, success) {
      this.status = status;
      this.success = success;

      this.data = [];
    }

    /**
     * add new failed validation feild into data
     * 
     * @param {ValidationData} validationData
     */
    addInvalidFeild(validationData){

        var objIdx = this.data.findIndex(c=> c.feildname === validationData.feildname )

        if(objIdx < 0){
            this.data.push(validationData);
        }
        else{
            this.data[objIdx].isValid = validationData.isValid;
            this.data[objIdx].feedbackMesssage = validationData.feedbackMesssage;
        }        
    }
}

class ValidationData{

    /**
     * create new instance of ValidationData
     * 
     * @param {string} feildname selector feild attribute name
     * @param {boolean} isValid is feild data valid
     * @param {string} feedbackMesssage valiation failure message
     */
    constructor(feildname, isValid, feedbackMesssage){
        this.feildname = feildname;
        this.isValid = isValid;
        this.feedbackMesssage = feedbackMesssage;
    }
}

/**
 * method will validate .form-feild form, returns instance with data corrosponding to invlid feilds data.
 * 
 * @returns {ValidationData} validationData
 */
  
function formFeildsDisperency(){

    var validationRes = new ValidationResponse(true, true);

    var formFeilds = document.querySelectorAll(".form-feild");

    formFeilds.forEach(        
        function(currentEle, currentIndex, listObj) {      

            if(currentEle.type == "text"){
                var textValue = currentEle.value;

                if(textValue == undefined || textValue == ""){

                    if(currentEle.name == "pincode" || currentEle.name == "lastname"){
                        return;
                    }

                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.emptyValue));
                    //go to next iteration
                    return;
                }

                if(currentEle.inputMode == "text"){

                    if(!isAlphabatesOnly(currentEle.value)){                        
                        validationRes.status = false;
                        validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.alphabatesAllowed));
                        return;
                    } 
                }
        
                if(!isSanitizedValue(textValue)){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.santizationFailure));
                    //go to next iteration
                    return;
                }
                
                if(currentEle.inputMode != "numeric"){                    
                    return;
                }        
                
                if(!isNumericKey(currentEle.value)){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.numericAllowed));
                    return;
                }

                if(currentEle.name == "phonenumber" && !isValueCompleteLength(currentEle.value, PHONE_NUMBER_LENGTH)){            
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.controlledLength));
                    return;
                }
                else if(currentEle.name == "pincode" && !isValueCompleteLength(currentEle.value, PINCODE_LENGTH)){            
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.controlledLength));
                    return;
                }

                return;        
            }    
        
            else if(currentEle.type == "textarea"){
                var textValue = currentEle.value;
        
                if(!isSanitizedValue(textValue)){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.santizationFailure));
                    return;
                }

                return;
            }
        
            else if(currentEle.type == "email"){
                var textValue = currentEle.value;

                if(textValue == undefined || textValue == ""){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.emptyValue));
                    //go to next iteration
                    return;
                }
        
                if(!isSanitizedValue(textValue)){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.santizationFailure));
                    return;
                }
        
                if(!isValidEmail(textValue)){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.invalidEmail));
                    return;
                }

                return;
            }

            else if(currentEle.type == "radio" || currentEle.type == "checkbox"){

                var feildGroupName = currentEle.name;
                var isAnyChecked = isAtleastCheckInputChecked(`input[name='${feildGroupName}']`);
                
                if(!isAnyChecked){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.leastCheckInputSelection));
                    return;
                }

                //remove any error validation
                var ele = document.querySelectorAll(`input[name='${feildGroupName}']`);

                ele.forEach(function(currentEle, idx, list){
                    currentEle.classList.remove(INVALID_FEEDBACK_STYLE_CLASS);
                })

                return;
            }

            else if(currentEle.type == "select-one"){

                var selectedOptionValue = currentEle.value;

                if(selectedOptionValue == 0){
                    validationRes.status = false;
                    validationRes.addInvalidFeild(new ValidationData(currentEle.name, false, VALIDATIONS.selectValidOption));
                    return;
                }

                return;
            }
        }
    );    

    return validationRes;
}