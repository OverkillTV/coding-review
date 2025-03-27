import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'RevlonCodingInterviewWebPartStrings';

import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { RevlonCodingInterview, IRevlonCodingInterviewProps} from './components/RevlonCodingInterview';
import { ISPListItem } from '../../models/ISPListItem';
import { ListItemService } from '../../services/ListItem';

export interface IRevlonCodingInterviewWebPartProps {
  webpartTitle: string;
}

export default class RevlonCodingInterviewWebPart extends BaseClientSideWebPart<IRevlonCodingInterviewWebPartProps> {
  private data: ISPListItem[] = [];

  protected async onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "...");
    
    const rsGetAllItems = await ListItemService.GetAllListItems(this.context, this.context.pageContext.web.absoluteUrl, "Sample List", ["LookupColumn/ID", "LookupColumn/Title"], ["LookupColumn"], `Status eq 'Active'`, 'Title desc');
    if(rsGetAllItems.success && rsGetAllItems.value != null) {
      this.data = rsGetAllItems.value;
    }

    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IRevlonCodingInterviewProps> = React.createElement(
      RevlonCodingInterview,
      {
        context: this.context,
        wp_props: this.properties,
        initData: this.data
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: strings.WebpartTitleLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
