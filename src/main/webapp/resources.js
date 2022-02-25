const FETCH_COUNTRY_DIAL_CODES_URL = "https://countriesnow.space/api/v0.1/countries/codes";
const FETCH_COUNTRY_STATES_URL= "https://countriesnow.space/api/v0.1/countries/states";
const FETCH_STATE_CITIES_URL = "https://countriesnow.space/api/v0.1/countries/state/cities";
const FETCH_COUNTRY_CITIES_URL = "https://countriesnow.space/api/v0.1/countries/cities";

/**
 * executes a GET fetch request to the resource. return object will contains data prop having an array of 
 * type country in ideal case, else error will be set to false and msg prop will have error message.
 * 
 * @returns returns a resourceResponse type object.
 */
function fecthCountriesSelectList(){

    var myInit = { 
        method: 'GET',
        redirect: 'follow' 
    };
    
    var myRequest = new Request(FETCH_COUNTRY_DIAL_CODES_URL,myInit);

    //var parsedResponse = new resourceResponse(true, "", null);
      
    fetch(myRequest)
    .then(response => response.text())
    .then(result => {
        parsedResponse = JSON.parse(result); 
        
        if(parsedResponse.error){
            throw new Error(parsedResponse.msg);
        } 

        prepareCountriesSelectList(parsedResponse);
    })
    .catch(error => {
        var targetEle = document.querySelector("#countrySelect");
        generateFeedback(targetEle, `An error occured while fecthing countries data. error: ${error}`);
    });

}

function fecthStatesSelectList(selectedCountry){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({country: selectedCountry});

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        //cache: 'no-cache'
    };
    
    var myRequest = new Request(FETCH_COUNTRY_STATES_URL,myInit);

    var parsedResponse = new resourceResponse(true, "", null);

    var targetEle = document.querySelector("#stateSelect");
    targetEle.classList.remove(INVALID_FEEDBACK_STYLE_CLASS);
    targetEle.classList.remove(VALID_FEEDBACK_STYLE_CLASS);

    removeOptionsFromSelect("#stateSelect", true);
    removeOptionsFromSelect("#citySelect", true);
      
    fetch(myRequest)
    .then(response => response.json())
    .then(result => {
        parsedResponse = result; 
        
        if(parsedResponse.error){
            throw new Error(parsedResponse.msg);
        }        

        prepareStatesSelectList(parsedResponse);
    })
    .catch(error => {        
        console.error(error);
        generateFeedback(targetEle, `An error occured while fecthing states data. error: ${error}`);
    });
}

function fetchCitySelectListForStates(SelectedStates){
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var selectedCountry = document.querySelector("#countrySelect");
    var countryName = selectedCountry.options[selectedCountry.selectedIndex].text;


    var raw = JSON.stringify({country: countryName, state: SelectedStates});

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        //cache: 'no-cache'
    };
    
    var myRequest = new Request(FETCH_STATE_CITIES_URL,myInit);

    var parsedResponse = new resourceResponse(true, "", null);

    var targetEle = document.querySelector("#citySelect");
    targetEle.classList.remove(INVALID_FEEDBACK_STYLE_CLASS);
    targetEle.classList.remove(VALID_FEEDBACK_STYLE_CLASS);

    removeOptionsFromSelect("#citySelect", true);
      
    fetch(myRequest)
    .then(response => response.json())
    .then(result => {
        parsedResponse = result; 
        
        if(parsedResponse.error){
            throw new Error(parsedResponse.msg);
        }        

        prepareCitiesSelectList(parsedResponse);
    })
    .catch(error => {        
        console.error(error);
        generateFeedback(targetEle, `An error occured while fecthing cities data. error: ${error}`);
    });
}

function fetchCitySelectListForCountry(){
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var selectedCountry = document.querySelector("#countrySelect");
    var countryName = selectedCountry.options[selectedCountry.selectedIndex].text;

    var raw = JSON.stringify({country: countryName});

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        //cache: 'no-cache'
    };
    
    var myRequest = new Request(FETCH_COUNTRY_CITIES_URL,myInit);

    var parsedResponse = new resourceResponse(true, "", null);

    var targetEle = document.querySelector("#citySelect");
    targetEle.classList.remove(INVALID_FEEDBACK_STYLE_CLASS);
    targetEle.classList.remove(VALID_FEEDBACK_STYLE_CLASS);

    removeOptionsFromSelect("#citySelect", true);
      
    fetch(myRequest)
    .then(response => response.json())
    .then(result => {
        parsedResponse = result; 
        
        if(parsedResponse.error){
            throw new Error(parsedResponse.msg);
        }        

        prepareCitiesSelectList(parsedResponse);
    })
    .catch(error => {        
        console.error(error);
        generateFeedback(targetEle, `An error occured while fecthing cities data. error: ${error}`);
    });
}
