import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

//import { BaseComponent } from './base/base';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './message-box/message-box';
@NgModule({
	declarations: [//BaseComponent,
    CustomLoggedHeaderComponent,
    MessageBoxComponent],
	imports: [IonicModule],
	exports: [//BaseComponent,
	CustomLoggedHeaderComponent,
    MessageBoxComponent]	
})
export class ComponentsModule {}
