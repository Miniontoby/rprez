export declare enum MessageType {
    ManagerReady = 0,
    ScreenUpdated = 1,
    RequestLoadPresentation = 2,
    RequestPresentShow = 3,
    RequestExistShow = 4,
    RequestNextSlide = 5,
    RequestPreviousSlide = 6
}
export interface IMessage {
    type: MessageType;
}
export interface IScreenInfo {
    width: number;
    height: number;
    id: number;
}
export declare enum MonitorViews {
    None = "None",
    Speaker = "Speaker",
    Audience = "Audience",
    Clock = "Clock"
}
export interface IScreenUpdatedMessage extends IMessage {
    screens: IScreenInfo[];
}
export interface IRequestPresentShowMessage extends IMessage {
    screenAssignments: {
        [id: number]: MonitorViews;
    };
}
export interface IRequestLoadPresentationMessage extends IMessage {
    filename: string;
}
