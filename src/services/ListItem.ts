import * as _ from "lodash";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IRestResponse } from "../models/IRestResponse";

export class ListItemService {
    public static async GetPagedListItems(context: BaseComponentContext, webUrl: string, listTitle: string, selects?: string[], expands?: string[], filter?: string, order?: string, top?: number): Promise<IRestResponse> {
        if(listTitle != null && listTitle != "") {
            let rs: any[] = [];

            const selectString = selects != null && selects.length > 0 ? `&$select=*,Author/ID,Author/Title,Author/Name,Author/EMail,Author/UserName,Editor/ID,Editor/Title,Editor/Name,Editor/EMail,Editor/UserName,${selects.join(",")}` : "&$select=*,Author/ID,Author/Title,Author/Name,Author/EMail,Author/UserName,Editor/ID,Editor/Title,Editor/Name,Editor/EMail,Editor/UserName";
            const expandString = selectString != "" ? `&$expand=Author,Editor${expands != null && expands.length > 0 ? `,${expands.join(",")}` : ""}` : "";
            const selectAndExpandString = selectString != "" ? `${selectString}${expandString}` : "";
            const filterString = filter != null && filter != "" ? `&$filter=${filter}` : "";
            const orderString = order != null && order != "" ? `&$orderby=${order}` : "";
            const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$top=${!_.isEmpty(top) ? top : 1000}${selectAndExpandString}${filterString}${orderString}`;

            const response: SPHttpClientResponse = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
            const rsCurrentPage = await response.json();

            if(!rsCurrentPage["odata.error"] && !rsCurrentPage.error) {
                return {
                    success: true,
                    value: rsCurrentPage.value,
                    nextLink: rsCurrentPage["@odata.nextLink"]
                };
            } else {
                console.log(`ERROR - GetPagedListItems for ${listTitle}`, rsCurrentPage.error != null ? rsCurrentPage.error.message.value : rsCurrentPage["odata.error"].message.value);
                return {
                    success: false,
                    error: rsCurrentPage.error != null ? rsCurrentPage.error : rsCurrentPage["odata.error"]
                };
            }
        }

        return {
            success: false,
            error: "listTitle cannot be null or empty"
        };
    }
    public static async GetAllListItems(context: BaseComponentContext, webUrl: string, listTitle: string, selects?: string[], expands?: string[], filter?: string, order?: string, top?: number, nextPage?: string): Promise<IRestResponse> {
        if(listTitle != null && listTitle != "") {
            let rs: any[] = [];

            const selectString = selects != null && selects.length > 0 ? `&$select=*,Author/ID,Author/Title,Author/Name,Author/EMail,Author/UserName,Editor/ID,Editor/Title,Editor/Name,Editor/EMail,Editor/UserName,${selects.join(",")}` : "&$select=*,Author/ID,Author/Title,Author/Name,Author/EMail,Author/UserName,Editor/ID,Editor/Title,Editor/Name,Editor/EMail,Editor/UserName";
            const expandString = selectString != "" ? `&$expand=Author,Editor${expands != null && expands.length > 0 ? `,${expands.join(",")}` : ""}` : "";
            const selectAndExpandString = selectString != "" ? `${selectString}${expandString}` : "";
            const filterString = filter != null && filter != "" ? `&$filter=${filter}` : "";
            const orderString = order != null && order != "" ? `&$orderby=${order}` : "";
            const apiUrl = nextPage != null ? nextPage : `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$top=${!_.isEmpty(top) ? top : 1000}${selectAndExpandString}${filterString}${orderString}`;

            const response: SPHttpClientResponse = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
            const rsCurrentPage = await response.json();

            if(!rsCurrentPage["odata.error"] && !rsCurrentPage.error) {
                rs = _.concat(rs, rsCurrentPage.value);
                
                if(rsCurrentPage["@odata.nextLink"] != null) {
                    const rsNextPage = await this.GetAllListItems(context, listTitle, null, null, null, null, null, rsCurrentPage["@odata.nextLink"]);
            
                    rs = _.concat(rs, rsNextPage.value);
                }
                
                return {
                    success: true,
                    value: rs
                };
            } else {
                console.log(`ERROR - GetAllListItems for ${listTitle}`, rsCurrentPage.error != null ? rsCurrentPage.error.message.value : rsCurrentPage["odata.error"].message.value);
                return {
                    success: false,
                    error: rsCurrentPage.error != null ? rsCurrentPage.error : rsCurrentPage["odata.error"]
                };
            }
        }
        
        return {
            success: false,
            error: "listTitle cannot be null or empty"
        };
    }
}