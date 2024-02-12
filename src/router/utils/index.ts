import { CustomResponse } from "../model";
import { ServerResponse } from "http";

export const JsonReturn = (res: ServerResponse, result: CustomResponse<unknown>) => {
    res.statusCode = result.statusCode;
    res.statusMessage = result.message;
    res.end(JSON.stringify(result.data));
}