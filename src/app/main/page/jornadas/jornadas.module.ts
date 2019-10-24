import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
    MatButtonModule,
    MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { jornadasComponent } from './jornadas.component';
import {AuthGuard} from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'jornadas',
        component: jornadasComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        jornadasComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    exports     : [
        jornadasComponent
    ]
})

export class jornadasModule
{
}
