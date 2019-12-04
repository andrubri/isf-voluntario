import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatTooltipModule, MatStepperModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FuseSharedModule} from '@fuse/shared.module';
import {ConfirmarComponent} from './confirmar.component';


const routes = [
    {
        path: 'confirmar/:hash',
        component: ConfirmarComponent
    }
];

@NgModule({
    declarations: [
        ConfirmarComponent

    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule, MatDatepickerModule, MatStepperModule,
        MatTableModule, MatTabsModule, MatTooltipModule,

        FuseSharedModule,

    ]
})
export class ConfirmarModule {
}
