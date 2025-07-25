import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ExpensesModule } from './features/expenses/expenses.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExpensesModule,
    FormsModule,
    NgChartsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
