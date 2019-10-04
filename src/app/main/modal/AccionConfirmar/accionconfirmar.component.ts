import {Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './accionconfirmar.component.html',
  styleUrls: ['./accionconfirmar.component.scss']
})
export class AccionConfirmarComponent implements OnInit {
   datos: any;

  constructor(
    public dialogRef: MatDialogRef<AccionConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: ActivatedRoute) {

    this.datos = data;
  }

  ngOnInit() {

  }

  onCloseCancel() {
      this.dialogRef.close('Cancel');
  }

  ConfirmarAccion(){
    this.datos.callback();
    this.dialogRef.close('Confirm');
  }
}
