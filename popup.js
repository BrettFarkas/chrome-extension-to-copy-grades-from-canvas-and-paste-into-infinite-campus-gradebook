document.getElementById("copygrades").style.backgroundColor = "#3aa757";

copygrades.onclick = function(element) {
    document.getElementById("copygrades").style.backgroundColor = "red";

    
        chrome.tabs.executeScript({
          code: 'document.body.style.backgroundColor="pink"'
        });

console.log("hello");
//console.log(document.body);


    console.log("Popup DOM fully loaded and parsed");
 
//https://stackoverflow.com/questions/43511001/chrome-extension-get-source-code-of-active-tab

    function modifyDOM() {
       
	//var x = document.getElementById('content').innerHTML; //!!!!
	//var x = document.getElementById('scoreCell').innerText; //!!!! gives all student info
	//var x = document.getElementById('content').getElementsByClassName('student')[1].innerText; //gives 1 student
	

	//var x = document.getElementById('content').getElementsByClassName('student')[1].getAttribute('data-user-id'); //STUDENT ID!!!!!

//iterate student[i]//
	//var x = document.getElementById('content').getElementsByClassName('student')[0].getElementsByClassName('name')[0].getElementsByClassName('student_name')[0].innerText; //STUDENT NAME!!!!!

	//var y = document.getElementById('content').getElementsByClassName('student')[1].getElementsByClassName('score')[0].innerText; //SCORE!!

	var nodesSameClass = document.getElementById('content').getElementsByClassName('student');
	var numberOfStudents = nodesSameClass.length;
	var namesArray = [];
	for (i = 0; i < numberOfStudents; i++) {

	try{
	var x = document.getElementById('content').getElementsByClassName('student')[i].getElementsByClassName('name')[0].getElementsByClassName('student_name')[0].innerText; //STUDENT NAME
  	namesArray[i]= x ;
	} catch(err) {
	var error = 1;
	}

	}
	
	

	
	var gradeObj = {}; //

	for (i = 0; i < numberOfStudents; i++) {
	

	try{
	var y = document.getElementById('content').getElementsByClassName('student')[i].getElementsByClassName('score')[0].innerText; //SCORE!!
  	var key = namesArray[i].toString();
	//chrome.storage.local.set({key: y});
	
	gradeObj[key] = y; //
        
	} catch(err) {
	var error = 1;
	}
	//var z = y;
	} //end for loop
	
	//chrome.storage.local.set(gradeObj);

	
 //////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////GRADES PAGE/////////////////////////////////////////////
	var namesArray2 = [];

	var z = document.querySelector("#gradebook_grid"); //works
   	//var z1 = z.getElementsByClassName('container_0 slickgrid_77449 ui-widget')[0].getElementsByClassName('viewport_0 slick-viewport')[0].getElementsByClassName('canvas_0 grid-canvas')[0]; //gets all student names
	//var z1 = z.getElementsByTagName("div")[1].getElementsByClassName('viewport_0 slick-viewport')[0].getElementsByClassName('canvas_0 grid-canvas')[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByClassName('student-name')[0].innerText; // WORKS GETS FIRST STUDENT NAME
	//var z1 = z.getElementsByTagName("div")[1].getElementsByClassName('viewport_0 slick-viewport')[0].getElementsByClassName('canvas_0 grid-canvas')[0].getElementsByClassName('student-name')[1].innerHTML; //WORKS!!! ITERATE ON LAST [0]
   	

	var x1 = z.getElementsByTagName("div")[1].getElementsByClassName('viewport_0 slick-viewport')[0].getElementsByClassName('canvas_0 grid-canvas')[0].getElementsByClassName('student-name');
	var numberOfStudents2 = x1.length; //WORKS TO GET NUMBER OF STUDENTS

	var namespace;
	var firstName;
	var lastName;
	var firstconcat;
	var finalconcat;

	for (i = 0; i < numberOfStudents2; i++) {
	try{
	var z1 = z.getElementsByTagName("div")[1].getElementsByClassName('viewport_0 slick-viewport')[0].getElementsByClassName('canvas_0 grid-canvas')[0].getElementsByClassName('student-name')[i].innerText;
//////////////////GETNAME
	var namespace = z1.indexOf(" ");
	namespace = namespace + 1;
	var firstName = z1.slice(0,namespace);
	var firstNameIndex = firstName.indexOf(" ");
	var firstName = firstName.slice(0,firstNameIndex);
	var lastName = z1.slice(namespace);
	var firstconcat = lastName.concat(", ");
	var finalconcat = firstconcat.concat(firstName);
/////////////////
  	namesArray2[i]= finalconcat ;
	} catch(err) {
	var error = 1;
	}

	} //end for loop

	
//////////////////////GET GRADES
	//var score1 = z.getElementsByTagName("div")[0].getElementsByClassName('viewport_1 slick-viewport')[0].getElementsByClassName('canvas_1 grid-canvas')[0].innerHTML;
	//var score1 = z.getElementsByTagName("div")[22].innerHTML; //works BUT DIVS WILL BE DIFFERENT
	//var score1 = z.getElementsByTagName("div")[22].getElementsByClassName('viewport_1 slick-viewport')[0].getElementsByClassName('canvas_1 grid-canvas')[0].innerHTML; 
	//var score1 = z.querySelector("div.canvas_1 grid-canvas")[0];
	//var score1 = z.querySelector(".viewport_1 slick-viewport");
	//var k = document.querySelector("#gradebook-grid-wrapper");
	var k = document.querySelector("#gradebook-grid-wrapper");
	
	//var score1 = k.getElementsByTagName("div")[0].innerHTML;
	//var score1 = k.getElementById("gradebook_grid")[0].innerHTML;
	//var score1 = k.querySelector("#gradebook_grid").innerHTML; //WORKS
	var score0 = k.querySelector("#gradebook_grid");
	//var score1 = score0.getElementsByTagName("div")[2].innerHTML; //Works
	//var score1 = score0.getElementsByTagName("div")[22]; 	works BUT NOT WITH SABO
	var score1 = score0.querySelectorAll('.container_1');
	//return score1[0].innerHTML;
	//var score1 = score0.getElementsByTagName("div")[1];
	var score11 = score1[0];
	//return score11.innerHTML;
	var score2 = score11.getElementsByClassName('viewport_1 slick-viewport')[0];
	//var score3 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].innerHTML; //WORKS
	//var score3 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].innerText; // works (gets all grades)
	//return score2.innerHTML;
	var namelength = namesArray2.length; //works, get length of students' names list
	
	//var score3 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].querySelector(".Grade").innerText; //WORKS gets first score
	//var score3 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].querySelectorAll(".Grade")[3].innerText; //WORKS can iterate last bracket to go through only grades, not percents
	var score3 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].querySelectorAll(".Grade");
	//return score3; //DELETE THIS
	var totallength = score3.length;
	
	var numberOfColumns = totallength / namelength;
	
	var gradesarray1 = [];
	var iter = 0;
	for (i = 0; i < totallength; i++) {
	try{
	var b2 = score2.getElementsByClassName('canvas_1 grid-canvas')[0].querySelectorAll(".Grade")[i].innerText;

	if( (i+1) % numberOfColumns == 0){
  	gradesarray1[iter]= b2;
	iter = iter + 1;
	}

	} catch(err) {
	var error = 1;
	}

	} //end for loop

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////GOOGLE GOOGLE GOOGLE ////////////////////////////////////////////////////////////////////////////////////
//var x = document.querySelectorAll('.EhR1C').innerHTML;
//var x = document.getElementsByTagName("body").innerHTML;
var x = document.getElementById('yDmH0d');




	
///////////////////////
///////////////////////////////////////////////
//PUT NAMES AND GRADES IN DICTIONARY

	for (i = 0; i < namelength; i++) {
	

	try{
	var y = gradesarray1[i] //SCORE!!
  	var key = namesArray2[i].toString();
	//chrome.storage.local.set({key: y});
	
	gradeObj[key] = y; //
        
	} catch(err) {
	var error = 1;
	}
	//var z = y;
	} //end for loop
	
	chrome.storage.local.set(gradeObj);

	


//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

	return x;
	//return namesArray2;
	//return ;
	//return totallength; //4
	//return numberOfColumns;


/*
	key = x;
	value = y;
   	chrome.storage.local.set({key: value}, function() {
        console.log('Value is set to ' + value);
        });
*/	
	
	
	//var z = innerDoc2.querySelector("#gridTable").innerHTML; //works
	//var z = innerDoc2.querySelector("#gridTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML; //works

	
	//y = namesArray[21];

	
	
	
	
	//return "set works";
	//return numberOfStudents; //4
	
	
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
	console.log(results[0]);
	console.log(results);
	//console.log(results[1]);
	console.log(results[0].innerHTML);
	console.log(results[0].innerText);
	

   
	



    });

	

/*
	key = "John";
	value = "100";
   	chrome.storage.local.set({key: value}, function() {
          console.log('Value is set to ' + value);
        });
      
         chrome.storage.local.get(['key'], function(result) { //WORKS!!!!!
          console.log('Value currently is ' + result.key);
        });

*/

/*
	key = "John";
	value = "100";
   	chrome.storage.local.set({key: value});
          console.log('Value is set to ' + value);
        
	

	 chrome.storage.local.get(['key'], function(result) { //WORKS!!!!!
          console.log('Value currently is ' + result.key);
        });
*/

   
/////////////////////////////WORKS //////////////////////////
/*
    var nameOne = "al";
    var nameTwo = "bob";
    var nameThree = "carl";
    var nameFour = "dan";
    var dataObj = {};

    dataObj[nameOne] = nameTwo;
    dataObj[nameThree] = nameFour;

    chrome.storage.local.set(dataObj);

    chrome.storage.local.get(dataObj, function(result)
    {
    console.log(result[nameOne]);
    console.log(result[nameThree]);
    });
*/
////////////////////////////////////////////////////////////
   



  };




