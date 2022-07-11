import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('headerRef')headerRef!: ElementRef;

  @ViewChild(MatExpansionPanel)matExpansionCompo!: MatExpansionPanel;

  bannerImageHeight = 520; // 600 - 80

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.scrollEvt, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvt);
  }

  scrollEvt = (): void => {
    window.pageYOffset > this.bannerImageHeight ?
      this.headerRef.nativeElement.classList.add('over')
      : this.headerRef.nativeElement.classList.remove('over');
  };

}
