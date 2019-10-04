import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuard} from '../../../services/auth-guard.service';
import {FormUsersComponent} from './formusers.component';

const routes = [
    {
        path     : 'users/:user',
        component: FormUsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path     : 'users/new',
        component: FormUsersComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FormUsersComponent
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
export class FormUsersModule
{
}
