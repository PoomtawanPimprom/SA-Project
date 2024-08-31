import { UsersInterface } from "./IUser";
import { SeriesInterface } from "./ISeries";
export interface RatingInterface {
    ID?: number;
    
    MemberID?: string;
    // Member?:UsersInterface;
    CartoonID?: number;
    // Cartoon?:SeriesInterface;
}