export type TBlock = {
  id: number;
  size: BlockSize;
  data: string;
  data_type: BlockType;
};
export enum BlockType {
  Quote = "quote",
  CallForHelp = "callForHelp",
  AddDailyJournal = "addDailyJournal",
  Streak = "streak",
}

export type BlockSize = {
  width: number;
  height: number;
};
