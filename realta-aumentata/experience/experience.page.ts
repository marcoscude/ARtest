import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Device } from '@capacitor/device';
import { Utils } from '../../services/utils';
import { Api } from '../../services/api';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
  standalone: false,
})
export class ExperiencePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private utils: Utils, private api: Api) { }

  deviceId?: string;
  marker?: any = null
  codice_marker?: string = "";



  async ngOnInit() {
    const info = await Device.getId();
    this.deviceId = info.identifier;

    this.codice_marker = this.route.snapshot.paramMap.get('ar') ?? '';
    if (this.codice_marker) {

      setTimeout(() => {
        this.introAR2();
      }, 300)
      this.api.getMarker(this.codice_marker).subscribe({
        next: (response) => {
          this.marker = response.data;
          console.log('Dati ricevuti:', this.marker);
        },
        error: (err) => console.error(err)
      });
    }



    window.addEventListener('message', (event) => {
      if (event.data.action === 'redirect') {
        this.router.navigateByUrl(event.data.url);
      }
    });
  }

  introAR2() {
    let bubbles = document.querySelectorAll('.AR2.talk-bubble');
    let avatar = document.querySelector('.AR2.avatar');
    let imgs = [
      'bibliotecario-saluta.png',
      'bibliotecario-braccia.png',
      'bibliotecario-indica.png',
      'bibliotecario-manotesta.png',
      'bibliotecario-saluta.png',
    ]
    for (let i = 0; i < bubbles.length; i++) {
      setTimeout(() => {
        if (avatar)
        avatar.setAttribute('src', 'assets/img/'+imgs[i]);
        if (i > 0)
          bubbles[(i - 1)].classList.add('d-none');
        bubbles[i].classList.remove('d-none');

        if (i+1 == bubbles.length){
          setTimeout(()=>{
            this.router.navigate(['/realta-aumentata/experience', 'AR2_EXP']);
          },1000)
        }
      }, 2000 + (i * 3000))
    }

  }

}
