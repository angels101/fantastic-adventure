import { header } from 'express/lib/request';
import FetchService from './service/FetchService';

/*-- Objects --*/
const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function submitForm(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);
    // 2.3 Build Headers
    const headers = buildHeaders();
    // 2.4 Request & Response
    //const response = await fetchService.performPostHttpRequest(`https://jsonplaceholder.typicode.com/posts`, headers, jsonFormData); // Uses JSON Placeholder
    const response =await fetchService.performGetHttpRequest (`http://developers.gictsystems.com/api/dummy/submit/`, headers, jsonFormData);
    console.log(response);
    // 2.5 Inform user of result
    if(response)
        window.location = `/success.html?FullName=${response.FullName}&Email=${response.Email}&Tel=${response.Tel}&Address=${respond.Address}&id=${response.id}`;
    else
        alert(`An error occured.`);
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}
/*--/Functions--*/




/*--Event Listeners--*/
const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}
/*--/Event Listeners--*/
