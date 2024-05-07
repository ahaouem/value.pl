export type TBlock = {
  id: number;
  size: BlockSize;
  data: string;
  data_type: BlockType;
};
export enum BlockType {
  Quote = "quote",
  CallToAction = "callForHelp",
  Breathe = "breathe",
  AddDailyJournal = "addDailyJournal",
}

export type BlockSize = {
  width: number;
  height: number;
};
