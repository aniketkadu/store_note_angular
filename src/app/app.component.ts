import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { HeaderComponent } from './componets/header/header.component';
import { AppconfigService } from './services/appconfig.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,SharedMaterialModule,HeaderComponent],
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
    this.getCusom();
    
  }

  getCusom() {
this.http.get(`${this.apiUrl}customers`).subscribe(res => {
  console.log('test',res);
  
})
  }
}
