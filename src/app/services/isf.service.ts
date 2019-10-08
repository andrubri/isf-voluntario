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

    public async getAllUsers(): Promise<any>{
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
    public async getAllActividades(): Promise<any>{
        const url = `${this._urlBE}/actividad`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }
    public async removeActividad(token: string): Promise<any> {
        const url = `${this._urlBE}/actividad/${token}`;
        return await this._http.delete(url, this._httpOptions).toPromise();
    }
    public async addActividad(actividad: any): Promise<any> {
        const url = `${this._urlBE}/actividad`;
        return await this._http.post(url, actividad, this._httpOptions).toPromise();
    }
    public async saveActividad(actividad: any): Promise<any> {
        const url = `${this._urlBE}/actividad/${actividad.token}`;
        return await this._http.put(url, actividad, this._httpOptions).toPromise();
    }
    public async getActividadByToken(token: string): Promise<any> {
        const url = `${this._urlBE}/actividad/${token}`;
        return await this._http.get(url, this._httpOptions).toPromise();
    }

}
