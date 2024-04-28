import ballerina/os;

public configurable string DB_HOST = getFromEnvVariable("DB_HOST");
public configurable string DB_NAME = getFromEnvVariable("DB_NAME");
public configurable string DB_USERNAME = getFromEnvVariable("DB_USERNAME");
public configurable string DB_PASSWORD = getFromEnvVariable("DB_PASSWORD");
public configurable int DB_PORT =  getIntFromEnvVariable("DB_PORT");

function getFromEnvVariable(string envVaribale, string defaultValue = "") returns string {
    string envVariableVal = os:getEnv(envVaribale);
    string valueToSet = envVariableVal != "" ? envVariableVal : defaultValue;
    return valueToSet;
}

function getIntFromEnvVariable(string envVaribale, int defaultValue = 0) returns int {
    string envVariableVal = os:getEnv(envVaribale);
    int| error envVariableInt = int:fromString(envVariableVal);
    int valueToSet = envVariableVal != "" && envVariableInt is int ? envVariableInt : defaultValue;
    return valueToSet;
}