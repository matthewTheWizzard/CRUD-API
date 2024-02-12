import { IncomingMessage, ServerResponse } from "http";
import { RouteHandler, RouteModel, RouterModel } from "./model";
import { METHODS } from "src/enums";

export class Router implements RouterModel {
    routes: RouteModel[] = [];

    addRoute(method: METHODS, path: string, handler: RouteHandler): void {
        this.routes.push({ method, path, handler });
    }

    addRoutes(routes: RouteModel[]): void {
        this.routes.push(...routes);
    }

    route(req: IncomingMessage, res: ServerResponse): void {
        const route = this.getRoute(req.method as METHODS, req.url);

        if (route) {
            route.handler.call(null, req, res); 
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
    }

    private getRoute(method?: METHODS, url?: string): RouteModel | undefined {
        if (!url || !method) {
            return;
        }

        console.log({ method, url })

        return this.routes.find((route) => route.method === method && this.validatePath(route.path, url));
    }

    private validatePath(pattern: string, url: string): boolean {
        const patternSegments = pattern.split('/');
        const urlSegments = url.split('/').filter((s) => s);

        if (patternSegments.length !== urlSegments.length) {
            return false;
        }
    
        for (let i = 0; i < patternSegments.length; i++) {
            if (!this.segmentMatches(patternSegments[i], urlSegments[i])) {
                return false;
            }
        }
    
        return true;
    }
    
    private segmentMatches(patternSegment: string, urlSegment: string): boolean {
        if (patternSegment.startsWith('{')) {
            return true;
        } else {
            return patternSegment === urlSegment;
        }
    }
    
}