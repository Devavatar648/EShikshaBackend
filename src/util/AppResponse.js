export class AppResponse{
    constructor(result=null,message=""){
        this.message=message;
        this.result=result;
    }
}