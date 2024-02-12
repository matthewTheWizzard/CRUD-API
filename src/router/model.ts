import { IncomingMessage, ServerResponse } from 'http';
import { METHODS } from 'src/enums';

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

export { RouteHandler, RouteModel, RouterModel };