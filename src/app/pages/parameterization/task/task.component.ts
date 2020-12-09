import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { CountryService } from '../../../services/country.service';
import { NgbdSortableHeader, SortEvent } from '../../../directives/sortable.directive';

interface Country {
  id: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  model: NgbDateStruct;
  time = {hour: 13, minute: 30};

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    // this.headers.forEach(header => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
