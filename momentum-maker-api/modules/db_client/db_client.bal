import momentum_maker_api.domain;
import momentum_maker_api.config;

import ballerina/sql;
import ballerina/time;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

public isolated client class Client {
    private final postgresql:Client dbClient;

    public function init() returns error? {
        self.dbClient = check new (config:DB_HOST, config:DB_USERNAME, config:DB_PASSWORD, config:DB_NAME, config:DB_PORT);
    }

    public isolated function queryActivitiesByUser(string username) returns domain:ViewActivity[]|error? {
        sql:ParameterizedQuery query = `SELECT userActivityId, activity, status, activityType FROM UserActivity LEFT JOIN Activity USING(activityId) WHERE userId = ${username}`;
        stream<domain:ViewActivity, sql:Error?> resultStream = self.dbClient->query(query);
        return from domain:ViewActivity activity in resultStream
            select activity;
    }

    public isolated function addUserActivity(string username, int activityId) returns string|error {
        sql:ParameterizedQuery query = `INSERT INTO UserActivity(userId, activityId, status, createdDate)
                                  VALUES (${username}, ${activityId}, ${0}, ${time:utcToString(time:utcNow())})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        return result.lastInsertId.toString();
    }

    public isolated function deleteUserActivity(int id) returns int?|error? {
        sql:ParameterizedQuery query = `DELETE FROM UserActivity WHERE userActivityId = ${id}`;
        sql:ExecutionResult result = check self.dbClient->execute(query);
        return result.affectedRowCount;
    }

    public isolated function startUserActivity(int id) returns int?|error? {
        sql:ParameterizedQuery query = `UPDATE UserActivity SET status = 1, startedDate = ${time:utcToString(time:utcNow())} WHERE userActivityId = ${id}`;
        sql:ExecutionResult result = check self.dbClient->execute(query);
        return result.affectedRowCount;
    }

    public isolated function completeUserActivity(int id) returns int?|error? {
        sql:ParameterizedQuery query = `UPDATE UserActivity SET status = 2, completedDate = ${time:utcToString(time:utcNow())} WHERE userActivityId = ${id}`;
        sql:ExecutionResult result = check self.dbClient->execute(query);
        return result.affectedRowCount;
    }

    public isolated function getActivityByType(domain:ActivityType activityType) returns domain:Activity|error? {
        sql:ParameterizedQuery query = `SELECT TOP 1 activityId, activity, url, activityType FROM Activity WHERE activityType = ${activityType} ORDER BY RANDOM()`;
        return self.dbClient->queryRow(query);
    }
}
