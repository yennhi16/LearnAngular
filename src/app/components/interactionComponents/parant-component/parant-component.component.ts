import { Component } from '@angular/core';

@Component({
  selector: 'app-parant-component',
  templateUrl: './parant-component.component.html',
  styleUrls: ['./parant-component.component.scss'],
})
export class ParantComponentComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Dr. IQ', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean) {
    if (agreed) {
      this.agreed++;
    } else {
      this.disagreed++;
    }
  }
}
