import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmptyPipe } from './empty.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, EmptyPipe],
  bootstrap: [AppComponent]
})

export class AppModule {}
