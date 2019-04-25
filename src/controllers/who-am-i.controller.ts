// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
// src/controllers/who-am-i.controller.ts
import {inject,Getter} from '@loopback/context';
import {serviceProxy} from '@loopback/service-proxy';
import fetch from 'node-fetch';
//import {
//  AuthenticationBindings,
//  UserProfile,
//  authenticate,
//} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';

import {Request,Response, RestBindings, get, ResponseObject,post,param,requestBody,} from '@loopback/rest';
//import * as jwt from 'jsonwebtoken';
//import { XMLHttpRequest } from 'xmlhttprequest-ts';
//import axios from 'axios';
//import {AxiosPromise} from "axios";
//import * as request from 'request'

interface GeoCode {
  lat: number;
  lng: number;
}

interface GeoAddress{
  address:string;
}

interface GeoService {
  geocode(street: string, city: string, zipcode: string): Promise<GeoCode>;
  revgeocode( lat:number , lng:number ): Promise<GeoAddress>;

}

export class WhoAmIController {

  constructor(

  ) {
    console.log('whoami')
  }
  @post('createUser')
  async createUser(@requestBody() req:any){
    if(req.approved==1){
    let user = await  fetch('https://2020i.site/api/wsers/',{method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},
    body:JSON.stringify(req)}).then(res=>{console.log(res)}) }
    return "USER CREATED"

  }


  @get('/whoami/{address}/{city}/{zip}')
  async whoAmI(
    @param.path.string('address') address: string,
    @param.path.string('city') city: string,
    @param.path.string('zip') zip: string
  ): Promise<any> {
      return 'Walter'
  }

  @get('/whoami2')
  async whoAmI2(): Promise<any> {

    return "Johnson"
  }

  @post('/email/post')
  async postEmail(@requestBody() req:any):Promise<any>{

// convert to model and create own routing structure i.e. /mail/create to send mail

    console.log('create')
    const Mailjet = require('node-mailjet').connect("83b478238b0a0e8073b37aab002206cd","0ea3d85db0e51f50e629e01d3de9861e");
    var sendEmail = Mailjet.post('send');
    console.log(req)
    var emailData = {
      'FromEmail': req.sender,
      'FromName': req.name,
      'Subject': req.subject,
      'Text-part': req.text,
      'Recipients': [{'Email': req.recipient}],
  }
  sendEmail
  .request(emailData)
    .then((response:any)=>{/*console.log(response)*/})
    .catch((error:any)=>{console.log(error)});

    return Mailjet
  }

  @post('/codes/text')
  async textCode(@requestBody() req:any):Promise<any>{

// convert to model and create own routing structure i.e. /mail/create to send mail
console.log("POST CODES TEXT")
var accountSid = 'AC4cf3e9a76e9ad0ab3891a29072e70405'; // Your Account SID from www.twilio.com/console
var authToken = '7426d1ffc6f29133a50ffb708c42c32c';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
console.log(client)
client.messages.create({
    body: 'Your Code is '+req.code,
    to: req.phone,  // Text this number
    from: '+13217328852' // From a valid Twilio number
})
.then((message:any,error:any) => {console.log("SENT");console.log(message,error)});
return "ILOVE "
  }


  @get('/secret-code')
  async generateCode():Promise<any>{
      return {"code":this.randInt()}
  }
  randInt(){
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  }

  @post('/uploads')
  async saveFiles(@requestBody({
    description: 'multipart/form-data value.',
    required: true,
    content: {
      'multipart/form-data': {
        // Skip body parsing
        'x-parser': 'stream',
        schema: {type: 'object'},
      },
    },
  }) request: Request,
  @inject(RestBindings.Http.RESPONSE) response: Response,):Promise<any>{
    console.log(request)
    return "Uploads Saved"
  }

  @post('/secret-code')
  async checkSecretCode(@requestBody() req:any):Promise<string>{
    console.log('create')
    return "match secret code to token and return an OK"
  }

  @get('/create/contract')
  async create(){
      return 'GET'
  }

  /*@post('/create/contracts')
  async createContract(app: Application):Promise<any>{

    let data = {
      "template_id": "c51c0406-fcd8-4984-b68c-77c6b0243755",
      "signers": [
        {
          "name": app.name,
          "email": app.email,
          "mobile": app.phone,
    
          "auto_sign": "no",
          "skip_signature_request_email": "yes"
        }
      ],
      "custom_fields": [
          {
            "api_key": "name",
            "value": app.name
          }
      ],
      "template_merge": [

      ],
      "emails": {
        "signature_request_subject": "Your document is ready to sign",
        "signature_request_text": "Hi __FULL_NAME__, \n\n To sign the contract please <link>click on this link...</link> \n\n Kind Regards",
        "final_contract_subject": "Your document is signed",
        "final_contract_text": "Hi __FULL_NAME__, \n\n Your document is signed.\n\nKind Regards",
        "cc_email_addresses": ["tom@email.com", "francis@email.com"]
      },
      "locale": "en",
      "embedded": "yes",
      "test": "yes"
    }
    let config = {
      auth: {
        username: '0afd434f-d80f-4151-85c8-0bcb4005e129',
        password: ''
      },
          headers:{
            "content-type":"text/plain;charset=UTF-8",
          "Authorization":"Basic MGFmZDQzNGYtZDgwZi00MTUxLTg1YzgtMGJjYjQwMDVlMTI5Og=="
        }
      }
    try{
      console.log('TRYYYYYYYYYYYYY')
   //   const p =  await  axios.get('https://0afd434f-d80f-4151-85c8-0bcb4005e129:@esignatures.io/api/templates')
   const p  =  await  axios.post('https://0afd434f-d80f-4151-85c8-0bcb4005e129:@esignatures.io/api/contracts',data,config)
   console.log(p)
    return p.data
    }catch(error){
      console.log("ERRORRRRRRRRRRRRRRRRRR")
      console.log(error.response)
      return error.status
    }
//console.log(response)
      
  }
*/



}
