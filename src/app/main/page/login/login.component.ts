import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _snackBar: MatSnackBar,
        private _router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    async onSubmit(): Promise<void> {
        try {
            const user: any = await this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
            if (user) {
                this._router.navigate(['sample']);
            } else {
                this.loginForm.value.email = '';
                this.loginForm.value.password = '';
                this._snackBar.open('EL USUARIO Y CLAVE SON INVALIDOS', 'Cerrar', {duration: 4000, verticalPosition: 'top'});
            }
        } catch (e) {
            this.loginForm.value.email = '';
            this.loginForm.value.password = '';
            this._snackBar.open('EL USUARIO Y CLAVE SON INVALIDOS', 'Cerrar', {duration: 4000, verticalPosition: 'top'});
        }
    }
}
