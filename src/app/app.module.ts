import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { TablistComponent } from './tablist/tablist.component';
import { ActiveTabComponent } from './active-tab/active-tab.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCatalogComponent } from './item-catalog/item-catalog.component';

@NgModule({
	declarations: [ AppComponent, TablistComponent, ActiveTabComponent, ItemListComponent, ItemCatalogComponent ],
	imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
	providers: [ Subject ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
