import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { ToolCreateComponent } from './tools/tool-create/tool-create.component';
import { AppComponent } from './app.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ToolListComponent } from './tools/tool-list/tool-list.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { ToolFooterComponent } from './tools/tool-footer/tool-footer.component';







@NgModule({
  declarations: [
    AppComponent,
    ToolCreateComponent,
    HeaderComponent,
    ToolListComponent,
    MatDialogComponent,
    ToolFooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatPaginator,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
