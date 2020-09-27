import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { TablistComponent } from './tablist/tablist.component';

@NgModule({
	declarations: [ AppComponent, TablistComponent ],
	imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
	providers: [ Subject ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
