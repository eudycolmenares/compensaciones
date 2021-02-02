import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ButtonsTable as Buttons } from '../../libraries/utilities.library';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() dataBase: object[];
  @Input() structure: object[];
  @Input() buttons: Buttons[] = [Buttons.edit, Buttons.disable, Buttons.delete];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

}
