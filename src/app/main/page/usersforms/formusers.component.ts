import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import {ISFService} from '../../../services/isf.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'formusers',
    templateUrl: './formusers.component.html',
    styleUrls: ['./formusers.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FormUsersComponent implements OnInit, OnDestroy {
    pageType: string;
    userForm: FormGroup = null;
    perfiles: any;
    user: any;

    constructor(
        private _isfService: ISFService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService
    ) {
        this.perfiles = [];
        this._fuseProgressBarService.show();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        if (this._route.snapshot.paramMap.get('user') && this._route.snapshot.paramMap.get('user') !== 'new') {
            this.user = await this._isfService.getUserByToken(this._route.snapshot.paramMap.get('user'));
            this.user.clave = '*******';
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.user = {
                email: '',
                nombre: '',
                apellido: '',
                idPersona: null,
                idPerfil: 0,
                clave: '',
                token: ''
            };
        }

        this.perfiles = await this._isfService.getPerfiles();
        this.userForm = this.createUserForm();
        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createUserForm(): FormGroup {
        console.log(this.user);
        return this._formBuilder.group({
            email: [{value: this.user.email, disabled: (this.user.idPersona !== null)}],
            nombre: [{value: this.user.nombre, disabled: (this.user.idPersona !== null)}],
            apellido: [{value: this.user.apellido, disabled: (this.user.idPersona !== null)}],
            idPerfil: [this.user.idPerfil],
            clave: [this.user.clave],
            token: [this.user.token]
        });
    }

    /**
     * Save User
     */
    async saveUser(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = this.userForm.getRawValue();
        data.handle = FuseUtils.handleize(data.nombre);
        console.log(data);
        await this._isfService.saveUser(data);

        this._matSnackBar.open('Usuario grabado', 'OK', {
            verticalPosition: 'top',
            duration: 2000
        });

        this._fuseProgressBarService.hide();
        this._router.navigate(['users']);
    }

    /**
     * Add User
     */
    async addUser(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.userForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);

            await this._isfService.addUser(data);

            // Show the success message
            this._matSnackBar.open('Usuario grabado', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this._router.navigate(['users']);
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar el usuario!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

}
