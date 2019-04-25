import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  Request,
  RestBindings,
  RequestContext
} from '@loopback/rest';
import {inject,Context} from '@loopback/context';
import {Code} from '../models';
import {CodeRepository} from '../repositories';
import {BadSubmission} from '../models';
import {BadSubmissionRepository} from '../repositories';
import {WhoAmIController} from '../controllers'

import mongodb = require("mongodb");

export class AuthController {
  constructor(
    @repository(CodeRepository)
    public codeRepository : CodeRepository,
    @repository(BadSubmissionRepository)
    public badsubmissionRepository : BadSubmissionRepository,
    @inject(RestBindings.Http.CONTEXT) public ctx:Context,
    @inject(RestBindings.Http.REQUEST) public qer:Request
  ) {}

  @post('/codes', {
    responses: {
      '200': {
        description: 'Code model instance',
        content: {'application/json': {schema: {'x-ts-type': Code}}},
      },
    },
  })
  async create(@requestBody() code: Code): Promise<Code> {
    return await this.codeRepository.create(code);
  }
  @post('/createauth', {
    responses: {
      '200': {
        description: 'Code model instance',
        content: {'application/json': {schema: {'x-ts-type': Code}}},
      },
    },
  })
  async createauth(@requestBody() code: Code): Promise<Code> {
    return await this.codeRepository.create(code);
  }

