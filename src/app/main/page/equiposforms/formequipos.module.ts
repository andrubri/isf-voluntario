import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FuseSharedModule} from '@fuse/shared.module';
import {AuthGuard} from '../../../services/auth-guard.service';
import {FormequiposComponent} from './formequipos.component';


const routes = [
    {
        path: 'equipos/:equipo',
        component: FormequiposComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'equipos/new',
        component: FormequiposComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        FormequiposComponent

    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule, MatDatepickerModule,
        MatTableModule, MatTabsModule, MatTooltipModule,

        FuseSharedModule,

    ]
})
export class FormequiposModule {
}
