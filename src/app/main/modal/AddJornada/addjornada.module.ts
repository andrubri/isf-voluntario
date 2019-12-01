import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import {
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatTableModule, MatDatepickerModule,
    MatButtonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule
} from '@angular/material';


import { AddjornadaComponent} from './addjornada.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';

const routes = [
    {
        path     : 'modal',
        component: AddjornadaComponent
    }
];

@NgModule({
    declarations: [
      AddjornadaComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
    exports     : [
      AddjornadaComponent
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    ]
})

export class AddjornadaModule
{
}
