module.exports = (app) => {

    app.get('/api/forgotpassword', function (req, res) {
        let toto = JSON.stringify('<form>' +
        ' <form [formGroup]="ionicForm" (ngSubmit)="submitForm()" novalidate><ion-input placeholder="Enter Input"> <ion-item lines="full">'+
        '<ion-label position="floating">Email</ion-label>'+
        '<ion-input formControlName="email" type="email" required [(ngModel)]="email"></ion-input>'+
        '</ion-item>' +
        '<ion-row>'+
        '<ion-col>'+
        '<ion-button type="submit" color="danger" (click)="submitForm()" expand="block">Submit</ion-button>'+
        '</ion-col>'+
        '</ion-row></form>');
        res.send(toto);
    });

}