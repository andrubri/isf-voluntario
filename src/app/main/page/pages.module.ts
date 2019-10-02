import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/page/login/login.module';
import { ForgotPasswordModule } from 'app/main/page/forgot-password/forgot-password.module';
import { Error404Module } from 'app/main/page/errors/404/error-404.module';
import { Error500Module } from 'app/main/page/errors/500/error-500.module';
import { RegisterModule } from './register/register.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        RegisterModule,
       
        // Errors
        Error404Module,
        Error500Module
]
})
export class PagesModule
{

}
