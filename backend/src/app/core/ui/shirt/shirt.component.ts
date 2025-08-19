import { Component, input } from '@angular/core';

@Component({
  selector: 'shirt',
  standalone: true,
  imports: [],
  templateUrl: './shirt.component.html',
  styleUrl: './shirt.component.scss'
})
export class ShirtComponent {
  size = input()

  color = input({
    hands: '#000',
    shirt: '#fff'
  })
}
