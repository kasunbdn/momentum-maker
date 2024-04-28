CREATE TABLE UserActivity (
    id SERIAL PRIMARY KEY,
	userId VARCHAR(255),
    activityId INT,
    status INT,
    startedDate VARCHAR(100),
    completedDate VARCHAR(100),
    createdDate VARCHAR(100)
);

CREATE TABLE Activity (
    id  SERIAL PRIMARY KEY,
    key VARCHAR(255),
    activity VARCHAR(1024),
    url VARCHAR(1024),
    activityType VARCHAR(25),
    createdDate VARCHAR(100),
    updatedDate VARCHAR(100)
);