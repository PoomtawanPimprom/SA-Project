import { UsersInterface } from "./IUser";
import { SeriesInterface } from "./ISeries";
export interface FollowInterface {
    ID?: number;
    
    MemberID?: string;
    // Member?:UsersInterface;
    CartoonID?: number;
    // Cartoon?:SeriesInterface;
}