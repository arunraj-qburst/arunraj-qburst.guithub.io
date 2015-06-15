console.log('This would be the main JS file.');

var currentUserRawData;
var userDataColl=[];
var chartListingDataColl=[];
var getDayCount=10;
var isChartLibLoaded=false;
var currentChartTypeSelected='rank';

 
// LOADING USER DATA //

 function loadData () 
 {
       var jsonReq = new XMLHttpRequest();
       jsonReq.overrideMimeType("application/json");
       jsonReq.open('GET', 'chart-data.json', true);
       jsonReq.onreadystatechange = function () {
       if (jsonReq.readyState == 4 && jsonReq.status == "200") {
          
           getUserDataResponse(jsonReq.responseText);
         }
       }
       jsonReq.send();       
     } 

function getUserDataResponse(response)
{ 
      var result = JSON.parse(response);  
	  userDataColl=result; 
	  showUserListGrid();
	  drawChartByType('rank'); 
	  initEmployeeController();
}

// GOOGLE LINE CHART SECTION //

var chart;

function initLineChartLibs()
{
	google.load('visualization', '1', {packages: ['corechart', 'line']});
	google.setOnLoadCallback(onChartLibLoad); 
} 

function onChartLibLoad()
{
  // chart lib loaded successfuly //
  isChartLibLoaded=true;
}
  
function drawChartByType(chartType)
{
	if(!isChartLibLoaded)
	{
        alert("Chart Library has not yet loaded! \n Try again"); 
        return;
	}
	if(chart)
 	{ 
   	   chart.clearChart(); 
  	}
	var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    for (var i = 0; i < userDataColl.length; i++) 
    {
       if(userDataColl[i].isSelected)
       data.addColumn('number', userDataColl[i].name);
    }; 
    data.addRows( createChartDataCollection(chartType));
    var options = {
        hAxis: {
          title: 'Days',
          textStyle: {
            color: '#1a237e',
            fontSize: 24,
            bold: true
        },
        titleTextStyle: {
            color: '#1a237e',
            fontSize: 24,
            bold: true
          }

        },
        vAxis: {
          title:chartType
        },
         
        legend: 'none',
        pointSize: 8,
        pointShape: 'circle',
        colors: getChartColors(),//['#63A74A','#15A0C8', '#4151A3', '#703593', '#981B48','#E94D20', '#ECA403' ],
      };

      chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}
 // END - LINE CHART SECTION //



// DATAGRID HANDLERS //

function showUserListGrid()
{ 
   if(userDataColl && !userDataColl.length)
	{
		alert("No User data found");
		return;
	}
   

/*
for (var k in MC.ColorPicker) {
        if (MC.ColorPicker.hasOwnProperty(k)) {
       //  alert("Color list"+  MC.ColorPicker[k] );
        }
    }

 alert("Color list"+  MC. colorsList );*/



    var out = "<table id='dataGrid' width='100%'' ><thead><tr><th>Name</th><th>Score</th><th>Rank</th><th>Event</th><th>Show</th><th>Color</th></tr></thead><tbody> ";
    var i;
    for(i = 0; i < userDataColl.length; i++) 
    {
    	userDataColl[i].isSelected = true;// this is to show the users in the chart at first time
    	userDataColl[i].graphLineColor = MC. colorsList[i];// this is to show the users in the chart at first time
        out += '<tr><td>' + userDataColl[i].name + '</td>'+
        '<td>' + getUserTotalScore(userDataColl[i])  + '</td>'+
        '<td>' + getUserTotalRank(userDataColl[i])+'</td>'+
        '<td>' + getUserTotalEvent(userDataColl[i]) + '</td> '+
        '<td><input type="checkbox" checked="'+userDataColl[i].isSelected + 
        '" name="showInChart" onclick="showUserCheckBoxStatusChange(this,'+i+')" "value="'+
        i+'"></td><td> '
        +' <input type="hidden" id="'+i+'"   class="color" value="#'+userDataColl[i].graphLineColor+'" > </td></tr>'

    }
    out += " </tbody> </table>"; 
    document.getElementById("grid_div").innerHTML = out; 
	$(document).ready(function()
	{
	   $('#dataGrid').DataTable({paging: false } );
	   MC.ColorPicker.reload();
	});

}
 
function showUserCheckBoxStatusChange(cb,index)
{
	//userDataColl[index].isSelected=true;
	if(cb.checked)
	{
		userDataColl[index].isSelected=true;
	}
	else
	{
		userDataColl[index].isSelected=false;
	}

    drawChartByType(currentChartTypeSelected);
}

// END - DATAGRID //



// PARSING USER DATA // 

function getUserData()
{ 
	// load json data here and parse it into ''userDataColl'' //
  	loadData(); 
}

