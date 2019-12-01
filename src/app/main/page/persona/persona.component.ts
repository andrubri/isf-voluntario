/// <reference types="@types/googlemaps" />
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input, NgZone, ElementRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {MapsAPILoader} from '@agm/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import {ISFService} from '../../../services/isf.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AccionConfirmarComponent} from '../../modal/AccionConfirmar/accionconfirmar.component';
import {AddvoluntarioComponent} from '../../modal/AddVoluntario/addvoluntario.component';
import {AddjornadaComponent} from '../../modal/AddJornada/addjornada.component';
import {EmailComponent} from '../../modal/Email/email.component';
import {AutocompleteService} from '../../../services/autocomplete-service';

@Component({
    selector: 'persona',
    templateUrl: './persona.component.html',
    styleUrls: ['./persona.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PersonaComponent implements OnInit, OnDestroy, AfterViewInit {

    pageType: string;
    personaForm: FormGroup = null;
    perfiles: any;
    persona: any;
    personaLocation: any = {};
    origenContacto: any[] = [];
    obrasSociales: any[] = [];
    estados: string[] = ['Activo', 'Inactivo', 'Pendiente'];
    tiposDoc: string[] = ['DNI', 'Pasaporte'];
    @ViewChildren('search') public searchElement: QueryList<ElementRef>;


    constructor(
        private _isfService: ISFService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog,
        private _autocompleteService: AutocompleteService
    ) {
        this.perfiles = [];
        this._fuseProgressBarService.show();
        this._isfService.getOrigenContacto().then(items => {
            this.origenContacto = items;
        });
        this._isfService.getObrasSociales().then(items => {
            this.obrasSociales = items;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        if (this._route.snapshot.paramMap.get('persona') && this._route.snapshot.paramMap.get('persona') !== 'new') {
            const idAct = Number(this._route.snapshot.paramMap.get('persona'));
            this.persona = await this._isfService.getPersonaById(idAct);
            console.log(this.persona);
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.persona = {
                nombre: '',
                apellido: '',
                tipoDocumento: '',
                idDocumento: '',
                estado: '',
                direccionResidencia: '',
                ciudadResidencia: '',
                provinciaResidencia: '',
                paisOrigen: '',
                telefono: '',
                email: '',
                nivelEstudios: '',
                carrera: '',
                universidad: '',
                ocupacion: '',
                comentarios: '',
                dieta: '',
                fechaNacimiento: '',
                idOrigenContacto: '',
                DatosSeguro: {
                    idObraSocial: '',
                    grupoSanguineo: '',
                    emfermedades: '',
                    medicaciones: ''
                },
                ContactoEmergencium: {
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    relacion: ''
                }
            };

        }

        this.personaForm = this.createPersonaForm();
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
    createPersonaForm(): FormGroup {
        return this._formBuilder.group({
            nombre: [this.persona.nombre],
            apellido: [this.persona.apellido],
            tipoDocumento: [this.persona.tipoDocumento],
            idDocumento: [this.persona.idDocumento],
            estado: [this.persona.estado],
            direccionResidencia: [this.persona.direccionResidencia],
            ciudadResidencia: [this.persona.ciudadResidencia],
            provinciaResidencia: [this.persona.provinciaResidencia],
            paisOrigen: [this.persona.paisOrigen],
            telefono: [this.persona.telefono],
            email: [this.persona.email],
            nivelEstudios: [this.persona.nivelEstudios],
            carrera: [this.persona.carrera],
            universidad: [this.persona.universidad],
            ocupacion: [this.persona.ocupacion],
            comentarios: [this.persona.comentarios],
            dieta: [this.persona.dieta],
            idPersona: [this.persona.idPersona],
            fechaNacimiento: [this.persona.fechaNacimiento],
            idOrigenContacto: [this.persona.idOrigenContacto],
            idObraSocial: [this.persona.DatosSeguro.idObraSocial],
            grupoSanguineo: [this.persona.DatosSeguro.grupoSanguineo],
            emfermedades: [this.persona.DatosSeguro.emfermedades],
            medicaciones: [this.persona.DatosSeguro.medicaciones],
            nombreContacto: [this.persona.ContactoEmergencium.nombre],
            apellidoContacto: [this.persona.ContactoEmergencium.apellido],
            telefonoContacto: [this.persona.ContactoEmergencium.telefono],
            relacion: [this.persona.ContactoEmergencium.relacion]


        });
    }

    /**
     * Save persona
     */
    async savePersona(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.personaForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);
            const infoDir = this.searchElement.first.nativeElement.value.split(',');
            if (infoDir.length > 1 && this.personaLocation.lat) {
                data.coordenadasResidencia = this.personaLocation.lat + '&' + this.personaLocation.lng;
                data.direccionResidencia = this.searchElement.first.nativeElement.value;
                data.provinciaResidencia = (infoDir.length >= 4) ? infoDir[2].trim() : infoDir[1].trim();
                data.ciudadResidencia = (infoDir.length >= 4) ? infoDir[1].trim() : infoDir[1].trim();
                data.paisResidencia = (infoDir.length >= 4) ? infoDir[3].trim() : infoDir[2].trim();

                await this._isfService.savePersona(data);

                this._matSnackBar.open('Persona grabada', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                this._router.navigate(['personas']);
            } else {
                this._matSnackBar.open('Debe ingresar una dirección valida', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la persona!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

    /**
     * Add Persona
     */
    async addPersona(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.personaForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);
            const infoDir = this.searchElement.first.nativeElement.value.split(',');
            if (infoDir.length > 1 && this.personaLocation.lat) {
                data.coordenadasResidencia = this.personaLocation.lat + '&' + this.personaLocation.lng;
                data.direccionResidencia = this.searchElement.first.nativeElement.value;
                data.provinciaResidencia = (infoDir.length >= 4) ? infoDir[2].trim() : infoDir[1].trim();
                data.ciudadResidencia = (infoDir.length >= 4) ? infoDir[1].trim() : infoDir[1].trim();
                data.paisResidencia = (infoDir.length >= 4) ? infoDir[3].trim() : infoDir[2].trim();

                await this._isfService.addPersona(data);

                // Show the success message
                this._matSnackBar.open('Persona grabada', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this._router.navigate(['personas']);
            } else {
                this._matSnackBar.open('Debe ingresar una dirección valida', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la persona!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

    /* autocompleteAdress(element,location) {
        this.mapsAPILoader.load().then(
            () => {
                let autocomplete = new google.maps.places.Autocomplete(element, { types: ["address"] });

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place : google.maps.places.PlaceResult = autocomplete.getPlace();
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }

                        location.lat = place.geometry.location.lat();
                        location.lng = place.geometry.location.lng();
                        
                    });
                });
            }
        );
    } */


}
