export interface Card {
  images: string[];
  time: number;
  user_id: string;
}

export interface Images {
  id: string;
  image?: string;
  pair_id: string;
  isSelected: boolean;
  isMatched: boolean;
  numOfCards: number;
}

export interface Post {
  id: number;
  time: number;
  matches: number;
}
