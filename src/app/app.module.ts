import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { MatDatepickerModule } from '@angular/material';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

// SERVICES
import {environment} from 'environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ISFService} from 'app/services/isf.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {TokenInterceptor} from './interceptor/token.interceptor';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { UsersModule } from 'app/main/page/users/users.module';
import { EquiposModule } from 'app/main/page/equipos/equipos.module';
import { jornadasModule } from 'app/main/page/jornadas/jornadas.module';


import {  MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoginModule } from './main/page/login/login.module';
import { RegisterModule } from './main/page/register/register.module';
import {ForgotPasswordModule} from './main/page/forgot-password/forgot-password.module';
import {FormUsersModule} from './main/page/usersforms/formusers.module';
import {FormequiposModule} from './main/page/equiposforms/formequipos.module';
import {FormjornadasModule} from './main/page/jornadasforms/formjornadasmodule';


import {AccionConfirmarModule} from './main/modal/AccionConfirmar/accionconfirmar.module';
import {AddvoluntarioModule} from './main/modal/AddVoluntario/addvoluntario.module';
import {AddjornadaModule} from './main/modal/AddJornada/addjornada.module';
import {EmailModule} from './main/modal/Email/email.module';
import {EquiposJornadaModule} from './main/page/equiposjornada/equiposjornada.module';
import { PersonasModule } from './main/page/personas/personas.module';
import { PersonaModule } from './main/page/persona/persona.module';
import { AgmCoreModule } from '@agm/core';


const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'users'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDSYhDsbX7AnFGu4uiYb7vvP_W7am8qCLE',
            libraries: ["places"]
        }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        MatDatepickerModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // FireBase
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        

        // App modules
        LayoutModule,
        UsersModule,
        EquiposModule,
        PersonasModule,
        PersonaModule,
        jornadasModule,
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        FormUsersModule,
        FormequiposModule,
        FormjornadasModule,
        AccionConfirmarModule,
        AddvoluntarioModule,
        AddjornadaModule,
        EquiposJornadaModule,
        EmailModule
        

    ],
    providers: [ISFService, AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
