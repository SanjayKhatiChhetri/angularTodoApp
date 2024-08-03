import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-offline-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="offline" class="offline-indicator">
      You are offline. Some features may be unavailable.
    </div>
  `,
  styles: [
    `
      .offline-indicator {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f44336;
        color: white;
        text-align: center;
        padding: 1rem;
      }
    `,
  ],
})
export class OfflineIndicatorComponent implements OnInit {
  offline = false;
  private isBrowser: boolean;

  constructor(
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkNetworkStatus();
      window.addEventListener('online', this.checkNetworkStatus.bind(this));
      window.addEventListener('offline', this.checkNetworkStatus.bind(this));

      if (this.swUpdate.isEnabled) {
        this.swUpdate.versionUpdates.subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
            window.location.reload();
          }
        });
      }
    }
  }

  private checkNetworkStatus() {
    if (this.isBrowser) {
      this.offline = !navigator.onLine;
    }
  }
}
