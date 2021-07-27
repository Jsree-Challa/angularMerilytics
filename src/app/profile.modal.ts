
export class Profile{
    'firstName': string;
    'lastName':string;
    'email':string;
    'phone':string;
    '_id':string;
    
}

export class APIResponse{
    "error":boolean;
    "data": Profile[];
    "message":string
}

export class APIResponseSingle{
    "error":boolean;
    "data": Profile;
    "message":string
}

export class InternalError{
    "value":boolean;
    "message":string;
}