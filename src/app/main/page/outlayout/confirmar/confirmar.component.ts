import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../../../@fuse/services/config.service';
import {DOCUMENT} from '@angular/common';
import {ISFService} from '../../../../services/isf.service';

@Component({
    selector: 'voluntario',
    templateUrl: './confirmar.component.html',
    styleUrls: ['./confirmar.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ConfirmarComponent implements OnInit, OnDestroy {
    pageType: string;
    confirmacion: any;
    persona: any;
    jornada: any;
    // Horizontal Stepper
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog,
        private _isfService: ISFService,
        private _fuseConfigService: FuseConfigService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this._fuseProgressBarService.show();
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


        this.confirmacion = {
            direccion: '',
            idMedioTrasporte: '',
            espacioLibre: '',
            nombreEmergencia: '',
            apellidoEmergencia: '',
            telefonoEmergencia: '',
            relacionEmergencia: '',
        };
        this.createPersonaForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        const hash: any = this._route.snapshot.paramMap.get('hash');
        try {
            const info: any = await this._isfService.getConfirmacion(hash);
            this.jornada = info.jornada;
            this.persona = info.voluntario;
            console.log(this.persona);
        } catch (e) {
            console.log(e);
        }
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
    createPersonaForm(): void {
        this.horizontalStepperStep2 = this._formBuilder.group({
            direccion: [this.confirmacion.direccion],
            idMedioTrasporte: [this.confirmacion.idMedioTrasporte],
            espacioLibre: [this.confirmacion.espacioLibre],
        });
        this.horizontalStepperStep3 = this._formBuilder.group({
            nombreEmergencia: [this.confirmacion.nombreEmergencia],
            apellidoEmergencia: [this.confirmacion.apellidoEmergencia],
            telefonoEmergencia: [this.confirmacion.telefonoEmergencia],
            relacionEmergencia: [this.confirmacion.relacionEmergencia],
        });
    }

    async enviar(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = Object.assign(this.horizontalStepperStep2.getRawValue(), this.horizontalStepperStep3.getRawValue());
        data.handle = FuseUtils.handleize(data.nombre);

        await this._isfService.addPersonaExterno(data);
        this._fuseProgressBarService.hide();
    }

    finishHorizontalStepper(): void {
        this.document.location.href = 'https://isf-argentina.org/';
    }

}
