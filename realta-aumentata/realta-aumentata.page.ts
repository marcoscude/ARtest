import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-realta-aumentata',
  templateUrl: './realta-aumentata.page.html',
  styleUrls: ['./realta-aumentata.page.scss'],
  standalone: false,
})
export class RealtaAumentataPage implements OnInit {
  selected = 'ar';
  selectedMini = 'fotocamera';
  menucolor = '';
  menucolorf = 'ar';
  page=1;
  
  constructor(private router: Router) {}


  ngOnInit() {
    this.selectedMini = 'fotocamera';
  }

  switchMenu(value: string) {
    
      this.selectedMini = value;
      setTimeout(() => {
        if (value == 'raccolta'){
          this.menucolorf = '';
          this.menucolor = 'ar';
          this.router.navigate(['/realta-aumentata/raccolta']);
        }else{
          this.menucolorf = 'ar';
          this.menucolor = '';
          // this.router.navigate(['/scopri'], { replaceUrl: true });
        }
      }, 200)
    
    
  }
}
