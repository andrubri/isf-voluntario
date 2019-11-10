import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import {environment} from 'environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from '../../../services/auth-guard.service';
import { PersonaComponent } from './persona.component';


const routes = [
    {
        path: 'persona/:persona',
        component: PersonaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'persona/new',
        component: PersonaComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        PersonaComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDSYhDsbX7AnFGu4uiYb7vvP_W7am8qCLE',
            libraries: ["places"]
        }),
        MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
        MatSortModule, MatDatepickerModule,
        MatTableModule, MatTabsModule, MatTooltipModule,

        FuseSharedModule,

    ]
})
export class PersonaModule {
}
