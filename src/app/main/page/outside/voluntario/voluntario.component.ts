import {Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation, AfterViewInit} from '@angular/core';
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
import {AutocompleteService} from '../../../../services/autocomplete-service';

@Component({
    selector: 'voluntario',
    templateUrl: './voluntario.component.html',
    styleUrls: ['./voluntario.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class VoluntarioComponent implements OnInit, OnDestroy, AfterViewInit {
    pageType: string;
    perfiles: any;
    tiposDoc: string[] = ['DNI', 'Pasaporte'];
    persona: any;
    personaLocation: any = {};
    origenContacto: any[] = [];
    @ViewChildren('search') public searchElement: QueryList<ElementRef>;
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
        private _isfService: ISFService,
        private _fuseConfigService: FuseConfigService,
        private _autocompleteService: AutocompleteService,
        @Inject(DOCUMENT) private document: Document
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

        this._isfService.getOrigenContacto().then(items => {
            this.origenContacto = items;
        });
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
            tipoDocumento: '',
            idDocumento: '',
            ciudadResidencia: '',
            provinciaResidencia: '',
            paisOrigen: '',
            telefono: '',
            email: '',
            nivelEstudios: '',
            carrera: '',
            universidad: '',
            ocupacion: ''
        };

        this.createPersonaForm();
        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.searchElement.changes.subscribe(val => this._autocompleteService.autocompleteAdress(val.first.nativeElement, this.personaLocation)
        );
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
            paisOrigen: [this.persona.paisOrigen],
            fechaNacimiento: [this.persona.fechaNacimiento],
            idOrigenContacto: [this.persona.idOrigenContacto]
        });
        this.horizontalStepperStep3 = this._formBuilder.group({
            direccionResidencia: [this.persona.direccionResidencia],
            telefono: [this.persona.telefono],
            email: [this.persona.email]
        });
        this.horizontalStepperStep4 = this._formBuilder.group({
            nivelEstudios: [this.persona.nivelEstudios],
            carrera: [this.persona.carrera],
            universidad: [this.persona.universidad],
            ocupacion: [this.persona.ocupacion]
        });

    }

    async enviar(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = Object.assign(this.horizontalStepperStep2.getRawValue(), this.horizontalStepperStep3.getRawValue(), this.horizontalStepperStep4.getRawValue());
        data.handle = FuseUtils.handleize(data.nombre);

        const infoDir = this.searchElement.first.nativeElement.value.split(',');
        if (infoDir.length > 1 && this.personaLocation.lat) {
            data.coordenadasResidencia = this.personaLocation.lat + '&' + this.personaLocation.lng;
            data.direccionResidencia = this.searchElement.first.nativeElement.value;
            data.provinciaResidencia = (infoDir.length >= 4) ? infoDir[2].trim() : infoDir[1].trim();
            data.ciudadResidencia = (infoDir.length >= 4) ? infoDir[1].trim() : infoDir[1].trim();
            data.paisResidencia = (infoDir.length >= 4) ? infoDir[3].trim() : infoDir[2].trim();

            await this._isfService.addPersonaExterno(data);
        } else {
            this._matSnackBar.open('Debe ingresar una dirección valida', 'Aceptar', {
                verticalPosition: 'top',
                duration: 2000
            });
        }

        this._fuseProgressBarService.hide();
    }

    finishHorizontalStepper(): void {
        this.document.location.href = 'https://isf-argentina.org/';
    }

}
