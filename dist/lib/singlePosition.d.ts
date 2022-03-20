import { OrderSide, OrderType } from "my-utils";
import { gmoPrivateApiClass, wsFill, wsOrder, wsTicker } from "..";
export interface SinglePositionParameters {
    marketName: string;
    funds: number;
    api: gmoPrivateApiClass;
    sizeResolution: number;
    priceResolution: number;
    minOrderInterval?: number;
    openOrderSettings?: OrderSettings;
    closeOrderSettings?: OrderSettings;
}
export interface SinglePositionResponse {
    success: boolean;
    message?: any;
}
export interface OrderSettings {
    side: OrderSide;
    type: OrderType;
    price: number;
    size?: number;
    postOnly?: boolean;
    cancelSec?: number;
}
export declare class SinglePosition {
    private static _lastOrderTime?;
    private _api;
    private _marketName;
    private _funds;
    private _minOrderInterval;
    private _openOrderSettings?;
    private _closeOrderSettings?;
    private _initialSize;
    private _currentSize;
    private _openID;
    private _closeID;
    private _openTime;
    private _closeTime;
    private _isLosscut;
    private _openSide;
    private _currentOpenPrice;
    private _currentClosePrice;
    private _sizeResolution;
    private _priceResolution;
    private _closeCount;
    private _losscutCount;
    private _cumulativeFee;
    private _cumulativeProfit;
    onOpened?: (pos: SinglePosition) => void;
    onClosed?: (pos: SinglePosition) => void;
    onOpenOrderCanceled?: (pos: SinglePosition) => void;
    onCloseOrderCanceled?: (pos: SinglePosition) => void;
    constructor(params: SinglePositionParameters);
    private roundSize;
    private roundPrice;
    private placeOrder;
    private setOpen;
    private setClose;
    private resetOpen;
    private resetClose;
    open(isClose: boolean): Promise<SinglePositionResponse>;
    close(isClose: boolean): Promise<SinglePositionResponse>;
    openMarket(side: OrderSide, price: number, isClose: boolean): Promise<SinglePositionResponse>;
    openLimit(side: 'buy' | 'sell', price: number, postOnly: boolean | undefined, cancelSec: number | undefined, isClose: boolean): Promise<SinglePositionResponse>;
    closeMarket(isClose: boolean): Promise<SinglePositionResponse>;
    closeLimit(price: number, postOnly: boolean | undefined, cancelSec: number | undefined, isClose: boolean): Promise<SinglePositionResponse>;
    updateTicker(ticker: wsTicker): void;
    updateOrder(order: wsOrder): void;
    updateFill(fill: wsFill): void;
    losscut(): void;
    cancelAll(): void;
    cancelOpenOrder(): void;
    cancelCloseOrder(): void;
    get profit(): number;
    get enabledOpen(): Boolean;
    get enabledClose(): Boolean;
    get openOrderSettings(): OrderSettings | undefined;
    get closeOrderSettings(): OrderSettings | undefined;
    get currentSize(): number;
    get isLosscut(): boolean;
    get openSide(): OrderSide;
    get currentOpenPrice(): number;
    get currentClosePrice(): number;
    get closeCount(): number;
    get losscutCount(): number;
}
