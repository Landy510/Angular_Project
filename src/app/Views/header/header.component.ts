import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() sideMenuOpen !: boolean;

  @Output() toggle = new EventEmitter<null>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['sideMenuOpen']);
  }

  ngOnInit(): void {}

  onToggle(): void {
    console.log('123123');
    this.toggle.emit(null);
  }

}
