import { Types } from 'mongoose';
export interface JwtPayload {  
    sub: Types.ObjectId;
    username: string;
    role: number;
    roleString: string;
}