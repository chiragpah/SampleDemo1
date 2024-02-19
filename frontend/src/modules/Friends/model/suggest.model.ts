// Inside suggest.model.ts

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic: string ;
}

export interface PendingRequestData {
  id: number;
  sender: User;
  receiver: User;
  is_accepted: boolean;
  timestamp: string;
}

export interface FreindCardData {
  id: number;
  user: User; // Use User instead of duplicating fields
  is_accepted: boolean;
  timestamp: string;
}

export interface FriendCardData {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
}

export interface ApiFriendData {
  id: number;
  sender: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_pic: string | null;
  };
  receiver: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_pic: string | null;
  };
  is_accepted: boolean;
  timestamp: string;
}