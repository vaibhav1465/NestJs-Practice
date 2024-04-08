import { HttpException } from "@nestjs/common";


export class MyCustomError extends HttpException{

    constructor(){
        super("Custom Error by Vaibhav",201)
    }

}