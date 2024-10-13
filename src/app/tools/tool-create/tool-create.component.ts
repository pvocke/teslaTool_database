import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tools.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tool } from '../tool.model';
@Component({
    selector: 'app-tool-create',
    templateUrl: './tool-create.component.html',
    styleUrls: ['./tool-create.component.css'],
})
export class ToolCreateComponent implements OnInit {
    
    
    private mode = 'create';
    private toolId: any;  
    tool?: Tool;
    form!: FormGroup;
    totalTools = 10
    isLoading = false;
    
    constructor(public toolService: ToolService, public route: ActivatedRoute) {
    
    }

    ngOnInit() {
        this. form = new FormGroup({
            'position': new FormControl('In Location',
             {validators: [Validators.required, Validators.minLength(3)]
            }),
            'name': new FormControl(null, 
            {validators: [Validators.required]
            }),
            'partNumber': new FormControl(null, {validators: [Validators.required]
            }),
            'location': new FormControl(null, {validators: [Validators.required]
            }),
            'description': new FormControl(null, {validators: [Validators.required]
            })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('toolId')) {
                this.mode = 'edit';
                this.toolId = paramMap.get('toolId');
                console.log(this.toolId);
                this.isLoading = true;
                 this.toolService.getTool(this.toolId).subscribe(toolData => {
                    this.isLoading = false;
                    this.tool = {id: toolData._id, position: toolData.position, name: toolData.name, partNumber: toolData.partNumber, location: toolData.location, description: toolData.description};
                    this.form.setValue({'position': this.tool.position, 'name': this.tool.name, 'partNumber': this.tool.partNumber, 'location': this.tool.location, 'description': this.tool.description});
                 });
                
            } else {
                this.mode = 'create';
                this.toolId = null;
            }
        }
        );
    }
    

    onSaveTool() {
      if (this.form.invalid) {
        return;
      }
      this.isLoading = true;
        if (this.mode === 'create') {
            this.toolService.addTool(this.form.value.position, this.form.value.name, this.form.value.partNumber, this.form.value.location, this.form.value.description);

        } else {
            this.toolService.updateTool(this.toolId, 
                this.form.value.position, 
                this.form.value.name, 
                this.form.value.partNumber, 
                this.form.value.location, 
                this.form.value.description,
                );
        }
        this.form.reset();
    }
    
    
}
