import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  isComplete = input<boolean>(false);
  isCompleteChange = output<boolean>();

  toggleIsComplete() {
    this.isCompleteChange.emit(!this.isComplete());
  }
}
