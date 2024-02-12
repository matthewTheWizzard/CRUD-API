import { IncomingMessage, ServerResponse } from 'http';
import { METHODS, StatusCodes } from '../../src/enums';

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

interface RouteModel {
  method: METHODS;
  path: string;
  handler: RouteHandler;
}

interface RouterModel {
  addRoute(method: METHODS, path: string, handler: RouteHandler): void;
  route(req: IncomingMessage, res: ServerResponse): void;
}

interface CustomResponse<T> {
  statusCode: StatusCodes;
  data: T;
  message: string;
}

export { RouteHandler, RouteModel, RouterModel, CustomResponse };