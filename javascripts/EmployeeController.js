EmployeeController = function ()
{


this.employeeList=[];
this.totalEmployees=function()
{
	if(this.employeeList)
		return this.employeeList.length;
	else
		return 0; 
}

this.setEmployeeData=function(data)
{
	if(data)
	{
		this.employeeList = data;
	}
}
this.getEmployeeData=function()
{ 
	return	this.employeeList;
}



this.addEmployee =function (emplObj) 
{
	if(emplObj)
	{
		this.employeeList.push(emplObj);
	}
	else
	{
		alert('no data for new employee');
	}
}

this.getNewEmployeeObj = function (name,startDate,endDate,dayCount,maxRank,maxScore,maxEvent)
{ 
	var emp={};
	emp.name=(name)? name:"No Name found"; 
	emp.dataInfo ="Monthly Employee details such as Rank,Score and Events";
	emp.startDate= (startDate)? startDate:"01-jan-2015";
	emp.endDate = (endDate)? endDate:"31-jan-2015";
	emp.dayCount = (dayCount)? dayCount: 30 ;
	emp.ranks  = createEmptyChartDataByType('rank' ,emp );
	emp.scores = createEmptyChartDataByType( 'score' ,emp ); 
	emp.events = createEmptyChartDataByType( 'event' ,emp ); 
	emp.maxRank = (maxRank)? maxRank:"100";
	emp.maxScore = (maxScore)? maxScore:"100";
	emp.maxEvent = (maxEvent)? maxEvent:"100" ; 
	return emp;
}

// private function to fill the sample data for chart data types //
function createEmptyChartDataByType(type,empObj)
{
	 
	var dataColl=[];
	for (var i =0;  i<  empObj.dayCount ; i++) 
		{  
			if(type=='rank')
			dataColl.push({day:(i+1),rank:0});

			else if(type=='score')
			dataColl.push({day:(i+1),score:0});

			else if(type=='event')
			dataColl.push({day:(i+1),event:0});
		} 
	return dataColl;
}




function updateEmployeeById (empId) 
{
	//
}

function updateEmployee(employeeObj)
{
	//
}

function removeEmployee (argument) 
{
	//
}

function getEmployeeByID (empId) 
{
	//
}

function saveAllEmployees()
{
	// Send JSON data to the server

}








}