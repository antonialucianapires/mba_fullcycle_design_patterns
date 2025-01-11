import UseCase from "./UseCase";

export default class LogDecorator implements UseCase{
    
    constructor(readonly useCase: UseCase) {}

    execute(input: any): Promise<any> {
        console.log(input.userAgent)
        return this.useCase.execute(input);
    }

}