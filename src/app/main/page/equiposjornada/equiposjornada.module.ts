import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FuseSharedModule} from '@fuse/shared.module';
import {AuthGuard} from '../../../services/auth-guard.service';
import {EquiposJornadaComponent} from './equiposjornada.component';


const routes = [
    {
        path: 'equipos/jornada/:jornada',
        component: EquiposJornadaComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        EquiposJornadaComponent

    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule, MatDatepickerModule, MatSlideToggleModule,
        MatTableModule, MatTabsModule, MatTooltipModule,

        FuseSharedModule,

    ]
})
export class EquiposJornadaModule {
}
