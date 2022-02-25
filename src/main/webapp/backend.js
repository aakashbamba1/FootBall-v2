var retbtn = document.getElementById("retbtn");
var submitbtn = document.getElementById("submitbtn");
var isUpdate = false;

//Function for Retrieval of Data Back into HTML with XMLHTTP Request
function retrievalFunction() {
	// alert("RET");
	//Removing Required Attributes
	document.getElementById("userName").removeAttribute("required");
	document.getElementById("firstName").removeAttribute("required");
	document.getElementById("email").removeAttribute("required");
	document.getElementById("phno").removeAttribute("required");
	document.getElementById("age_gp").removeAttribute("required");
	document.getElementById("i1").removeAttribute("required");

	document.getElementById("i2").removeAttribute("required");

	document.getElementById("i3").removeAttribute("required");
	document.getElementById("validationServer05").removeAttribute("required");

	var req = new XMLHttpRequest();
	var url = "Servlet1?username=" + document.getElementById("userName").value;
	req.open("GET", url);
	req.setRequestHeader("Content-type", "application/json; charset=utf-8");
	req.onreadystatechange = function () {
		var status = req.status;
		if (req.readyState == 4 && status == 200) {
			console.log(req.response);
			document.getElementById("flag").value = "put";
			isUpdateButton = true;
			var a = JSON.parse(req.response);

			isUpdate = true;
			document.getElementById("userName").value = a.userName;
			document.getElementById("firstName").value = a.firstName;
			document.getElementById("lastName").value = a.lastName;
			document.getElementById("phno").value = a.phoneNo;
			document.getElementById("email").value = a.email;
			document.getElementById("address").value = a.address;
			document.getElementById("validationServer05").value = a.pinCode;
			document.getElementById("age_gp").value = a.ageGroup;
			document.getElementById("flexRadioDefault1").checked = true;
			document.getElementById(a.desiredPosition).checked = true;
			document.getElementById(a.country).selected = true;
			console.log(a.country);
			document.getElementById("selectState").innerHTML = a.state;
			document.getElementById("selectCity").innerHTML = a.city;

		}
	}
	req.send();




}

retbtn.addEventListener('click', retrievalFunction);

//Function to Submit Request
function submitRequest() {
	var submitVariable = document.getElementById("form1");
	submitVariable.submit();
}

//submitbtn.addEventListener('click', submitRequest);

// function parentonSubmit(event) {

	// event.preventDefault();
	// var JsonObj = {

	// }

	// var req = new XMLHttpRequest();
	// var url = "Servlet1?username="+document.getElementById("userName").value;
	// req.open("GET",url);
	// req.setRequestHeader("Content-type", "application/json; charset=utf-8");
	// req.onreadystatechange= function()
	// {
	// 	var status = req.status;
	// 	if(req.readyState == 4 && status == 200)
	// 	{
	// 		console.log(req.response);
	// 		document.getElementById("flag").value="put";
	// 		isUpdateButton = true;
	// 		var a = JSON.parse(req.response);

	//         isUpdate = true;
	//         document.getElementById("userName").value = a.userName;
	// 		document.getElementById("firstName").value = a.firstName;
	// 		document.getElementById("lastName").value = a.lastName;
	// 		document.getElementById("phno").value = a.phoneNo;
	// 		document.getElementById("email").value = a.email;
	// 		document.getElementById("address").value = a.address;
	// 		document.getElementById("validationServer05").value = a.pinCode;
	// 		document.getElementById("age_gp").value = a.ageGroup;
	// 		document.getElementById("flexRadioDefault1").checked = true;
	// 		document.getElementById(a.desiredPosition).checked = true;
	// 		document.getElementById(a.country).selected = true;
	//         console.log(a.country);
	// 		document.getElementById("selectState").innerHTML = a.state;		
	// 		document.getElementById("selectCity").innerHTML = a.city;

	// 	}
	// }
	// req.send();

// }

//Event listener for Submit Button
submitbtn.addEventListener('click', function (event) {
	// document.getElementById("flag").value ="put";
	if (!isUpdate) {
		document.getElementById("flag").value = "post";
		document.getElementById("form1").submit();
		document.getElementById("submitbtn").disabled = false;

	}
	else if (isUpdate) {
		document.getElementById("flag").value = "put";
		document.getElementById("form1").submit();
		document.getElementById("submitbtn").disabled = false;


	}
});
