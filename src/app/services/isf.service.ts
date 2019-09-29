import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
//
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';
import Socket = NodeJS.Socket;
import {MatSnackBar} from '@angular/material';


@Injectable({
    providedIn: 'root',
})

export class ISFService {
    private httpOptions: any = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    private fbToken: string;
    public urlBE: string;
    private socket: Socket;

    public onUsersChanged: BehaviorSubject<any>;

    constructor(private http: HttpClient,
                public authSerivce: AuthService,
                private _matSnackBar: MatSnackBar,
                private _fuseNavigationService: FuseNavigationService) {

        this.urlBE = environment.config.urlBE;
    }


}
