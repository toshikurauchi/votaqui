export interface IOption {
  image?: string;
  text?: string;
}

export interface IQuestion {
  options: IOption[];
  title?: string;
  question?: string;
}

export interface IResult {
  [username: string]: number;
}

export interface IPollMeta {
  currentQuestion: number;
  acceptingVotes: boolean;
}

export interface IPoll {
  meta: IPollMeta;
  questions: IQuestion[];
}
