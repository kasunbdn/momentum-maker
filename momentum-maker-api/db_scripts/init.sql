CREATE TABLE UserActivity (
    userActivityId SERIAL PRIMARY KEY,
	userId VARCHAR(255),
    activityId INT,
    status INT,
    startedDate VARCHAR(100),
    completedDate VARCHAR(100),
    createdDate VARCHAR(100)
);

CREATE TABLE Activity (
    activityId  SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE,
    activity VARCHAR(1024),
    url VARCHAR(1024),
    activityType VARCHAR(25),
    createdDate VARCHAR(100),
    updatedDate VARCHAR(100)
);