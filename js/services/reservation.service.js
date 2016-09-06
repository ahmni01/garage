"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/retry');
var ReservationService = (function () {
    function ReservationService(_http) {
        this._http = _http;
        //private _reservationUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/category';
        this._reservationUrl = sessionStorage.getItem('api_base_url') + 'reservation';
    }
    ReservationService.prototype.addReservation = function (payload) {
        var apiHeaders = new http_1.Headers();
        var _token = sessionStorage.getItem('id_token');
        apiHeaders.append('Authorization', _token); //apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.post(this._reservationUrl, payload, { headers: apiHeaders })
            .retry(3)
            .map(function (response) { return response.json(); });
        //.do(data =>{
        //console.log("Response from POST (Reservation): " + JSON.stringify(data))  
        //   })       
    };
    ReservationService.prototype.getAllReservationInfo = function () {
        var apiHeaders = new http_1.Headers();
        var _token = sessionStorage.getItem('id_token');
        var currentReservervations = this._reservationUrl + '?filter=returned_date+IS+NULL';
        apiHeaders.append('Authorization', _token); //apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.get(currentReservervations, { headers: apiHeaders, body: '' })
            .retry(3)
            .map(function (response) { return response.json(); });
        //.do(data =>{
        //console.log("RecievedData: " + JSON.stringify(data))  
        //})
        //.catch(this.exceptionHandler);                        
    };
    ReservationService.prototype.updateReservation = function (payload) {
        var apiHeaders = new http_1.Headers();
        var _token = sessionStorage.getItem('id_token');
        apiHeaders.append('Authorization', _token); //apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.put(this._reservationUrl, payload, { headers: apiHeaders })
            .retry(3)
            .map(function (response) { return response.json(); });
        //.do(data =>{
        //console.log("Response from PUT (Reservation Service): " + JSON.stringify(data))  
        //})       
    };
    ReservationService.prototype.exceptionHandler = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Encountered Error!!');
    };
    ReservationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReservationService);
    return ReservationService;
}());
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map