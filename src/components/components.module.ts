import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

//import { BaseComponent } from './base/base';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
@NgModule({
	declarations: [//BaseComponent,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent],
	imports: [IonicModule],
	exports: [//BaseComponent,
	CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent]	
})
export class ComponentsModule {}
