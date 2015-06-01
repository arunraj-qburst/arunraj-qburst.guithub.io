console.log('This would be the main JS file.');

var currentUserRawData;
var userDataColl=[];
var chartListingDataColl=[];
var getDayCount=10;

/////
 

 function loadData () 
 {

       var jsonReq = new XMLHttpRequest();
       jsonReq.overrideMimeType("application/json");
       jsonReq.open('GET', 'chart-data.json', true);

       jsonReq.onreadystatechange = function () {
       if (jsonReq.readyState == 4 && jsonReq.status == "200") {
          
           getResponse(jsonReq.responseText);

         }
       }
       jsonReq.send();
       
     }


     function getResponse(response){ 
       var result = JSON.parse(response); 
        
	userDataColl=result;
 
var out = "<table width=500px style='border:1px solid black' ><th>Name</th><th>Score</th><th>Rank</th><th>Event</th> <tr> </tr>";
    var i;
    for(i = 0; i < result.length; i++) {
        out += '<tr><td>' + result[i].name + '</td><td>' + getUserTotalScore(result[i])  + '</td><td>' + getUserTotalRank(result[i])+'</td> <td>' + getUserTotalEvent(result[i]) + '</td></tr>'
    }
   document.getElementById("grid_div").innerHTML = out;


    out += " </table>";
     }

//////////**********************









///////////-------------///////////




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
	chartListingDataColl=[];
	for (var dayCount = 0; dayCount < getDayCount; dayCount++) 
	{
		var cordnatColl=[dayCount]; 
		for (var i = 0; i < userDataColl.length; i++) 
		{ 
			cordnatColl.push( parseChartDataByType(userDataColl[i],type)[dayCount]); 
		} 
		chartListingDataColl.push( cordnatColl );
	};
	return chartListingDataColl;
}