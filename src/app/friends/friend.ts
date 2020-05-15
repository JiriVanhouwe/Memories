export interface IFriend{
    lastName: string,
    firstName:string,
    email:string,
    friends:IFriend[]
    
}
    export class Friend{
   // private _id: number;

    constructor(private _firstName: string,
        private _lastName: string,
        private _email: string,
        private _friends: Friend[]){
    }

    static fromJSON(json: IFriend): Friend{
        if(json.friends)
            return new Friend(json.firstName, json.lastName, json.email, json.friends.map(Friend.fromJSON));
            else  return new Friend(json.firstName, json.lastName, json.email, []);
        
    }


    

    get firstName(): string{
        return this._firstName;
    }

    get lastName():string{
        return this._lastName;
    }

    get email():string{
        return this._email;
    }
    get friends(){
        return this._friends;
    }
}