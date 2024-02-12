import { CustomResponse } from "../model";
import { ServerResponse } from "http";

export const JsonReturn = (res: ServerResponse, result: CustomResponse<any>) => {
    res.statusCode = result.statusCode;
    res.end(JSON.stringify(result.data));
}