import data_seed_service.config;
import data_seed_service.domain;

import ballerina/sql;
import ballerina/time;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

public isolated client class Client {
    private final postgresql:Client dbClient;

    public function init() returns error? {
        self.dbClient = check new (config:DB_HOST, config:DB_USERNAME, config:DB_PASSWORD, config:DB_NAME, config:DB_PORT);
    }

    public isolated function insertActivity(domain:Activity activity) returns string|error {
        sql:ParameterizedQuery query = `INSERT INTO public.activity(
        key, activity, url, activitytype, createddate, updateddate)
        VALUES (${activity.key}, ${activity.activity}, ${activity.url}, ${activity.activityType}, ${time:utcToString(time:utcNow())}, ${time:utcToString(time:utcNow())})`;
        sql:ExecutionResult result = check self.dbClient->execute(query);

        return result.lastInsertId.toString();
    }

}