// while changing the radio buttons - left side bar //
function onFilterSelection(filterType)
{
 

}
 
// get specific data type for charts //
function parseChartDataByType(userData,type)
{ 
	if(type =="rank" && userData.ranks && userData.ranks.length)
	{ 
		return parseRankDataByUser(userData.ranks);
	}
	if(type =="score" && userData.scores && userData.scores.length)
	{ 
		return parseScoreDataByUser(userData.scores);
	}  
	if(type =="event" && userData.events && userData.events.length)
	{ 
		return parseEventDataByUser(userData.events);
	}  
	return [];
}

function parseRankDataByUser(typeData)
{
	var dataColl=[];
	for (var i =0;  i<getDayCount; i++) 
		{
			if( i<typeData.length)
			dataColl.push(parseInt(typeData[i].rank)); 
			else
			dataColl.push(0);
		} 
	return dataColl;
}

function parseScoreDataByUser(typeData)
{
	var dataColl=[];
	for (var i =0;  i<getDayCount; i++) 
		{
			if( i<typeData.length)
			dataColl.push(parseInt(typeData[i].score)); 
			else
			dataColl.push(0);
		} 
	return dataColl;
}

function parseEventDataByUser(typeData)
{

	var dataColl=[];
	for (var i =0;  i<getDayCount; i++) 
		{
			if( i<typeData.length)
			dataColl.push(parseInt(typeData[i].event)); 
			else
			dataColl.push(0);
		} 
	return dataColl;
}

function getUserTotalScore(userObj)
{

	var coll=parseChartDataByType(userObj,'score');
	var total =0;
	for (var i = 0; i < coll.length; i++) 
		{ 
			total+= parseInt(coll[i]);
		} 
	return total;
}
function getUserTotalRank(userObj)
{

	var coll=parseChartDataByType(userObj,'rank');
	var total =0;
	for (var i = 0; i < coll.length; i++) 
		{ 
			total+= parseInt(coll[i]);
		} 
	return total;
}
function getUserTotalEvent(userObj)
{

	var coll=parseChartDataByType(userObj,'event');
	var total =0;
	for (var i = 0; i < coll.length; i++) 
		{ 
			total+= parseInt(coll[i]);
		} 
	return total;
}


function createChartDataCollection(type)
{ 
	currentChartTypeSelected=type;
	chartListingDataColl=[];
	for (var dayCount = 0; dayCount < getDayCount; dayCount++) 
	{
		var cordnatColl=[dayCount]; 
		for (var i = 0; i < userDataColl.length; i++) 
		{ 
			if(userDataColl[i].isSelected)
			{
				cordnatColl.push( parseChartDataByType(userDataColl[i],type)[dayCount]); 
			}
		} 
		chartListingDataColl.push( cordnatColl );
	};
	return chartListingDataColl;
}

// set line chart colors //
function getChartColors()
{
	var options =[] ;
	 for (var i = 0; i < userDataColl.length; i++) 
		{ 
			if(userDataColl[i].isSelected)
			{
				options.push(  userDataColl[i].graphLineColor); 
			}
		} 
      return options;
}

// HANDLE COLOR PICKER CHANGE //
function OnColorChanged(selectedColor, colorPickerIndex) 
{
  // var divA = document.getElementById("divA");
  //var divB = document.getElementById("divB");
  //if (colorPickerIndex==0) 
  //    alert("color change @1"+ selectedColor);
 // else if (colorPickerIndex==1) 

 		var rgb = selectedColor.replace("rgb(", "").replace(")", "");
 		var rgbArr=rgb.split(",");
      // alert("color change @  #"+ rToh(rgbArr[0],rgbArr[1],rgbArr[2]) );

       	userDataColl[colorPickerIndex].graphLineColor=	"#"+ rToh(rgbArr[0],rgbArr[1],rgbArr[2]);
       	drawChartByType(currentChartTypeSelected);
}


// JQUERY //
/*

$(document).ready(function(){

 $('.simple_color_callback').simpleColor({
    onSelect: function(hex, element) {
      alert("You selected #" + hex + " for input #" + element.attr('class'));
    }
  });
 $('.simple_color_callback2').simpleColor({ displayColorCode: true });


});
*/

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function rToh(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}



// EMPLOYEE CONTROLLER //
var emplCntrlr ;
function initEmployeeController()
{
	if(!emplCntrlr)
	emplCntrlr = new EmployeeController(); 
	if(userDataColl && userDataColl.length)
	emplCntrlr.setEmployeeData( userDataColl);
}

function handleAddEmplBtnClick()
{  
 	
 	emplCntrlr.addEmployee(emplCntrlr.getNewEmployeeObj('sony' ) );
 	
 	showUserListGrid();
	  drawChartByType('rank');  
}

 