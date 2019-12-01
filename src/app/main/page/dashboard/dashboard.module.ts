import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DashboardComponent } from 'app/main/page/dashboard/dashboard.component';
import { DashboardService } from 'app/main/page/dashboard/dashboard.service';
import {AgmCoreModule} from '@agm/core';
import {ChartsModule} from 'ng2-charts';
import {AuthGuard} from '../../../services/auth-guard.service';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        DashboardService
    ]
})
export class DashboardModule
{
}

