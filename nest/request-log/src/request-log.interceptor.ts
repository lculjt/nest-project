import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { tap } from 'rxjs';
import { HttpService} from '@nestjs/axios';
import * as requestIp from 'request-ip';
import * as iconv from 'iconv-lite';
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {

  private readonly logger = new Logger(RequestLogInterceptor.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async ipToCity(ip: string) {
    const response = await this.httpService.axiosRef(`https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`, {
      responseType: 'arraybuffer',
      transformResponse: [
        function (data) {
          const str = iconv.decode(data, 'gbk');
          return JSON.parse(str);
        }
      ]
    });
    return response.data.addr;
  }


  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];
    const { ip, method, path } =request;
    const city = await this.ipToCity(ip);
    const clientIp = requestIp.getClientIp(request) || ip;

    this.logger.debug(`${method} ${path} ${clientIp} ${city} ${userAgent}: ${
        context.getClass().name
      } ${
        context.getHandler().name
      } invoked...`
    );
    const now = Date.now();
    return next.handle().pipe(tap(res => {
      this.logger.debug(
        `${method} ${path} ${clientIp} ${city} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`,
      );
      this.logger.debug(`Response: ${JSON.stringify(res)}`)
    }));
  }
}
