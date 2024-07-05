// app.module.ts (ou login.module.ts si vous utilisez un module spécifique pour login)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes'; // Importez vos routes ici

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule, // Ajoutez FormsModule ici
    RouterModule.forRoot(routes), // Configurez les routes ici
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
