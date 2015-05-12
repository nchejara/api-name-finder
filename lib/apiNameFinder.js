"use strict";

module.exports = (function(){

    var fs = require("fs"),
        config = require('./config.js');

    function readAPINames(data, done){
        var lines = data.split("\r\n"),
            count = 0,
            apiLists = "";

        if(lines.length <= 0){
            done(new Error("File is empty or only have one line, please make sure you use right file!"));
            return;
        }

        var len = lines.length;
        for(var i = 0; i < len; i++){
            if(lines[i].indexOf(config.getAPI) > -1) {
                count++;
                apiLists = apiLists + "GET||" + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.postAPI) > -1) {
                count++;
                apiLists = apiLists + "POST||" + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.deleteAPI) > -1) {
                count++;
                apiLists = apiLists + "DELETE||" + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.putAPI) > -1) {
                count++;
                apiLists = apiLists + "PUT||" + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }

            if(i === len - 1) {
                done(null, {"totalAPI": count, "apiLists": apiLists});
                return;
            }
        }
    }
    function isArrayObject(obj){
        return  Object.prototype.toString.call(obj) === "[object Array]";
    }
    function filterBy(apiLists, filter, done){

        if(isArrayObject(filter))
            if(filter.length <= 0)
                filter = ['*'];
        else
            filter = filter || ['*'];

        var lines = apiLists.split("\r\n"),
            len = lines.length,
            filterLen = filter.length,
            filterLists = {},
            tempArray = [],
            apiNames = [];

        if(len <= 0){
            done("API lists is empty!");
            return;
        }

        for(var i = 0; i < filterLen; i++){
            filterLists["apiType"] = filter[i];

            for(var j = 0; j < len - 1; j++) {
                if(filter[i] === '*'){
                    var splitValue = lines[j].split('||');
                    tempArray.push({method: splitValue[0],apiName: splitValue[1]});
                }
                else {
                    if(lines[j].indexOf(filter[i]) > -1) {
                        var splitValue = lines[j].split('||');
                        tempArray.push({method: splitValue[0],apiName: splitValue[1]});
                    }
                }
            }

            filterLists["apiNames"] = tempArray;
            apiNames.push(filterLists);

            //Clear all temp variables
            tempArray = [];
            filterLists = {};

            if(i === filterLen -1){
                done(null, apiNames);
                return;
            }
        }

    }

    var apiFinder = {
        getAPIs: function(fileName, filter, done){

            if(typeof fileName !== "string" && isArrayObject(fileName) !== true){
                done("[Info]: First argument type should be string or array!")
                return;
            }
            if(fileName === null || fileName === "" || fileName === "undefined") {
                done("[Info]: fileName parameter is required. Please make sure it is not null, empty and undefined!");
                return;
            }
            if(filter === null || filter === "" || filter === "undefined") {
                done("[Info]: filter parameter is required. Please make sure it is not null, empty and undefined!");
                return;
            }

            var files = [],
                readData = "",
                len = 0;

            if(typeof fileName === "string")
                files.push(fileName);
            else
                files = fileName;

            len = files.length;
            for(var i = 0; i < len; i++) {
                try {
                    readData += fs.readFileSync(files[i]);

                }catch(err){

                    done("Unable to read file - " + err);
                    return;
                }
            }

            readAPINames(readData, function(err, lists){
                filterBy(lists.apiLists, filter, function(err, apiNames){
                    if(err) {
                        done(err);
                        return;
                    }
                    var apis = {totalAPI: lists.totalAPI, lists: apiNames};
                    done(err, apis);
                });
            });

        },
        getAndSaveAPIs: function(fileName, outFileName, filter, done){

            outFileName = outFileName || "getAPILists.txt";
            apiFinder.getAPINames(fileName, filter, function(err, lists){
                if(err){
                    done(err, false);
                    return;
                }

                fs.writeFile(outFileName, JSON.stringify(lists, null, 4), function (err) {
                    if (err) {
                        done(err, false);
                        return;
                    }

                    done(err, true);
                    return;
                });
            });
        }
    }

    return apiFinder;
})();
