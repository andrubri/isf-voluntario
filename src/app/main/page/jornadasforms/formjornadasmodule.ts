import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,MatDatepickerModule,
    MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuard} from '../../../services/auth-guard.service';
import {FormjornadasComponent} from './formjornadas.component';


const routes = [
    {
        path     : 'jornadas/:jornada',
        component: FormjornadasComponent,
        canActivate: [AuthGuard]
    },
    {
        path     : 'jornadas/new',
        component: FormjornadasComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FormjornadasComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule,        MatDatepickerModule,

        MatTableModule, MatTabsModule, MatTooltipModule,

        FuseSharedModule,
        
    ]
})
export class FormjornadasModule
{
}
