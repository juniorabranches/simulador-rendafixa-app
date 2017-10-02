import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


import 'rxjs/add/operator/map';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ApiProvider {

  baseUrl: string = "https://easynvestsimulatorcalcapi.azurewebsites.net/calculator/simulate/";

  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  public simular(valor, cdi, data){
    let headers = new Headers
    headers.append('Content-Type','application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token, X-AMZ-META-TOKEN-ID, X-AMZ-META-TOKEN-SECRET');
    let options = new RequestOptions({headers : headers});
    //executa o método post na api, solicitando o novo token
    this.http.get(`${this.baseUrl}/?investedAmount=${valor}&index=CDI&rate=${cdi}&isTaxFree=false&maturityDate=${data}`, options)
        //mapear a função, retornando uma response (com os dados obtidos)
        .map(res => res.json())
        .subscribe(
          //deu certo e trouxe resultado em JSON, transferi pra variavel "data" e poder ler cada campo do json
          data=>{
            alert(`                  Resultado da simulação: R$ ${data.grossAmount}
                   Rendimento total de: R$ ${data.grossAmountProfit}

                   Valor aplicado inicialmente: R$ ${data.investmentParameter.investedAmount}
                   Valor bruto do investimento: R$ ${data.grossAmountProfit}
                   Valor do rendimento: R$ ${data.grossAmountProfit}
                   IR sobre o investimento: ${data.taxesAmount} (${data.taxesRate}%)
                   Valor líquido do investimento: R$ ${data.netAmount}

                   Data de resgate: ${data.investmentParameter.maturityDate}
                   Dias corridos: ${data.investmentParameter.maturityTotalDays}
                   Rendimento mensal: ${data.monthlyGrossRateProfit}%
                   Percentual do CDI do papel: ${data.investmentParameter.rate}%
                   Rentabilidade anual: ${data.investmentParameter.yearlyInterestRate}%
                   Rentabilidade no período: ${data.annualGrossRateProfit}%
                  `)
          },
          err=>{
            alert(err);
          }
        );
  }

}
