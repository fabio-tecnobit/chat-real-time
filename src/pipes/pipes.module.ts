import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CapitalizePipe } from './../pipes/capitalize/capitalize';

@NgModule({
	declarations: [CapitalizePipe],
	imports: [IonicModule],
	exports: [CapitalizePipe]
})
export class PipesModule {}
