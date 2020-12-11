import { SortDirection } from '../directives/sortable.directive';

export interface StatePagination {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}
