import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

async function loadEnvironmentAndConfig() {
  const env = (window as any)['APP_ENV'] || 'local';

  // Load environment details
  const envRes = await fetch(`/assets/config/env.${env}.json`);
  const envData = await envRes.json();
  (window as any)['APP_ENV_DATA'] = envData;

  // Load app config based on environment
  const configRes = await fetch(`/assets/config/config.${env}.json`);
  const configData = await configRes.json();
  (window as any)['APP_CONFIG'] = configData;
}
loadEnvironmentAndConfig().then(() => {
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
});

