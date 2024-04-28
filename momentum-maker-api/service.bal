import momentum_maker_api.db_client;
import momentum_maker_api.domain;

import ballerina/http;

final db_client:Client dbClient = check new ();

service / on new http:Listener(9090) {

    # A resource for getting a random activity by the activity type
    # + activityType - the activity type
    # + return - Activity
    resource function get activity(domain:ActivityType activityType) returns domain:Activity|error {
        return check dbClient.getActivityByType(activityType) ?: {};
    }

    # A resource for getting activity list of a user
    # + return - Activity List
    resource function get userActivity(string username) returns domain:UserActivity[]|error {
        return check dbClient.queryActivitiesByUser(username) ?: [];
    }

    # A resource for assigning an activity to a user
    # + return - id
    resource function post userActivity(string username, int activityId) returns string|error {
        return check dbClient.addUserActivity(username, activityId);
    }

    # A resource for removing an activity from a user
    # + return - success or failure
    resource function delete userActivity/[int id]() returns int|error {
        return check dbClient.deleteUserActivity(id) ?: 0;
    }

    # A resource to start an activity
    # + return - success or failure
    resource function put startActivity/[int id]() returns int|error {
        return check dbClient.startUserActivity({id: id, status: 1}) ?: 0;
    }

    # A resource to complete an activity
    # + return - success or failure
    resource function put completeActivity/[int id]() returns int|error {
        return check dbClient.completeUserActivity({id: id, status: 1}) ?: 0;
    }
}

