**api-name-finder**
---

**api-name-finder** help users to fetch all API name from specified file. 

_Installation_
---
```javascript
npm install api-name-finder
```

_Quick Start_
---

**api-name-finder** is very easy to start and get all api name.  This module content 2 main tasks which help users to get API Names.

1.  getAPINames: Fetch all API names and return a json object
	
	_usage:  getAPINames("filename", callback)_
		
	**params:**
	_**filename**: require file name which content node API name (like route.js)._
	_**callback**: Callback function should have 2 parameters; one for error holding and other for list of api. For example - function (err, apiLists){}. _
		
2. getAPINamesAndWriteInFile:  Fetch all api names and save all of them in a file.
	
	_usage: getAPINamesAndWriteInFile("readFilename", "saveFilename", callback)_
	
	**params:**
	_**readFilename**: filename which content api names for read._
	_**saveFilename**: filename where you want to save all api name._
	_**callback**: Callback function should have 2 parameters; one for error holding and other for confirmation of data save. For example - function (err, isDataSave){}_

refer this example for your reference 
```javascript
var apiFinder = require("api-name-finder");

apiFinder.getAPINames("routes.js", function(err, lists){
    if(err)
        console.log(err);
    console.log("API from routes.js\n\n");
    console.log(lists.listAllAPINames);

})

apiFinder.getAPINames("routes-reports.js", function(err, lists){
    if(err)
        console.log(err);
    console.log("\nAPI from route-reports.js\n");
    console.log(lists.listAllAPINames);
    
});

apiFinder.getAPINamesAndWriteInFile("routes1.js", "outRoute.txt", function(err, isDataSaved){
    if(err)
        console.log(err)

    if(isDataSaved)
        console.log("Data saved successfully!");
});
apiFinder.getAPINamesAndWriteInFile("routes-reports.js", "outRoutesReport.txt", function(err, isDataSaved){
    if(err)
        console.log(err)

    if(isDataSaved)
        console.log("Data saved successfully!");
});

```
