/**
 * 
 */function validate_dpCheck()
{
    var x = document.getElementsByName("dpchecks");
    var newvar = 0;
    for(var count=0; count<x.length;count++)
    {
        if(x[count].checked==true)
        {
            newvar+=1;
        }
    }
    if(newvar>=2){
        document.getElementById("dpchk_notvalid").innerHTML="You can select only one option";
        return false;
    }
}



window.addEventListener('load', (event) => {
    
    addMessageEvent('input[id="email"]', "focusout");    
    addMessageEvent('input[type="text"]', "focusout");   
    addMessageEvent('textarea[id="address"]', "focusout");
    addMessageEvent('input[type="radio"]', "change");
    addMessageEvent('input[type="checkbox"]', "change");
    addMessageEvent("select", "change");

    numericAllowedOnly();
    fecthCountriesSelectList();

    disableElementBySelector("#stateSelect");
    disableElementBySelector("#citySelect");
});

/**
 * remove the options from select list found by selector if keepDefaultOptionFlag param is 
 * set to false, else keep the option with disabled attribute and removes other options.
 * 
 * @param {String} selector a CSS selector for select list
 * @param {boolean} keepDefaultOptionFlag set true to keep options with disbaled attribute, set false to remove all ooptions.
 */
function removeOptionsFromSelect(selector, keepDefaultOptionFlag){

    var targetEle = document.querySelector(selector);

    targetEle.classList.remove(INVALID_FEEDBACK_STYLE_CLASS);
    targetEle.classList.remove(VALID_FEEDBACK_STYLE_CLASS);

    targetEle.querySelectorAll("option").forEach(
        function (option, idx, list){
            if(keepDefaultOptionFlag){
                if(option.disabled != true){
                    option.remove();
                    return;
                }
                else{
                    option.selected = true;
                }
                return;
            }
            option.remove();
            return;
        }
    );
}

