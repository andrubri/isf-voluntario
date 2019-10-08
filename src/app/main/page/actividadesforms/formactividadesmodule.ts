import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuard} from '../../../services/auth-guard.service';
import {FormActividadesComponent} from './formactividades.component';

const routes = [
    {
        path     : 'actividades/:actividad',
        component: FormActividadesComponent,
        canActivate: [AuthGuard]
    },
    {
        path     : 'actividades/new',
        component: FormActividadesComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FormActividadesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule,
        MatTableModule, MatTabsModule,

        FuseSharedModule
    ]
})
export class FormActividadesModule
{
}
