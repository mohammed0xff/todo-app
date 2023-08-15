import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ListsComponent } from './lists/lists.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
