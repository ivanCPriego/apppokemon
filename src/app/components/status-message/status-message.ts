import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-message',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="status-message" [class]="type" *ngIf="message">
        <span class="message">{{ message }}</span>
      </div>
  `,
  styles: [`
    .status-message {
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      text-align: center;
    }

    .error {
      background-color: #ffebee;
      color: #c62828;
      border: 1px solid #ffcdd2;
    }

    .loading {
      background-color: #e3f2fd;
      color: #1565c0;
      border: 1px solid #bbdefb;
    }

    .success {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }
  `]
})
export class StatusMessageComponent {
  @Input() message: string = '';
  @Input() type: 'error' | 'loading' | 'success' = 'error';
} 