
export class Profile{
    'firstName': string;
    'lastName':string;
    'email':string;
    'phone':string;
    '_id':string;
    
}

export class Response{
    "error":boolean;
    "data":Profile[];
    "message":string
}

export class ResponseSingle{
    "error":boolean;
    "data":Profile;
    "message":string
}

export class InternalError{
    "value":boolean;
    "message":string;
}