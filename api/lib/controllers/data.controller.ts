import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
   public path = '/api/post';
   public path2 = '/api/data';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.get(`${this.path}/latest`, this.getAll);
    this.router.post(`${this.path}/:id`, this.addData);
    this.router.post(`${this.path2}/:num`, checkPostCount, this.getManyElements);
    this.router.get(`${this.path}/:id`, this.getElementById);
    this.router.post(`${this.path}`, this.addNewElement);
    this.router.delete(`${this.path}/:id`, this.deleteOneElement);
    this.router.post(`${this.path}s/:num`, this.getManyElements);
    this.router.get(`${this.path}s`, this.getAllElements);
    this.router.delete(`${this.path}s`, this.deleteAllElements);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction ) => {
        response.status(200).json(testArr);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArr.push(elem);

        response.status(200).json(testArr);
    }

    private getElementById = async (requsest: Request, response: Response) => {
        const { id } = requsest.params;

        if (!Number.isInteger(Number(id))) {
            return response.status(404).json({ error: "Not found." });
        }
        
        response.status(200).json(testArr[Number(id)]);
    }

    private addNewElement = async (request: Request, response: Response) => {
        const { elem } = request.body;

        testArr.push(elem);

        response.status(201).json(testArr);
    };

    private deleteOneElement = (request: Request, response: Response) => {
        const { id } = request.params;

        if (!Number.isInteger(Number(id))) {
            return response.status(404).json({ error: "Not found." });
        }

        testArr.splice(Number(id), 1);

        response.status(200).json(testArr);
    };

    private getManyElements (request: Request, response: Response) {
        const { num } = request.params;

        let tab = [...testArr].splice(0, Number(num));

        response.status(200).json(tab);
    }

    private getAllElements = async (request: Request, response: Response ) => {
        response.status(200).json(testArr);
    };

    private deleteAllElements = async (request: Request, response: Response) => {
        testArr.length = 0;

        response.status(204).json(testArr);
    };
}

export default PostController;