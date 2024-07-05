// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed for other forms
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Import your routes here

@NgModule({
  declarations: [
    // Remove AppComponent from declarations
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here if it's required for other parts of your application
    RouterModule.forRoot(routes) // Configure your routes here
  ],
  providers: [],
  bootstrap: [] // Bootstrap AppComponent here
})
export class AppModule {}
