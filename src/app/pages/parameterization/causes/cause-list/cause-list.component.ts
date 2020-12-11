import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../../data/services/forms/api/api.service";

@Component({
  selector: 'app-cause-list',
  templateUrl: './cause-list.component.html',
  styleUrls: ['./cause-list.component.scss']
})
export class CauseListComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    console.log("data: ", this.api.getCause(23210).subscribe(
      result => {
           
              console.log(result);

      },
      error => {
          console.log(<any>error);
      }
  )
);
    
  }

}
