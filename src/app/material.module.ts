import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
   exports: [
    MatAutocompleteModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule
   ],
   providers: []
})
export class MaterialModule { }