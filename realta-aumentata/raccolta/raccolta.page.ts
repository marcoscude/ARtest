import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation, Pagination } from 'swiper/modules';
import SwiperCore, { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';

SwiperCore.use([Navigation, Pagination]);
register();


@Component({
  selector: 'app-raccolta',
  templateUrl: './raccolta.page.html',
  styleUrls: ['./raccolta.page.scss'],
  standalone: false,
})
export class RaccoltaPage implements OnInit {
  @ViewChild('swiperone', { static: true }) swiperRef!: any;
  swiperInstance?: any = null;
  activeIndex = 0;
  selected = 'ar';
  selectedMini = 'raccolta';
  menucolor = 'ar';
  menucolorf = '';


  active_marker_codice?: any = "tutti";
  active_marker_color?: any = "#000";

  progress = 10;
  config: SwiperOptions = {
    pagination: false,
    navigation: true,
    slidesPerView: 6
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;

    // Ottieni l'istanza di Swiper
    this.swiperInstance = swiperEl.swiper;

    // Ascolta l’evento nativo slidechange
    if (this.swiperInstance) {
      console.log('Swiper inizializzato ✅');

      // ✅ evento corretto: 'slidechange' (tutto minuscolo)
      swiperEl.addEventListener('swiperslidechange', () => {
        this.activeIndex = this.swiperInstance?.activeIndex ?? 0;
        console.log('Slide attiva:', this.activeIndex);

        const slides = swiperEl.querySelectorAll('swiper-slide');
        const activeSlide = slides[this.activeIndex] as HTMLElement;

        // ✅ Leggi l’attributo data-marker
        this.active_marker_codice = activeSlide?.getAttribute('data-marker');
        this.active_marker_color = activeSlide?.getAttribute('data-marker');

      });
    }
  }

  switchMenu(value: string) {

    this.selectedMini = value;
    setTimeout(() => {
      if (value == 'raccolta') {
        this.menucolorf = '';
        this.menucolor = 'ar';
        this.router.navigate(['/realta-aumentata/raccolta']);
      } else {
        this.menucolorf = 'ar';
        this.menucolor = '';
        this.router.navigate(['/realta-aumentata'], { replaceUrl: true });
      }
    }, 200)

    //this.selectedMini = value;
  }

  onSlideChange(event: any) {
    this.activeIndex = this.swiperInstance?.activeIndex ?? 0;
    console.log(this.activeIndex);
  }

  getSfondo():any {
    switch(this.active_marker_codice) {
      case "tutti":
      case "rossi":
        return "arbg";
      break;

      case "viola":
        return "map inner";
      break;

      case "azzurri":
        return "lib shade_inv";
        break;

      case "verdi":
        return "info shade_inv";
        break;
    }
  }

}
