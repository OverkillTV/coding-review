import * as React from 'react';

import styles from './RevlonCodingInterview.module.scss';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IRevlonCodingInterviewWebPartProps } from '../RevlonCodingInterviewWebPart';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ISPListItem } from '../../../models/ISPListItem';

export interface IRevlonCodingInterviewProps {
  context: WebPartContext;
  wp_props: IRevlonCodingInterviewWebPartProps;
  initData: any[];
}

export interface IRevlonCodingInterviewState {
  isLoading: boolean;
  loadingMessage: string;
}

export class RevlonCodingInterview extends React.Component<IRevlonCodingInterviewProps, IRevlonCodingInterviewState> {
  private _viewFields: IViewField[] = [
    {
      name: "Title",
      displayName: "Name",
      sorting: true,
      minWidth: 120,
      maxWidth: 150,
      isResizable: true,
      render: (item: ISPListItem, index: number) => {
          return item.Title;
      },
    },
    {
      name: "Created",
      displayName: "Created Date",
      sorting: true,
      minWidth: 110,
      maxWidth: 150,
      isResizable: true,
      render: (item: ISPListItem, index: number) => {
          return item.Created != null && item.Created != "" ? new Date(item.Created).toLocaleDateString() : "";
      },
    }
  ];

  constructor(props: IRevlonCodingInterviewProps) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: ""
    };
  }

  public render(): React.ReactElement<IRevlonCodingInterviewProps> {
    return (
      <div>
        <div>
          <ListView
            items={this.props.initData}
            viewFields={this._viewFields}
            compact={true}
            selectionMode={SelectionMode.none}
            showFilter={true}
            filterPlaceHolder="Search..."
            stickyHeader={true}
          />
        </div>
        <div>
          <PrimaryButton
            primary={ true }
            text={"Create"}
            iconProps={{iconName: "New"}}
            onClick={this.createItem}
          />
        </div>
      </div>
    );
  }

  private createItem = () => {
    //Create new item
  }
}
