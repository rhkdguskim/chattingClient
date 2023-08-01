export interface LoginData {
    user_id : string;
    password : string;
}

export interface SignupData {
    user_id: string;
    password : string;
    name : string
}

// JWT Token Decord 정보
export interface Auth {
    id : number;
    user_id : string;
}