import * as crypto from 'crypto';
import * as querystring from 'querystring';
import { baseApiClass, ApiOptions } from './api';
import { GMOApiConfig } from './type';
import {
  gmoResponse,
  MarginResponse,
} from './responseType';
import {
  CancelOrderRequest,
  GetActiveOrderRequest,
  PostCloseOrderRequest,
  PostCloseBulkOrderRequest,
  PostOrderRequest,
  CancelBulkOrderRequest
} from './requestType';
import {
  ActiveOrdersResponse
} from './responseType';

const URL_API_GMO = 'https://api.coin.z.com/private';

export class gmoPrivateApiClass extends baseApiClass {
  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(config: GMOApiConfig, options?: ApiOptions) {
    config.endPoint = config.endPoint || URL_API_GMO;
    super(config, options);
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
  }

  public getWebsocketAccessToken(): Promise<gmoResponse<string>> {
    const path = '/v1/ws-auth';
    return this.post(path, {});
  }

  public updateWebsocketAccessToken(request: string): Promise<gmoResponse<void>> {
    const path = '/v1/ws-auth';
    return this.put(path, {token: request});
  }

  public getMargin(): Promise<gmoResponse<MarginResponse>> {
    const path = '/v1/account/margin'
    return this.get(path);
  }

  public postOrder(request: PostOrderRequest): Promise<gmoResponse<string>> {
    const path = '/v1/order';
    return this.post(path, request);
  }

  public postCloseOrder(request: PostCloseOrderRequest): Promise<gmoResponse<string>> {
    const path = '/v1/closeOrder';
    return this.post(path, request);
  }

  public postCloseBulkOrder(request: PostCloseBulkOrderRequest): Promise<gmoResponse<string>> {
    const path = '/v1/closeBulkOrder';
    return this.post(path, request);
  }

  public cancelOrder(request: CancelOrderRequest): Promise<gmoResponse<void>> {
    const path = '/v1/cancelOrder';
    return this.post(path, request);
  }

  public cancelBulkOrder(request: CancelBulkOrderRequest): Promise<gmoResponse<number[]>> {
    const path = '/v1/cancelBulkOrder';
    return this.post(path, request);
  }

  public getActiveOrders(request: GetActiveOrderRequest): Promise<gmoResponse<ActiveOrdersResponse>> {
    const path = '/v1/activeOrders';
    return this.get(path, request);
  }

  get<T>(path: string, query?: {}) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += '?' + querystring.stringify(query);
    }
    const headers = this.makeHeader('GET', path, '');
    return super.get(path, query, headers);
  }

  post<T>(path: string, query: {}) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader('POST', path, data);
    return super.post(path, query, headers);
  }

  put<T>(path: string, query: {}) {
    // const data = JSON.stringify(query);
    const headers = this.makeHeader('PUT', path, '');
    return super.put(path, query, headers);
  }

  private makeHeader(method: string, path: string, body: string): any {
    const timestamp = Date.now().toString();
    const text = timestamp + method + path + body;
    const sign = crypto.createHmac('sha256', this.apiSecret).update(text).digest('hex');
    return {
      "API-KEY": this.apiKey,
      "API-TIMESTAMP": timestamp,
      "API-SIGN": sign
    };
  }
}
