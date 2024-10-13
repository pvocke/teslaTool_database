import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolListComponent } from './tools/tool-list/tool-list.component';
import { ToolCreateComponent } from './tools/tool-create/tool-create.component';

const routes: Routes = [
  { path: '', component: ToolListComponent },
  { path: 'create', component: ToolCreateComponent },
  { path: 'edit/:toolId', component: ToolCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
