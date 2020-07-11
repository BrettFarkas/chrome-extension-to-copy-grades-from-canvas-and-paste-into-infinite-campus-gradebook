document.getElementById("pasteinfo").style.backgroundColor = "#3aa757";

pasteinfo.onclick = function(element) {
    document.getElementById("pasteinfo").style.backgroundColor = "red";

	
    
       // chrome.tabs.executeScript({
          //code: 'document.body.style.backgroundColor="orange"'
        //});

//console.log("hello");
//console.log(document.body);


    //console.log("Popup DOM fully loaded and parsed");
 


    function modifyDOM() {



	
	

	var iframe = document.body.getElementsByTagName("ic-nav-wrapper-app")[0].getElementsByClassName('workspace-wrapper')[0].getElementsByTagName("ic-workspace")[0].getElementsByClassName('inner-workspace-wrapper ng-trigger ng-trigger-workspaceState')[0].getElementsByClassName('iframe-wrapper')[0].getElementsByTagName('iframe')[0];
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	//var y = innerDoc.body.getElementsByClassName('workspace-content')[0].innerHTML;
	var y = innerDoc.body.getElementsByClassName('workspace-content')[0];
	//var x = y.getElementsByTagName("app-root")[0].getElementsByTagName("ic-instruction-wrapper")[0].getElementsByClassName('instruction-wrapper')[0].innerHTML; //works
	var iframe2 = y.getElementsByTagName("app-root")[0].getElementsByTagName("ic-instruction-wrapper")[0].getElementsByClassName('instruction-wrapper')[0].getElementsByTagName('iframe')[0];
	var innerDoc2 = iframe2.contentDocument || iframe2.contentWindow.document;



///////////////////////GETS STUDENT NAME ///////////////////////////////
	var y2 = innerDoc2.querySelector("#studentTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByClassName('studentTD')[0].getElementsByClassName('studentHeader')[0].getElementsByClassName('studentName')[0].innerText; 
	var comma = y2.indexOf(",");
	comma = comma + 2;
	var space = y2.indexOf(" ", comma);
	var slicedName = y2.slice(0,space); //sliced Name
	//return slicedName;

////////////////////GETS NUMBER OF STUDENTS ////////////////////////////////////////////////////

	var nodesSameClass = innerDoc2.querySelector("#studentTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var numberOfStudents = nodesSameClass.length;
	//return numberOfStudents;

///////////////////////////GET ALL STUDENT NAMES IN ARRAY, ITERATE STUDENT TD ///////////////////////////////////
	var studentArray = [];
	var studentNicknameArray = [];
	for (i = 0; i < numberOfStudents; i++) {
	var y2 = innerDoc2.querySelector("#studentTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName('studentTD')[0].getElementsByClassName('studentHeader')[0].getElementsByClassName('studentName')[0].innerText; 
	var comma = y2.indexOf(",");
	comma = comma + 2;
	var space = y2.indexOf(" ", comma);
	if (space == -1){
	var slicedName = y2.slice(0);
	}else{
	var slicedName = y2.slice(0,space); //sliced Name
	}
	studentArray[i] = slicedName;	
	}
	//return studentArray;
//////////////////////
	// CREATE NICKNAME ARRAY
	for (i = 0; i < numberOfStudents; i++) {
	var y2 = innerDoc2.querySelector("#studentTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName('studentTD')[0].getElementsByClassName('studentHeader')[0].getElementsByClassName('studentName')[0].innerText; 
	var comma = y2.indexOf(",");
	comma = comma + 2;
	var space = y2.indexOf(" ", comma);
	if (space == -1){
	var slicedInsert = y2.slice(0);
	}else{
	
	var slicedLastName = y2.slice(0,comma); //sliced last Name & comma
	//var y2 = innerDoc2.querySelector("#studentTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName('studentTD')[0].getElementsByClassName('studentHeader')[0].getElementsByClassName('studentName')[0].innerText; 
	var firstParenthesis = y2.indexOf("(");
	firstParenthesis = firstParenthesis + 1;
	var lastParenthesis = y2.indexOf(")");
	var slicedfirstName = y2.slice(firstParenthesis,lastParenthesis);
	var slicedInsert = slicedLastName.concat(slicedfirstName);
	}
	studentNicknameArray[i] = slicedInsert;	
	}

	//return studentNicknameArray;





///////////////////GET OPENED SCORE COMMENT BOX X COORDINATE ///////////////////
	var z = innerDoc2.querySelector("#scoreTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getAttribute('data-xy'); //works!!
	var underscore = z.indexOf("_");
	var slicedOpenx = z.slice(0,underscore); //sliced x coordinate
	//return slicedOpenx;
//////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////GET MISSING BUTTON ACTIVE//////////////////////////////////////////////////////////////////
	//var mis = innerDoc2.querySelector("#scoreTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("div")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByClassName("statusButton")[1].innerText; 
	//return mis;



////////////////// GETS UNOPENED 0_0 COORDINATES /////ITERATE ON TD /////////////////////////////////
	var z = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getAttribute('data-xy'); 
	var underscore = z.indexOf("_");
	var slicedUnopenedx = z.slice(0,underscore); //sliced x coordinate
	//return slicedUnopenedx;

///////////////////////////GET LENGTH OF ALL ASSIGNMENTS//////////////////////////////////////////////////////
	var nodesSameClass = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td");
	var numberOfX = nodesSameClass.length;
	//return numberOfX;

////////////////ITERATE & LOOK FOR X MATCHES ON ONE ROW//////////////////////////////////////////////
	/*
	for (i = 0; i < numberOfX; i++) { // get x_y
	var x = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[i];
	z = x.getAttribute('data-xy'); 
	try{
	var underscore = z.indexOf("_");
	var slicedUnopenedx = z.slice(0,underscore);
	} catch(err) {
   	var slicedUnopenedx = "no xy";
  	}
	

	var c = x.getAttribute('class'); //get class name
	//return c;

	//if (slicedUnopenedx == slicedOpenx && c == "gridTD gridTDFirstColumn postedGradeTotals highlightedRow"){ //works
	//if (c == "gridTD gridTDFirstColumn postedGradeTotals highlightedRow"){ //works
	//if (slicedUnopenedx == slicedOpenx && (c == "gridTD gridTDFirstAssignment colorMedian highlightedRow")){ //works
	//if (slicedUnopenedx == slicedOpenx && (c == "gridTD colorMedian highlightedRow")){ //works
	//if (slicedUnopenedx == slicedOpenx && (c == "gridTD colorMedian highlightedRow" || c == "gridTD colorMedian" )){ //works
	if (slicedUnopenedx == slicedOpenx && (c == "gridTD colorMedian highlightedRow" || c == "gridTD colorMedian" || c == "gridTD gridTDFirstAssignment colorMedian highlightedRow" || c == "gridTD gridTDFirstAssignment colorMedian")){ //works

	x.style.backgroundColor = "pink";
	//return c;
	}

	}
	*/
////////////////////////////ITERATE TWICE AND LOOK FOR X MATCHES ON ALL ROWS //////////////////////////
	
	incrementLocation = 0;
	locationArray = [];
	clickArray = [];
	for (g = 0; g < numberOfStudents; g++) {

	for (i = 0; i < numberOfX; i++) { // get x_y
	var x = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByClassName("gridTR")[g].getElementsByTagName("td")[i];
	//return x.innerHTML;
	try{
	//x.select();
	z = x.getAttribute('data-xy'); 
	var underscore = z.indexOf("_");
	var slicedUnopenedx = z.slice(0,underscore);

	var c = x.getAttribute('class'); //get class name
	} catch(err) {
   	var slicedUnopenedx = "no xy";
	var c = "no class";

	
  	}
	
	

	

	if (slicedUnopenedx == slicedOpenx && (c == "gridTD colorMedian highlightedRow" || c == "gridTD colorMedian" || c == "gridTD gridTDFirstAssignment colorMedian highlightedRow" || c == "gridTD gridTDFirstAssignment colorMedian")){ //works MATCH OPEN COLUMN

	x.style.backgroundColor = "pink";
	

	//x.onchange();
	//x.blur();
	

	var inputLocation = x.getElementsByClassName('scoreCell')[0].getElementsByTagName("input")[0];
	//inputLocation.value = grade;
	
	locationArray[incrementLocation] = inputLocation; //trying this


	clickArray[incrementLocation] = x.getElementsByClassName('scoreCell')[0]; //trying this

	incrementLocation += 1;
	
	

	//inputLocation[0].blur();
	//x.getElementsByClassName('scoreCell')[0].blur();
	//x.getElementsByClassName('scoreCell')[0].getElementsByTagName("input")[0].blur();
	//x.getElementsByClassName('scoreCell')[0].getElementsByTagName("input").blur();
	//x.getElementsByClassName('scoreCell')[0].click();
	//x.getElementsByClassName('scoreCell')[0].focus();
	//x.getElementsByClassName('scoreCell')[0].blur();

	
	
	

	}
	}

	}
	
	clickArray[5].click();
	clickArray[5].focus();
	clickArray[5].blur();

	

///////////////////////////////INPUT 1 TEXT EXAMPLE///////////////////////////////////////////////////
//////////  // ITERATE ON TD
	
/////////////////////////////
	
	var z = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0]; 
	//inputLocation = z.getElementsByClassName('scoreCell')[0].getElementsByTagName("input")[0];
	z.click();
	z.focus();
	z.blur();

	//z.style.backgroundColor = "pink";
	

	//z.getElementsByClassName('scoreCell').select()
	//z.select();
	//z.getElementsByClassName('scoreCell')[0].onchange();
	//inputLocation.value = grade;
       

	//chrome.storage.local.get(null, function(items) {
	//console.log(items["Doe, Jane"]); //WORKS !!!!!
	//grade = items["Doe, Jane"];
	//inputLocation.value = grade;
	//});
	
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PASTE IN CANVAS GRADES ///////////////////////////////////////
	
	
	
	chrome.storage.local.get(null, function(items) {
	for (i = 0; i < numberOfStudents; i++) {
	grade = items[studentArray[i]];
		if (!grade){ 
		grade = items[studentNicknameArray[i]];
			if (!grade){ 
			grade = "0"; 
			}
		}

	clickArray[i].click();
	clickArray[i].focus();
	
	locationArray[i].value = grade;

	

	clickArray[i].blur();

	 

	//locationArray[i].dispatchEvent(new Event('change'));
	//locationArray[i].blur();
	}//end for loop

	
	//for (i = 0; i < numberOfStudents-2; i++) {
	//clickArray[i].click();
	//clickArray[i].focus();
	//clickArray[i].blur();
	//}//end for loop
	
	//for (i = 0; i < numberOfStudents; i++) {
	//locationArray[i].dispatchEvent(new Event('change'));
	//}//end for loop


	//innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[2].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].blur(); //trying this 
	
	

	
	chrome.storage.local.clear(function() {
	    var error = chrome.runtime.lastError;
	    if (error) {
        console.error(error);
	    }
	
	});
	
	//for (i = 0; i < numberOfStudents-1; i++) {
	//clickArray[i].click();
	//clickArray[2].focus();
	//clickArray[i].blur();
	//}//end for loop
	//clickArray[3].change();
	//clickArray[4].onchange();
//	clickArray[6].click();

//////////////////////////////////HIGHLIGHT 1 BOX TO SAVE////////////

	clickArray[5].click();
	clickArray[5].focus();
	clickArray[5].blur();

//////////////////////////////////////////////////////////////


	//clickArray[3].fireEvent('onchange');

	});

	/*
	for (i = 0; i < numberOfStudents; i++) {
	//locationArray[i].select();
	var element = locationArray[i];
	var event = new Event('change');
	element.dispatchEvent(event);
	var event = new Event('change', { bubbles: true });
	}//end for loop
	*/

//////////////////////////////////////////////////////////////////////	
	//inputLocation.value = grade;
	//return inputLocation.innerHTML;
	//return grade;
	//for (i = 0; i < numberOfStudents-2; i++) {
	//clickArray[7].click();
	//clickArray[7].focus();
	//clickArray[7].blur();
	//}//end for loop
	//clickArray[3].click();
	//clickArray[4].click();
	
  function keyEvent(el, ev) {
      var eventObj = document.createEvent("Events");
      eventObj.initEvent(ev, true, true);

      // Edit this to fit
      eventObj.keyCode = 38;
      eventObj.which = 38;
      eventObj.ctrlKey = true;
      eventObj.shiftKey = true;
      eventObj.altKey = true;

      document.body.dispatchEvent(eventObj);
    }

    // Trigger all 3 just in case
    keyEvent(clickArray[i], "keydown");
    keyEvent(clickArray[i], "keypress");
    keyEvent(clickArray[i], "keyup");

  keyEvent(clickArray[i], "keydown");
    keyEvent(clickArray[i], "keypress");
    keyEvent(clickArray[i], "keyup");

 keyEvent(document.body, "keydown");
    keyEvent(document.body, "keypress");
    keyEvent(document.body, "keyup");

 keyEvent(document.body, "keydown");
    keyEvent(document.body, "keypress");
    keyEvent(document.body, "keyup");
	

	return "hey, this is the end of the code";
	
    }
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

   

  

  

////////////////////////////////////////////////////////////////////////
    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
	console.log(results[0]);
	window.close(); //closes the program
	
	

	//console.log(results);
	//console.log(results[1]);
	//console.log(results[0].innerHTML);
	//console.log(results[0].innerText);
    });
//////////////////////////////////////////////////
	



	/*
      	key = 17296;
        chrome.storage.local.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
        });
	*/

/*
	key = "John";
	value = "100";
   	chrome.storage.local.set({key: value}, function() {
          console.log('Value is set to ' + value);
        });
      
        chrome.storage.local.get(['John'], function(result) {
          console.log('Value currently is ' + result.key);
	});
*/
	

/*
	dict = {"Name":"xyz", "3": "39"};
	var copy = {};
	
	for(var key in dict)
	{
	    copy[key] = dict[key];
	}
	console.log(copy);
*/


/*	
	var copy = {};
	chrome.storage.local.get(null, function(items) {
	   for (key in items) {
	        copy[key] = items[key];
	   }
	});
*/	

/*
	var dataObj = {};
	var key = "Doe, Jane";
	var value = "99.9";
	//chrome.storage.local.set({key: value});
	chrome.storage.local.set(dataObj, function() {key: value});
	var key = "Robinson, Lance";
	var value = "99.9";
	//chrome.storage.local.set({key: value});
	chrome.storage.local.set(dataObj, function() {key: value});

	console.log("this new thing: ");
	chrome.storage.local.get(dataObj, function(result)
	    {
	    console.log(result["Doe, Jane"]);
	    });
	
*/	



	
/////////////////WORKS TO GET ONE SCORE ///////////////////////////
/*
	var allKeys = {}; //outputs all keys- WORKS
	chrome.storage.local.get(null, function(items) {
    	var allKeys = Object.keys(items);
  	  console.log(allKeys);
	//console.log(items["Doe, Jane"]); //WORKS !!!!!
	var allValues = Object.values(items);
	console.log(allValues);
	});
*/
////////////////// GETS JUST ONE SCORE ///////////////////////////////
	
	//chrome.storage.local.get(null, function(items) {
	//console.log(items["Doe, Jane"]); //WORKS !!!!!
	//});
////////////////////////////////////////////////////////////

	
	

////////////////////////////CLEAR LOCAL STORAGE //////////////////////////
/*
	chrome.storage.local.clear(function() {
	    var error = chrome.runtime.lastError;
	    if (error) {
        console.error(error);
	    }
	});
*/

//////////////////////////////////////////////////////////////////////////







  };




