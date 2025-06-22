import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { AppconfigService } from './services/appconfig.service';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './componets/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,SharedMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aj_store_note';
  env!: string;
  apiUrl!: string;
  featureX!: boolean;
  featureY!: boolean;

  constructor(private configService: AppconfigService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.env = this.configService.getEnvironment();
    this.apiUrl = this.configService.getApiUrl();
    this.featureX = this.configService.isFeatureXEnabled();
    this.featureY = this.configService.isFeatureYEnabled();
    console.log('apiUrl', this.apiUrl);
    console.log('env', this.env);
    
  }

}
