import { FollowInterface } from "./IFollow";
import { SeriesInterface } from "./ISeries";
export interface UsersInterface {
  ID?: Number;
  Username?: string;
  Password?:	string;
	Email?:	string;
  Coins?: Number;
  //FK
  PaymentCoins?: Number;
  PaymentEpisodes?: Number;
  Comments?: Number;
  Historys?: Number;
  Ratings?: Number;
  Cartoons?: Number;
  FollowedCartoon?: SeriesInterface;
}