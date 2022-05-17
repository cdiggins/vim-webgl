class DateTime {

}

class Guid {

}

class Participant {

}

class Session {
    start: DateTime;
    completion: DateTime;    
}
enum SessionEventKind {
    userJoin,
    userLeave,
    started,
    completed,
    error,
    idle,
    message, 
    rfi,
    note,
    issue,
    annotation, 
}

class SessionEvent {

}

class Project {

}

class Member {
}

class PointOfInterest {

}

class Discussion {

}

class Note {

}

class RFI {

}

class Moment {
    pointOfInterest: PointOfInterest;
}

