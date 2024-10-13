import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Tool } from './tool.model';

const BACKEND_URL = environment.apiURL + "/tools/";


@Injectable({ providedIn: "root"})
export class ToolService {
    private tools : Tool[] = [];
    private postUpdated = new Subject<{tools: Tool[], toolCount: number}>();

    constructor(private http: HttpClient, private router: Router) {}
    getTools(toolPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${toolPerPage}&page=${currentPage}`;
        this.http
        .get<{message: string; tools: any; maxTools: number}>(
            BACKEND_URL + queryParams
            )
        .pipe(map((toolData) => {
            return { tools: toolData.tools.map((tool: { position: any; name: any; partNumber: any; location: any; description: any; _id: any; }) => {
                return {
                    position: tool.position,
                    name: tool.name,
                    partNumber: tool.partNumber,
                    location: tool.location,
                    description: tool.description,
                    id: tool._id
                };
            }), maxTools: toolData.maxTools
        };
        }))
        .subscribe((transformedToolData) => {
            this.tools = transformedToolData.tools;
            this.postUpdated.next({ 
                tools: [...this.tools], 
                toolCount: transformedToolData.maxTools});
        });
    }

    updateTool(id: string, position: string, name: string, partNumber: string, location: string, description: string) {
        const tool: Tool = {id: id, position: position, name: name,  partNumber: partNumber, location: location, description: description};
        this.http.put(BACKEND_URL + id, tool)
        .subscribe(response => {
            this.router.navigate(["/"]);
        });
    }

    getToolUpdatedListener() {
        return this.postUpdated.asObservable();
    }

    getTool(id: string) {
        return this.http.get<{_id: string; position: string; name: string; partNumber: string; location: string; description: string }>("http://localhost:3000/api/tools/" + id);
    }

    addTool(
        position: string,
        name: string,
        partNumber: string,
        location: string,
        description: string) {
            const tool: Tool = {
                id: '',
                position: position,
                name: name,
                partNumber: partNumber,
                location: location,
                description: description,
            };
                this.http.post<{message: string, toolId: string}>(BACKEND_URL, tool)
                .subscribe(responseData => {
                    this.router.navigate(["/"]);
                });
               
            }

    deleteTool(toolId: String) {
       return this.http.delete(BACKEND_URL + toolId);
    }
      
}