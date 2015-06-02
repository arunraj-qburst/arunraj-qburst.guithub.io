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

function getUserDataResponse(response){ 
      var result = JSON.parse(response);  
	userDataColl=result; 

	showUserListGrid();
	drawChartByType('rank');
 
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
      for (var i = 0; i < userDataColl.length; i++) {
        
        if(userDataColl[i].isSelected)
        data.addColumn('number', userDataColl[i].name);
      }; 

      data.addRows( createChartDataCollection(chartType));

      var options = {
        hAxis: {
          title: 'Days'
        },
        vAxis: {
          title:chartType
        },
        series: {
          1: {curveType: 'function'}
        }
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
   	
    var out = "<table width=560px   ><th>Name</th><th>Score</th><th>Rank</th><th>Event</th><th>Show</th> ";
    var i;
    for(i = 0; i < userDataColl.length; i++) 
    {
    	  userDataColl[i].isSelected = true;// this is to show the users in the chart at first time
        out += '<tr><td>' + userDataColl[i].name + '</td>'+
        '<td>' + getUserTotalScore(userDataColl[i])  + '</td>'+
        '<td>' + getUserTotalRank(userDataColl[i])+'</td>'+
        '<td>' + getUserTotalEvent(userDataColl[i]) + '</td> '+
        '<td><input type="checkbox" checked="'+userDataColl[i].isSelected + '" name="showInChart" onclick="showUserCheckBoxStatusChange(this,'+i+')" "value="'+i+'"></td></tr>'

    }
    document.getElementById("grid_div").innerHTML = out; 
    out += " </table>";
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
// onchange="showUserCheckBoxStatusChange('+i +', document.getElementById( '+i+' ).select ) 

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