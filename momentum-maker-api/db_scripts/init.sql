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

-- Index for 'userId' in 'UserActivity' table
CREATE INDEX idx_useractivity_userid
ON UserActivity (userId);

-- Index for 'activityId' in 'UserActivity' table
CREATE INDEX idx_useractivity_activityid
ON UserActivity (activityId);

-- Index for 'userActivityId' in 'UserActivity' table
CREATE INDEX idx_useractivity_useractivityid
ON UserActivity (userActivityId);

-- Index for 'activityId' in 'Activity' table
CREATE INDEX idx_activity_activityid
ON Activity (activityId);

-- Index for 'activityType' in 'Activity' table
CREATE INDEX idx_activity_activitytype
ON Activity (activityType);
