public type UserActivity record {
    int id?;
    string userId?;
    int activityId?;
    int status?;
    string  startedOn?;
    string  completedOn?;
    string  createdDate?;
};

public type Activity record {
    int id?;
    string key?;
    string description?;
    string url?;
    ActivityType activityType?;
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