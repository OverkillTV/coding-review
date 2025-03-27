import { ISPUser } from "./ISPUser";

export interface ISPListItem {
    ID: number;
    etag?: string;
    Title?: string;
    Created?: string;
    Modified?: string;
    Author?: ISPUser;
    Editor?: ISPUser;
}