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


import { ExportarComponent} from './exportar.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';

const routes = [
    {
        path     : 'modal',
        component: ExportarComponent
    }
];

@NgModule({
    declarations: [
      ExportarComponent
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
      ExportarComponent
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    ]
})

export class ExportarModule
{
}
