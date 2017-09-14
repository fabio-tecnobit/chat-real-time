import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

//import { BaseComponent } from './base/base';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
@NgModule({
	declarations: [//BaseComponent,
    CustomLoggedHeaderComponent],
	imports: [IonicModule,PipesModule],
	exports: [//BaseComponent,
	CustomLoggedHeaderComponent]	
})
export class ComponentsModule {}
