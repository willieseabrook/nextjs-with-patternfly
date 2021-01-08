import React from 'react';
import {
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';

import { 
  Table, 
  TableHeader, 
  TableBody,
  wrappable,
  truncate,
  nowrap,
  breakWord,
  cellWidth,
  fitContent
} from '@patternfly/react-table';
import { ToggleGroup, ToggleGroupItem } from '@patternfly/react-core';

// CSS OK
import '../../test-css.css'

/*
(1) To make fail, in package.json:
  replace:
    "node-sass": "^4.8.3", (or any other version of the node-sass npm module)
  with:
    "sass": "^1.32.2", (or any other version of the sass npm module)

(2) To validate it has something to do with scss, when using the new sass module, comment and uncomment test-scss.scss

- When the import test-scss.scss line is commented out, it works, when it is not commented, it fails

(3) To look deeper, comment out the <TableHeader /> below

- Fails: When sass is enabled, and the test-scss.scss is imported, and <TableHeader /> is *not* commented out
- Succeeds: When sass is enabled, and the test-scss.scss is imported, and <TableHeader /> is *commented out*
*/

import '../../test-scss.scss'

export default class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 'default'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(isSelected, event) {
    this.setState({
      choice: event.currentTarget.id
    });
  }

  render() {

    const { choice } = this.state;

    const columns = [
      { title: 'Truncate (width 20%)', transforms: [cellWidth(10)], cellTransforms: [truncate] },
      { title: 'Break word', cellTransforms: [breakWord] },
      { title: 'Wrapping table header text. This th text will wrap instead of truncate.', transforms: [wrappable] },
      { title: 'Fit content', transforms: [fitContent] },
      { title: '', cellTransforms: [nowrap] }
    ]
    const rows = [
      [
        'This text will truncate instead of wrap.',
        { title: <a href="#">http://thisisaverylongurlthatneedstobreakusethebreakwordmodifier.org</a> },
        {
          title: (
            <p>
              By default,
              <code>thead</code> cells will truncate and
              <code>tbody</code> cells will wrap. Use
              <code>.pf-m-wrap</code> on a<code>th</code> to change its behavior.
            </p>
          )
        },
        "This cell's content will adjust itself to the parent th width. This modifier only affects table layouts.",
        { title: <a href="#">No wrap</a> }
      ],
      [
        'This text will truncate instead of wrap.',
        { title: <a href="#">http://thisisaverylongurlthatneedstobreakusethebreakwordmodifier.org</a> },
        {
          title: (
            <p>
              By default,
              <code>thead</code> cells will truncate and
              <code>tbody</code> cells will wrap. Use
              <code>.pf-m-wrap</code> on a<code>th</code> to change its behavior.
            </p>
          )
        },
        "This cell's content will adjust itself to the parent th width. This modifier only affects table layouts.",
        { title: <a href="#">No wrap</a> }
      ]
    ];

    return (
      <React.Fragment>
        <TextContent>
          <Text component={TextVariants.h1}>Hello World</Text>
        </TextContent>

        <ToggleGroup aria-label="Default with single selectable">
          <ToggleGroupItem
            text="Default"
            buttonId="default"
            isSelected={choice === 'default'}
            onChange={this.handleItemClick}
          />
          <ToggleGroupItem
            text="Compact"
            buttonId="compact"
            isSelected={choice === 'compact'}
            onChange={this.handleItemClick}
          />
          <ToggleGroupItem
            text="Compact without borders"
            buttonId="compactBorderless"
            isSelected={choice === 'compactBorderless'}
            onChange={this.handleItemClick}
          />
        </ToggleGroup>
        <Table
          aria-label="Simple Table"
          variant={choice !== 'default' ? 'compact' : null}
          borders={choice !== 'compactBorderless'}
          cells={columns}
          rows={rows}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>

    );
  }
}
