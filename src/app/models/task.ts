export interface TaskModel {
  id: number;
  period: string;
  date: string;
  time: string;
  status: string;
}

export interface SearchResultModel {
  tasks: TaskModel[];
  total: number;
}
