"use strict";

module.exports = (function(){

    var fs = require("fs"),
        config = require('./config.js');

    function readFile(fileName, done){
        fs.readFile(fileName, function (err, data) {
            if (err) {
                done("Unable to read file:" + err);
                return;
            }

            done(err, data.toString());
        });
    }
    function readAPINames(data, done){
        var lines = data.split("\n"),
            count = 0,
            apiLists = "",
            getAPI = "",
            putAPI = "",
            postAPI = "",
            deleteAPI = "";

        if(lines.length <= 0){
            done(new Error("File is empty or only have one line, please make sure you use right file!"));
            return;
        }

        var len = lines.length;
        for(var i = 0; i <= len; i++){
            if(lines[i].indexOf(config.getAPI) > -1) {
                count++;
                getAPI = getAPI + "[GET]: " + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.postAPI) > -1) {
                count++;
                postAPI = postAPI + "[POST]: " + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.deleteAPI) > -1) {
                count++;
                deleteAPI = deleteAPI + "[DELETE]: " + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }else if(lines[i].indexOf(config.putAPI) > -1) {
                count++;
                putAPI = putAPI + "[PUT]: " + lines[i].substring(lines[i].lastIndexOf("('") + 2, lines[i].lastIndexOf("',")) + "\r\n";
            }

            if(i === len - 1) {
                apiLists = getAPI + postAPI + putAPI + deleteAPI;
                done(null, {"totalAPI": count, "listAllAPINames": apiLists, "getAPI": getAPI, "putAPI": putAPI, "postAPI": postAPI, "deleteAPI": deleteAPI});
                return;
            }
        }
    }

    var apiFinder = {
        getAPINames: function(fileName, done){
            if(fileName === null || fileName === "" || fileName === "undefined") {
                done(new Error("fileName should not be Null, empty and undefined"));
                return;
            }

            readFile(fileName, function(err, data){
                if(err){
                    done(err);
                    return;
                }

                if(data === null || data === "") {
                    done(new Error("File is empty, please make sure you use right file!"));
                    return;
                }
                readAPINames(data, done)
            });
        },
        getAPINamesAndWriteInFile: function(fileName, outFileName, done){
            if(fileName === null || fileName === "" || fileName === "undefined") {
                done(new Error("fileName should not be Null, empty and undefined"));
                return;
            }
            outFileName = outFileName || "outAPINames.txt";
            apiFinder.getAPINames(fileName, function(err, lists){
                if(err){
                    done(err, false);
                    return;
                }

                fs.writeFile(outFileName, "Total API:" + lists.totalAPI + "\r\n" + lists.listAllAPINames, function(err){
                    if(err){
                        done(err, false);
                        return;
                    }

                    done(err, true);
                });
            });
        }
    }

    return apiFinder;
})();

