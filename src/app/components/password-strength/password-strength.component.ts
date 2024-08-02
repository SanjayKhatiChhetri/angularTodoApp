// src/app/components/password-strength/password-strength.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="password-strength">
      <div class="strength-meter">
        <div
          class="strength-meter-fill"
          [style.width.%]="strength"
          [style.background-color]="color"
        ></div>
      </div>
      <div class="strength-text" [style.color]="color">{{ text }}</div>
    </div>
  `,
  styles: [
    `
      .password-strength {
        margin-top: 5px;
      }
      .strength-meter {
        height: 4px;
        background-color: #ddd;
        margin-bottom: 5px;
      }
      .strength-meter-fill {
        height: 100%;
        transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
      }
      .strength-text {
        font-size: 12px;
      }
    `,
  ],
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password: string = '';

  strength: number = 0;
  color: string = '';
  text: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.calculateStrength(this.password);
    }
  }

  private calculateStrength(password: string) {
    const length = password.length;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (length > 7) strength += 20;
    if (hasLowerCase) strength += 20;
    if (hasUpperCase) strength += 20;
    if (hasNumbers) strength += 20;
    if (hasSpecialChars) strength += 20;

    this.strength = strength;

    if (strength < 40) {
      this.color = '#ff4d4d';
      this.text = 'Weak';
    } else if (strength < 70) {
      this.color = '#ffa64d';
      this.text = 'Medium';
    } else {
      this.color = '#4dff4d';
      this.text = 'Strong';
    }
  }
}
