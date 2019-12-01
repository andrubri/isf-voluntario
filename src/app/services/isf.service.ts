import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
//
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';
import Socket = NodeJS.Socket;
import {MatSnackBar} from '@angular/material';
import {__await} from 'tslib';


@Injectable({
    providedIn: 'root',
})

export class ISFService {
    private _urlBE: string;
    private _me: any;
    public nombreLogin: string;
    public apellidoLogin: string;

    private _httpOptions: any = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private _http: HttpClient,
                private _fuseNavigationService: FuseNavigationService) {

        this._urlBE = environment.config.urlBE;
    }

    public async getMeUser(): Promise<any> {
        this._me = await this.getUserByToken('me');
        this.nombreLogin = this._me.nombre;
        this.apellidoLogin = this._me.apellido;
        return this._me;
    }

    public async getPerfiles(): Promise<any> {
        const url = `${this._urlBE}/user/perfiles`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getUserByToken(token: string): Promise<any> {
        const url = `${this._urlBE}/user/${token}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getAllUsers(): Promise<any> {
        const url = `${this._urlBE}/user`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async saveUser(user: any): Promise<any> {
        const url = `${this._urlBE}/user/${user.token}`;
        return await this._http.put(url, user, this._httpOptions).toPromise();
    }

    public async addUser(user: any): Promise<any> {
        const url = `${this._urlBE}/user`;
        return await this._http.post(url, user, this._httpOptions).toPromise();
    }

    public async removeUser(token: string): Promise<any> {
        const url = `${this._urlBE}/user/${token}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }

    public async getAllEquipos(): Promise<any> {
        const url = `${this._urlBE}/equipo`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async removeEquipo(idEquipo: number): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }
    public async getAllPersonas(): Promise<any> {
        const url = `${this._urlBE}/persona`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }
    public async getPersonaById(idPersona: number): Promise<any> {
        const url = `${this._urlBE}/persona/${idPersona}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async addPersona(persona: any): Promise<any> {
        const url = `${this._urlBE}/persona`;
        let req = {persona: persona};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async addPersonaExterno(persona: any): Promise<any> {
        const url = `${this._urlBE}/persona/externo`;
        let req = {persona: persona};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async savePersona(persona: any): Promise<any> {
        const url = `${this._urlBE}/persona/${persona.idPersona}`;
        let req = {persona: persona};
        return await this._http.put(url, req, this._httpOptions).toPromise();
    }

    public async removePersona(idPersona: number): Promise<any> {
        const url = `${this._urlBE}/persona/${idPersona}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }

    public async addEquipo(equipo: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/equipo`;
        let req = {equipo: equipo, coordinadores: coordinadores};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async saveEquipo(equipo: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/equipo/${equipo.idEquipo}`;
        let req = {equipo: equipo, coordinadores: coordinadores};
        return await this._http.put(url, req, this._httpOptions).toPromise();
    }

    public async sendEmailToEquipo(equipo: any, mensaje: any): Promise<any> {
        const url = `${this._urlBE}/email/${equipo.idEquipo}`;
        let req = {mensaje: mensaje};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async addEquipoCoordinador(idEquipo: number, idPersona: number): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}/coordinador`;
        const req = {idPersona: idPersona};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async addEquipoVoluntario(idEquipo: number, idPersona: number): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}/voluntario`;
        const req = {idPersona: idPersona};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async addEquipoJornada(idEquipo: number, data: any): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}/jornada`;
        return await this._http.post(url, data, this._httpOptions).toPromise();
    }

    public async getEquipoById(idEquipo: number): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getCoordinadores(): Promise<any> {
        const url = `${this._urlBE}/persona/coordinador`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getCoordinadoresAct(idEquipo: number): Promise<any> {
        const url = `${this._urlBE}/equipo/${idEquipo}/coordinador`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getPersonas(): Promise<any>{
        const url = `${this._urlBE}/persona`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getPersonasAct(idEquipo: number): Promise<any>{
        const url = `${this._urlBE}/equipo/${idEquipo}/voluntario`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getJornadasAct(idEquipo: number): Promise<any>{
        const url = `${this._urlBE}/equipo/${idEquipo}/jornada`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getAllJornadas(): Promise<any> {
        const url = `${this._urlBE}/jornada`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async removeJornada(idJornada: number): Promise<any> {
        const url = `${this._urlBE}/jornada/${idJornada}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }

    public async addJornada(jornada: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/jornada`;
        let req = {jornada: jornada, coordinadores: coordinadores};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async saveJornada(jornada: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/jornada/${jornada.idJornada}`;
        let req = {jornada: jornada, coordinadores: coordinadores};
        return await this._http.put(url, req, this._httpOptions).toPromise();
    }

    public async getJornadaById(idJornada: number): Promise<any> {
        const url = `${this._urlBE}/jornada/${idJornada}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getPersonasJornadaAct(idJornada: number): Promise<any> {
        const url = `${this._urlBE}/jornada/${idJornada}/persona`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async addPersonaJornada(idJornada: number, idPersona: number): Promise<any> {
        const url = `${this._urlBE}/jornada/${idJornada}/persona`;
        return await this._http.post(url, {idPersona: idPersona}, this._httpOptions).toPromise();
    }

    public async AsistenciaJornada(idJornada: number, idPersona: number, confirmacion: boolean): Promise<any> {
        const url = `${this._urlBE}/jornada/${idJornada}/persona`;
        return await this._http.put(url, {idPersona: idPersona, confirmacion: confirmacion}, this._httpOptions).toPromise();
    }

    public async getDashboard(idEquipo: number): Promise<any>{
        const url =  `${this._urlBE}/equipo/${idEquipo}/estadistica`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }
    public async getDashboardGeneral(): Promise<any>{
        const url =  `${this._urlBE}/equipo/estadistica`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }
}
