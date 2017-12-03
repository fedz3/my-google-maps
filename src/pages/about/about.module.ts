import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    ComponentsModule,
    HttpClientModule
  ],
})
export class AboutPageModule {}
