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
  MatButtonModule
} from '@angular/material';


import { AccionConfirmarComponent} from './accionconfirmar.component';

const routes = [
    {
        path     : 'modal',
        component: AccionConfirmarComponent
    }
];

@NgModule({
    declarations: [
      AccionConfirmarComponent
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
        MatCardModule
    ],
    exports     : [
      AccionConfirmarComponent
    ]
})

export class AccionConfirmarModule
{
}
