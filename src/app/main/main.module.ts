import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { MainRoutes } from "./main.routes";
import { WeatherComponent } from "./weather/weather.component";

@NgModule({
    declarations: [
        WeatherComponent
    ],
    imports: [
        RouterModule.forChild(MainRoutes),
        SharedModule,
    ],
    providers: []
})

export class MainModule { }