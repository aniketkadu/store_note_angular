import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  private env = (window as any)['APP_ENV_DATA'] || {};
  private config = (window as any)['APP_CONFIG'] || {};

  getEnvironment(): string {
    return this.env.envName;
  }

  getApiUrl(): string {
    return this.config.apiUrl;
  }

  isFeatureXEnabled(): boolean {
    return this.config.featureXEnabled;
  }

  isFeatureYEnabled(): boolean {
    return this.config.featureYEnabled;
  }
}
