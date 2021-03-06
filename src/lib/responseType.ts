import { gmoStatus } from './type';

// root
export interface gmoResponse<T> {
  status: number;
  data: T;
  responsetime: string;
}

// status
export interface gmoStatusResponse {
  status: gmoStatus
}

// Ticker
export interface gmoTickerResponse {
  ask: string;
  bid: string;
  high: string;
  low: string;
  symbol: string;
  timestamp: string;
  volume: string;
}

// Orderbook
export interface OrderbookResponse {
  price: string;
  size: string;
}

// Orderbooks
export interface OrderbooksResponse {
  asks: OrderbookResponse[];
  bids: OrderbookResponse[];
}

// Trade
export interface TradeResponse {
  price: string;
  size: string;
  timestamp: string;
}

// Trades
export interface TradesResponse {
  pagination: {
    currentPage: number;
    count: number;
  }
  list: TradeResponse[];
}

// Margin
export interface MarginResponse {
  actualProfitLoss: string;
  availableAmount: string;
  margin: string;
  profitLoss: string;
}

// ActiveOrdersResponse
export interface ActiveOrderResponse {
  rootOrderId: number;
  orderId: number;
  symbol: string;
  side: string;
  orderType: string;
  executionType: string;
  settleType: string;
  size: string;
  executedSize: string;
  price: string;
  losscutPrice: string;
  status: string;
  timeInForce: string;
  timestamp: string;
}

export interface ActiveOrdersResponse {
  pagination: {
    currentPage: number;
    count: number;
  }
  list: ActiveOrderResponse[];
}

export interface gmoStreamBaseResponse{
  channel: string;
  symbol: string
}
export interface gmoPublicStreamBaseResponse extends gmoStreamBaseResponse{
  timestamp: string
}

export interface gmoPublicStreamTickerResponse extends gmoPublicStreamBaseResponse{
  ask: string;
  bid: string;
  high: string;
  last: string;
  low: string;
}

export interface gmoPublicStreamOrderBooksResponse extends gmoPublicStreamBaseResponse{
  asks: OrderbookResponse[];
  bids: OrderbookResponse[]
}

export interface gmoPublicStreamTradesResponse extends gmoPublicStreamBaseResponse{
  price: string;
  side:	string;	//????????????: BUY SELL
  size:	string	//????????????
}

export interface gmoPrivateStreamExecutionResponse extends gmoStreamBaseResponse{
  orderId: number;
  executionId: number;
  settleType: string;
  executionType: string;
  side: string;
  executionPrice: string;
  executionSize: string;
  positionId: number;
  orderTimestamp: string;
  executionTimestamp: string;
  lossGain: string;
  fee: string;
  orderPrice: string;
  orderSize: string;
  orderExecutedSize: string;
  timeInForce: string;
  msgType: string;
}

export interface gmoPrivateStreamOrderResponse extends gmoStreamBaseResponse {
  orderId: number;
  settleType: string;
  executionType: string;
  side: string;
  orderStatus: string;
  cancelType: string;
  orderTimestamp: string;
  orderPrice: string;
  orderSize: string;
  orderExecutedSize: string;
  losscutPrice: string;
  timeInForce: string;
  msgType: string;
}

export interface gmoPrivateStreamPositionResponse extends gmoStreamBaseResponse {
  positionId: number;
  side: string;
  size: string;
  orderdSize: string;
  price: string;
  lossGain: string;
  leverage: string;
  losscutPrice: string;
  timestamp: string;
  msgType: string;
}

export interface gmoPrivateStreamPositionSummaryResponse extends gmoStreamBaseResponse {
  side: string;
  averagePositionRate: string;
  positionLossGain: string;
  sumOrderQuantity: string;
  sumPositionQuantity: string;
  timestamp: string;
  msgType: string;
}