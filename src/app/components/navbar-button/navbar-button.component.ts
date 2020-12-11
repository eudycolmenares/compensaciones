import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.scss']
})
export class NavbarButtonComponent implements OnInit {

  @Input() opened: boolean;
  @Output() swToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.swToggle.emit(this.opened);
  }

}
