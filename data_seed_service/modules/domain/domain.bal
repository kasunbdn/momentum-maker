public type Activity record {
    string key?;
    string activity?;
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