import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material.module";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        ToolbarComponent,
        MaterialModule
    ],
    providers: []
})

export class SharedModule { }