  @get('/codes/count', {
    responses: {
      '200': {
        description: 'Code model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Code)) where?: Where,
  ): Promise<Count> {
    return await this.codeRepository.count(where);
  }

  @get('/codes', {
    responses: {
      '200': {
        description: 'Array of Code model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Code}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Code)) filter?: Filter,
  ): Promise<Code[]> {
    console.log(filter)
    return await this.codeRepository.find(filter);
  }

  @patch('/codes', {
    responses: {
      '200': {
        description: 'Code PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() code: Code,
    @param.query.object('where', getWhereSchemaFor(Code)) where?: Where,
  ): Promise<Count> {
    return await this.codeRepository.updateAll(code, where);
  }

  @get('/codes/{id}', {
    responses: {
      '200': {
        description: 'Code model instance',
        content: {'application/json': {schema: {'x-ts-type': Code}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Code> {
    return await this.codeRepository.findById(id);
  }

  @patch('/createauthcode/{id}', {
    responses: {
      '204': {
        description: 'Code PATCH success',
      },
    },
  })
  async addAuthCode(
    @param.path.string('id') id: string,
    
  ): Promise<void> {
    // get code object by Id
     let c: Code = await this.codeRepository.findById(id);
    let nums = '0123456789';
    let s ='';
    for(let x=0;x<6;x++){
      let rand_num = Math.floor(Math.random()*10)
      let rand_digit = nums[rand_num] 
      console.log(rand_num,rand_digit)
      s = s+rand_digit;
    }
    let date = new Date();
    date.setHours(date.getHours()+2)
    c.status = 'created'
    c.exp = date.toISOString();
    console.log(date.toDateString())
    c.code = s

    console.log("I LOVE MEEEEEEEE")
    // generate six digit code and exp date and save
    await this.codeRepository.updateById(id, c);
  }

  @post('/verifyauthcode', {
    responses: {
      '204': {
        description: 'Code PATCH success',
      },
    },
  })
  async verifyAuthCode(
    
    @requestBody() req: any,
    
   
  ): Promise<any> {
  //  let f:Filter ={};
  console.log("CMON MANNNN")
  console.log(req)
    let f:Filter = {
      where:{"formId":req.formid,"userid":req.userid},

      limit:1
    };
    let c = await this.codeRepository.find(f);
    
     //console.log(param.header)
     const reqq = await this.ctx.get(RestBindings.Http.REQUEST);
     //console.log(RequestContext)
     //console.log(reqq.headers)
    //let c = await this.codeRepository.find(f);
    let d = new Date();

    console.log(c[0])
    console.log(req.code,c[0].code)
    //get code object and code from request
    //if req.code == code.code status == signed .. save objoect and return success else return fail 
    if(req.code==c[0].code){

      c[0].signed_date = d.toISOString()
      c[0].meta = reqq.headers
      c[0].status = "signed"
      c[0].ip = reqq.headers['x-forwarded-for']
      c[0].url = reqq.headers.referrer

    await this.codeRepository.updateById(c[0].id, c[0]);
    return c[0]
    }
    else{
      console.log("NO MATCHHHHHHHHHHHHHHHHH")
      interface sub   {
      
        "actual_code": string | undefined,
        "submitted_code": string | undefined,
        "meta": string | undefined
      }
      
      let submission :sub ={
        actual_code:c[0].code,
        submitted_code:req.code,
        meta: JSON.stringify(reqq.headers)
      }

     // this.badsubmissionRepository.create(submission)
      return await "No Bueno"
    }
  }  

  @put('/codes/{id}', {
    responses: {
      '204': {
        description: 'Code PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() code: Code,
  ): Promise<void> {
    await this.codeRepository.replaceById(id, code);
  }

  @del('/codes/{id}', {
    responses: {
      '204': {
        description: 'Code DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codeRepository.deleteById(id);
  }

  @post('/codes/sendemail')
  async sendEmailWithCode(
    @requestBody() req: any
  ){
    let auth_id = req.id;
    let f:Filter ={};
    f.where = {"doc_id":auth_id}
    f.limit=1;
    let c = await this.codeRepository.find(f);

    //let code = this.codeRepository.findById(auth_id)
    let customfunc = new WhoAmIController();
    let em  = {
      sender:"webmaster@thewaveint.com",
      name:"Walter",
      subject:"Authentication Code",
      text:"Your authentication code is "+c[0].code,
      recipient:"walterj@thewaveint.com"
    };

    return customfunc.postEmail(em)
  }

  @post('/createauthandsend')
  async createAuthandSend(
    @requestBody() code: Code 
  ): Promise<any>{
    const ObjectID = mongodb.ObjectID;
    


    let f:Filter = {
      where:{"formId":code.formId,"userid":code.userid},

      limit:10
    };
    let codeCount = await this.codeRepository.find(f);
    console.log(code)
    console.log(codeCount)
    let nums = '0123456789';
    let s ='';
    for(let x=0;x<6;x++){
      let rand_num = Math.floor(Math.random()*10)
      let rand_digit = nums[rand_num] 
      console.log(rand_num,rand_digit)
      s = s+rand_digit;
    }
    let date = new Date();
    let d2 = new Date();
    date.setHours(date.getHours()+2)

    let customfunc = new WhoAmIController();
    let em  = {
      phone:code.phone,
      code:s,
    };
    
    if(codeCount.length===0){
      customfunc.textCode(em)
      let c = {
      
        "formId": code.formId,
        "userid": code.userid,
        "code": s,
        "exp": date.toISOString(),
        "email": code.email,
        "phone": code.phone,
        "status": 'created',
        "date_created":d2.toISOString()
      }

    return await this.codeRepository.create(c);
  }
  else{
    console.log("ALREADYYYYYYYYY")
    customfunc.textCode(em)
    let date = new Date();
    let d2 = new Date();
    date.setHours(date.getHours()+2)

    let c = codeCount[0];
   // const id: mongodb.ObjectID = new ObjectID(c.id);
    //id: '5c6310ccd017a36e09de66c7',
    c.formId = code.formId
    c.userid = code.userid
    c.code = s
    c.exp= date.toISOString()
    c.signed_date= undefined
    c.email= code.email
    c.phone= code.phone
    c.status= 'created again'
    c.date_created = d2.toISOString()
    
    if(c.id) return   await this.codeRepository.replaceById(c.id, c);
    else return c
    //return await this.codeRepository.updateById(c.id,c)
  }
  }

}
