console.log('This would be the main JS file.');

var currentUserRawData;
var userDataColl=[];
var chartListingDataColl=[];
var getDayCount=10;






function getUserData()
{
		 // load json data here and parse it into ''userDataColl'' //
userDataColl=[
{
	"name": "Arun",
	"dataInfo" :"Monthly Employee details such as Rank,Score and Events",
	"startDate": "01-jan-2015",
	"endDate"  : "31-jan-2015",
	"dayCount" : "30",
	"ranks"    : [ {"day":"1","rank":"10"},{"day":"2","rank":"12"},{"day":"3","rank":"16"},{"day":"4","rank":"10"},{"day":"5","rank":"10"}],
	"scores"   : [ {"day":"1","score":"10"},{"day":"2","score":"12"},{"day":"3","score":"16"},{"day":"4","score":"10"},{"day":"5","score":"10"}],
	"events"   : [ {"day":"1","event":"10"},{"day":"2","event":"12"},{"day":"3","event":"16"},{"day":"4","event":"10"},{"day":"5",event:"10"}],
	"maxRank"  : "100",
	"maxScore" : "100",
	"maxEvent" : "100" 
}
,

{
	"name": "John",
	"dataInfo" :"Monthly Employee details such as Rank,Score and Events",
	"startDate": "01-jan-2015",
	"endDate"  : "31-jan-2015",
	"dayCount" : "30",
	"ranks"    : [ {"day":"1","rank":"30"},{"day":"2","rank":"22"},{"day":"3","rank":"46"},{"day":"4","rank":"20"},{"day":"5","rank":"4"}],
	"scores"   : [ {"day":"1","score":"4"},{"day":"2","score":"5"},{"day":"3","score":"26"},{"day":"4","score":"21"},{"day":"5","score":"32"}],
	"events"   : [ {"day":"1","event":"23"},{"day":"2","event":"67"},{"day":"3","event":"46"},{"day":"4","event":"40"},{"day":"5",event:"20"}],
	"maxRank"  : "100",
	"maxScore" : "100",
	"maxEvent" : "100" 
},
{
	"name": "Nishin",
	"dataInfo" :"Monthly Employee details such as Rank,Score and Events",
	"startDate": "01-jan-2015",
	"endDate"  : "31-jan-2015",
	"dayCount" : "30",
	"ranks"    : [ {"day":"1","rank":"17"},{"day":"2","rank":"62"},{"day":"3","rank":"46"},{"day":"4","rank":"90"},{"day":"5","rank":"34"}],
	"scores"   : [ {"day":"1","score":"4"},{"day":"2","score":"5"},{"day":"3","score":"26"},{"day":"4","score":"21"},{"day":"5","score":"32"}],
	"events"   : [ {"day":"1","event":"23"},{"day":"2","event":"67"},{"day":"3","event":"46"},{"day":"4","event":"40"},{"day":"5",event:"20"}],
	"maxRank"  : "100",
	"maxScore" : "100",
	"maxEvent" : "100" 
},
{
	"name": "Jayakrishnan",
	"dataInfo" :"Monthly Employee details such as Rank,Score and Events",
	"startDate": "01-jan-2015",
	"endDate"  : "31-jan-2015",
	"dayCount" : "30",
	"ranks"    : [ {"day":"1","rank":"60"},{"day":"2","rank":"17"},{"day":"3","rank":"4"},{"day":"4","rank":"40"},{"day":"5","rank":"14"}],
	"scores"   : [ {"day":"1","score":"4"},{"day":"2","score":"5"},{"day":"3","score":"26"},{"day":"4","score":"21"},{"day":"5","score":"32"}],
	"events"   : [ {"day":"1","event":"23"},{"day":"2","event":"67"},{"day":"3","event":"46"},{"day":"4","event":"40"},{"day":"5",event:"20"}],
	"maxRank"  : "100",
	"maxScore" : "100",
	"maxEvent" : "100" 
}
]; 

	 
}

function createCHartDataByUser(user)
{ 

	return [];
}






function renderChartByType(data,type)
{
	 
	
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