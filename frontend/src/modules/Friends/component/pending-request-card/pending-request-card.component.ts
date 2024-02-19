import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pending-request-card',
  templateUrl: './pending-request-card.component.html',
  styleUrl: './pending-request-card.component.css'
})
export class PendingRequestCardComponent {
  @Input() userName: string = '';
  @Input() profilePicUrl: string | null = null;
  @Output() confirmRequestClicked = new EventEmitter<void>();
  @Output() deleteRequestClicked = new EventEmitter<void>();
}
