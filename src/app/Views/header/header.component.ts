import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('headerRef')headerRef!: ElementRef;

  scrollEvt!: any;

  constructor() {}

  ngOnInit(): void {}

  onToggle(el: HTMLSpanElement): void {
    el.classList.toggle('hidden');
  }

  ngAfterViewInit(): void {
    this.scrollEvt = () => {
      window.pageYOffset > 520 ? // 當滑超過 bannerImage 的高度時，為 header 加入背景圖
        this.headerRef.nativeElement.classList.add('over')
        : this.headerRef.nativeElement.classList.remove('over');
    };
    window.addEventListener('scroll', this.scrollEvt, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvt);
  }

}
