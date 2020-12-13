import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesData as routes} from '../../libraries/utilities.library';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
  urlTitle: string[];

  constructor(private router: Router) {
    this.getDataWithUrl();
  }

  ngOnInit(): void {
  }

  getDataWithUrl() {
    const urlFraction = this.router.url.split('/')
    const nameUrl = urlFraction[urlFraction.length - 1];
    this.urlTitle = routes[nameUrl].breadcrumb;
  }
}
