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
    selector: 'formactividad',
    templateUrl: './formactividades.component.html',
    styleUrls: ['./formactividades.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FormActividadesComponent implements OnInit, OnDestroy {
    pageType: string;
    actividadForm: FormGroup = null;
    perfiles: any;
    actividad: any;

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
        if (this._route.snapshot.paramMap.get('actividad') && this._route.snapshot.paramMap.get('actividad') !== 'new') {
            this.actividad = await this._isfService.getActividadByToken(this._route.snapshot.paramMap.get('actividad'));
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.actividad = {
                nombre: '',
                direccion: '',
                ciudad: ''
            };
        }

        this.actividadForm = this.createActividadForm();
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
    createActividadForm(): FormGroup {
        console.log(this.actividad.createdAt);
        return this._formBuilder.group({
            nombre: [this.actividad.nombre],
            direccion: [this.actividad.direccion],
            ciudad: [this.actividad.ciudad],
            token: [this.actividad.token]
        });
    }

    /**
     * Save actividad
     */
    async saveActividad(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = this.actividadForm.getRawValue();
        data.handle = FuseUtils.handleize(data.nombre);

        await this._isfService.saveActividad(data);

        this._matSnackBar.open('Actividad grabada', 'OK', {
            verticalPosition: 'top',
            duration: 2000
        });

        this._fuseProgressBarService.hide();
        this._router.navigate(['actividades']);
    }

    /**
     * Add Actividad
     */
    async addActividad(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.actividadForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);

            await this._isfService.addActividad(data);

            // Show the success message
            this._matSnackBar.open('Actividad grabada', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this._router.navigate(['actividades']);
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la actividad!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

}
