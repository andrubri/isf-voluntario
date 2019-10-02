import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

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
import { SampleModule } from 'app/main/page/sample/sample.module';
import {  MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoginModule } from './main/page/login/login.module';
import { RegisterModule } from './main/page/register/register.module';



const appRoutes: Routes = [
    {
        path      : 'sample',
        redirectTo: 'sample'
    },
    {
        path      : 'login',
        redirectTo: 'page/login'    
    },
    {
        path      : 'register',
        redirectTo: 'page/register'
    },
    {
        path        : 'page',
        loadChildren: './main/page/pages.module#PagesModule'
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

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

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
        SampleModule,
        LoginModule,
        RegisterModule
    ],
    providers: [ISFService, AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
