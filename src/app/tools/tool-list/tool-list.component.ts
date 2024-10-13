import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tool } from '../tool.model';
import { ToolService } from '../tools.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { DialogService } from '../dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';





@Component({
    selector: 'app-tool-list',
    templateUrl: './tool-list.component.html',
    styleUrls: ['./tool-list.component.css'],
    })

export class ToolListComponent implements OnInit { displayedColumns: string[] = ['position', 'name', 'partNumber', 'location', 'description', 'actions'];
@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort: MatSort | any;
 

private tools: Tool[] = [];

totalTools = 0;
toolsPerPage = 25;
pageSizeOptions = [5,10,25,100];
currentPage = 1;
dataSource: any;
isLoading= false;
  
public toolSub!: Subscription;

constructor(public toolsService: ToolService, public dialogService: DialogService) {}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


ngOnInit() {
 this.isLoading = true;
  this.toolsService.getTools(this.toolsPerPage, this.currentPage); 
  this.toolSub = this.toolsService.getToolUpdatedListener()
  .subscribe((toolData:{tools: Tool[], toolCount: number}) => {
    this.isLoading = false;
    this.totalTools = toolData.toolCount;
    this.tools = toolData.tools;
    this.dataSource = new MatTableDataSource<Tool>([...this.tools]);
   
    this.dataSource.sort = this.sort;
  });
  this.toolsService.getTools(this.toolsPerPage, this.currentPage); 
  this.toolSub = this.toolsService.getToolUpdatedListener()
  .subscribe((toolData: {tools: Tool[], toolCount: number}) => {
    this.totalTools = toolData.toolCount;
    this.tools = toolData.tools;
    this.dataSource = new MatTableDataSource<Tool>([...this.tools]);
    this.dataSource.sort = this.sort;
});
}

onChangedPage(pageData: PageEvent) {
  this.currentPage = pageData.pageIndex + 1;
  this.toolsPerPage = pageData.pageSize;
  this.toolsService.getTools(this.toolsPerPage, this.currentPage); 
}

onDelete(toolId: String) {
  this.dialogService.openConfirmDialog()
  .afterClosed().subscribe(res => {
    if(res){
      this.toolsService.deleteTool(toolId).subscribe(()=> {
          this.toolsService.getTools(this.toolsPerPage, this.currentPage);
        });
    }
  });
}

ngOnDestroy() {
  this.toolSub.unsubscribe();
}


}
