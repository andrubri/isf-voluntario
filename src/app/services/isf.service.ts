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

    private _httpOptions: any = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private _http: HttpClient,
                private _fuseNavigationService: FuseNavigationService) {

        this._urlBE = environment.config.urlBE;
    }

    public async getMeUser(): Promise<any> {
        this._me = await this.getUserByToken('me');
        return this._me;
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

    public async getAllActividades(): Promise<any> {
        const url = `${this._urlBE}/actividad`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async removeActividad(idActividad: number): Promise<any> {
        const url = `${this._urlBE}/actividad/${idActividad}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }

    public async addActividad(actividad: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/actividad`;
        let req = {actividad: actividad, coordinadores: coordinadores};
        return await this._http.post(url, req, this._httpOptions).toPromise();
    }

    public async saveActividad(actividad: any, coordinadores: any): Promise<any> {
        const url = `${this._urlBE}/actividad/${actividad.idActividad}`;
        let req = {actividad: actividad, coordinadores: coordinadores};
        return await this._http.put(url, req, this._httpOptions).toPromise();
    }

    public async getActividadById(idActividad: number): Promise<any> {
        const url = `${this._urlBE}/actividad/${idActividad}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

    public async getCoordinadores(): Promise<any> {
        const coordinadores = [];
        const usuarios = await this.getAllUsers();
        for (const user of usuarios) {
            if (user.idvoluntario) {
                coordinadores.push(user);
            }
        }
        return coordinadores;
    }

    public async getCoordinadoresAct(idActividad: number): Promise<any> {
        const url = `${this._urlBE}/actividad/${idActividad}/coordinador`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

   /* public async getJornadas(): Promise<any> {
        const jornadas = [];
        const actividades = await this.getAllActividades();
        for (const actividad of actividades) {
            if (actividades.idActividad) {
                jornadas.push(actividad);
            }
        }
        return jornadas;
    }

    public async getJornadasAct(idActividad: number): Promise<any> {
        const url = `${this._urlBE}/actividad/${idActividad}/jornada`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }*/
}
