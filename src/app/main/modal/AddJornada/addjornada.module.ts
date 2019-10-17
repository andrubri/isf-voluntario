import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import {
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule
} from '@angular/material';


import { AddjornadaComponent} from './addjornada.component';

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
        MatInputModule
    ],
    exports     : [
      AddjornadaComponent
    ]
})

export class AddjornadaModule
{
}
