export interface IOption {
  image?: string;
  text?: string;
}

export interface IQuestion {
  options: IOption[];
  title?: string;
  question?: string;
}

export interface IPoll {
  currentQuestion: number;
  questions: IQuestion[];
}
