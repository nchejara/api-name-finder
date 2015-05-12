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

**api-name-finder** modules is very easy to get start and find all api lists. This modules helps to read API files(specified by user) and fetch all APIs. This modules has 2 basic functions which helps to retrieve API lists and save them in file.

1.***getAPIs*** function read and filter APIs from specified filesand returns a lists of APIs in json object. This function take 3 parameters: fileNames, filters and callback function.

***Usage:***
```javascript
apiFinder.getAPIs(filename, filter, function(err, lists){
    if(err)
        console.log(err);

    console.dir(lists);
});
```

***filename**: File name can be a single file or array of files.*
***filter**: Filter APIs lists. filter ca be a string or array of string.*
***callback**: a function that can hold err and apiLists.*
		
2.***getAndSaveAPIs** function is same as ***getAPIs*** function and it help to save all api lists in file.*
 
***Usage:***
```javascript
apiFinder.getAndSaveAPIs(filename, "saveAPIList.txt", filterArray, function(err, isDataSaved){
    if(err)
        console.log(err)

    if(isDataSaved)
        console.log("Data saved successfully!");
});
});
```

Example for reference 
```javascript
var apiFinder = require("api-name-finder");

var fileArray = ["add your API filename"];
var filterArray = ["Add your filter"];
apiFinder.getAPIs(fileArray, filterArray, function(err, lists){
    if(err)
        console.log(err);

    console.dir(lists);
});
apiFinder.getAndSaveAPIs(fileArray, "route.txt", filterArray, function(err, isDataSaved){
    if(err)
        console.log(err)

    if(isDataSaved)
        console.log("Data saved successfully!");
});
```
