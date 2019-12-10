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
import {MatStepper} from '@angular/material/stepper';
import {isObject} from "util";

@Component({
    selector: 'voluntario',
    templateUrl: './confirmar.component.html',
    styleUrls: ['./confirmar.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ConfirmarComponent implements OnInit, OnDestroy, AfterViewInit {
    pageType: string;
    confirmacion: any;
    persona: any;
    jornada: any;
    medioTransporte: any;
    personaLocation: any = {};
    mensajeError: string = '';
    novalido: boolean = false;
    // Horizontal Stepper
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    @ViewChildren('search') public searchElement: QueryList<ElementRef>;

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
            idMedioTransporte: '',
            espacioLibre: '',
            idContactoEmergencia: null,
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
            this.medioTransporte = info.medioTransporte;

            //
            if (this.persona.ContactoEmergencium) {
                this.confirmacion.idContactoEmergencia = this.persona.ContactoEmergencium.idContactoEmergencia;
                this.confirmacion.apellidoEmergencia = this.persona.ContactoEmergencium.apellido;
                this.confirmacion.nombreEmergencia = this.persona.ContactoEmergencium.nombre;
                this.confirmacion.relacionEmergencia = this.persona.ContactoEmergencium.relacion;
                this.confirmacion.telefonoEmergencia = this.persona.ContactoEmergencium.telefono;
            }

        } catch (e) {
            if (e.error && !isObject(e.error)) {
                this.mensajeError = e.error;
            } else {
                this.mensajeError = 'Hubo un error al intentar recuperar la confirmación.  Por favor vuelva a intentar más tarde!'
            }

            this.novalido = true;
        }
        this.createPersonaForm();
        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.searchElement.changes.subscribe(val => {
            this._autocompleteService.autocompleteAdress(val.first.nativeElement, this.personaLocation);
        });
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
            idMedioTransporte: [this.confirmacion.idMedioTransporte],
            espacioLibre: [this.confirmacion.espacioLibre],
        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            nombreEmergencia: [this.confirmacion.nombreEmergencia],
            apellidoEmergencia: [this.confirmacion.apellidoEmergencia],
            telefonoEmergencia: [this.confirmacion.telefonoEmergencia],
            relacionEmergencia: [this.confirmacion.relacionEmergencia],
        });
    }

    async enviar(stepper: MatStepper): Promise<void> {
        this._fuseProgressBarService.show();
        const data = Object.assign(this.horizontalStepperStep2.getRawValue(), this.horizontalStepperStep3.getRawValue());

        const infoDir = this.searchElement.first.nativeElement.value.split(',');
        if (infoDir.length > 1 && this.personaLocation.lat) {
            data.coordenadas = this.personaLocation.lat + '&' + this.personaLocation.lng;
            data.direccion = this.searchElement.first.nativeElement.value;

            const hash: any = this._route.snapshot.paramMap.get('hash');
            await this._isfService.setConfirmacion(hash, data);
            stepper.next();
        }
        this._fuseProgressBarService.hide();
    }

    validarStep2(stepper: MatStepper): void{
        const infoDir = this.searchElement.first.nativeElement.value.split(',');
        if (!(infoDir.length > 1 && this.personaLocation.lat)) {
            this.horizontalStepperStep2.get('direccion').setErrors({"noValid": true});
            event.stopImmediatePropagation();
            return;
        }else{
            stepper.next();
        }
    }

    finishHorizontalStepper(): void {
        this.document.location.href = 'https://isf-argentina.org/';
    }

}
