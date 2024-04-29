public type UserActivity record {
    int userActivityId?;
    string userId?;
    int activityId?;
    int status?;
    string  startedDate?;
    string  completedDate?;
    string  createdDate?;
};

public type Activity record {
    int activityId?;
    string key?;
    string activity?;
    string url?;
    ActivityType activityType?;
};

public type ViewActivity record {
    int userActivityId?;
    int activityId?;
    string activity?;
    ActivityType activityType?;
    int status?;
};

public enum ActivityType {
    EDUCATION,
    RECREATIONAL,
    SOCIAL,
    DIY,
    CHARITY,
    COOKING,
    RELAXATION,
    MUSIC,
    BUSYWORK
}