import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { UsersComponent } from './users.component';
import {AuthGuard} from '../../../services/auth-guard.service';

const routes = [
    {
        path     : 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        UsersComponent
    ]
})

export class UsersModule
{
}
