import data_seed_service.config;
import data_seed_service.db_client;
import data_seed_service.domain;

import ballerina/http;
import ballerina/io;
import ballerina/regex;

public type ActivityJson record {
    string activity;
    string 'type;
    string link;
    string key;
};

public function main() returns error? {
    final db_client:Client dbClient = check new ();

    http:Client dataClient = check new (config:FILE_HOST);

    http:Response rsp = check dataClient->get(config:FILE_PATH);

    string[] readLines = regex:split(check rsp.getTextPayload(), "(\r\n|\r|\n)");
    int recordCount = readLines.length();

    io:println("No. of records to be inserted: " + recordCount.toString());

    int insertedRecords = 0;

    readLines.forEach(function(string line) {
        ActivityJson|error converted = line.fromJsonStringWithType();
        if (converted is ActivityJson) {
            domain:ActivityType|error activityType = getActivityType(converted.'type);

            if (activityType is domain:ActivityType) {
                string|error insertActivity = dbClient.insertActivity({key: converted.key, activity: converted.activity, url: converted.link, activityType: activityType});

                if (insertActivity is string) {
                    insertedRecords += 1;
                } else {
                    io:println("Error inserting record| key=" + converted.key + " | Exception: " + insertActivity.toBalString());
                }
            } else {
                io:println("Error inserting record| key=" + converted.key + " | Exception: " + activityType.toBalString());
            }
        } else {
            io:println("Error inserting record | Exception: " + converted.toBalString());
        }
    });

    io:println("No. of records failed: " + (recordCount - insertedRecords).toString());
    io:println("No. of records inserted: " + insertedRecords.toString());

}

function getActivityType(string activityType) returns domain:ActivityType|error {
    string str = activityType.toUpperAscii();
    if str == "BUSYWORK" {
        return domain:BUSYWORK;
    }
    if str == "CHARITY" {
        return domain:CHARITY;
    }
    if str == "COOKING" {
        return domain:COOKING;
    }
    if str == "DIY" {
        return domain:DIY;
    }
    if str == "EDUCATION" {
        return domain:EDUCATION;
    }
    if str == "MUSIC" {
        return domain:MUSIC;
    }
    if str == "RECREATIONAL" {
        return domain:RECREATIONAL;
    }
    if str == "RELAXATION" {
        return domain:RELAXATION;
    }
    if str == "SOCIAL" {
        return domain:SOCIAL;
    }
    return error("Activity type not found! " + str);
}
