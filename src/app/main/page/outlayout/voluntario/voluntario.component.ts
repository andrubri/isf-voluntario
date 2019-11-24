import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../../../@fuse/services/config.service';

@Component({
    selector: 'voluntario',
    templateUrl: './voluntario.component.html',
    styleUrls: ['./voluntario.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class VoluntarioComponent implements OnInit, OnDestroy {
    pageType: string;
    personaForm: FormGroup = null;
    perfiles: any;
    persona: any;

    // Horizontal Stepper
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    horizontalStepperStep4: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog,
        private _fuseConfigService: FuseConfigService
    ) {
        this.perfiles = [];
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


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {

        this.pageType = 'new';
        this.persona = {
            nombre: '',
            apellido: '',
            tipoDocumento: ' ',
            idDocumento: ' ',
            ciudadResidencia: '',
            provinciaResidencia: '',
            paisOrigen: '',
            telefono: '',
            email: ' ',
            nivelEstudios: ' ',
            carrera: ' ',
            universidad: ' ',
            ocupacion: ' '
        };

        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        this.createPersonaForm();
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
            nombre: [this.persona.nombre],
            apellido: [this.persona.apellido],
            tipoDocumento: [this.persona.tipoDocumento],
            idDocumento: [this.persona.idDocumento],
            telefono: [this.persona.telefono],
            email: [this.persona.email]
        });
        this.horizontalStepperStep3 = this._formBuilder.group({
            ciudadResidencia: [this.persona.ciudadResidencia],
            provinciaResidencia: [this.persona.provinciaResidencia],
            paisOrigen: [this.persona.paisOrigen]
        });
        this.horizontalStepperStep4 = this._formBuilder.group({
            nivelEstudios: [this.persona.nivelEstudios],
            carrera: [this.persona.carrera],
            universidad: [this.persona.universidad],
            ocupacion: [this.persona.ocupacion]
        });

    }


}
