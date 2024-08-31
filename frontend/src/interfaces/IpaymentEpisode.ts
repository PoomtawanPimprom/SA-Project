import { UsersInterface } from "./IUser";
import { EpisodesInterface } from "./IEpisodes";

export interface PaymentEpisodeInterface {
    ID?: number;
    
    EpisodesID?: number;
    Episodes?:EpisodesInterface;
 
    MemberID?: string;
    Member?:UsersInterface;
}