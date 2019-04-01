/* eslint-disable react/no-unused-state */
import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';


class MyMap extends React.Component {
  constructor() {
    super();
    this.state = { center: [55.75, 37.57], zoom: 9 };
  }

  handleClick = (event) => {
    this.setState({ center: event.get('newCenter'), zoom: event.get('newZoom') });
  };

  render() {
    return (
      <YMaps>
        <div>
          <Map
            state={this.state}
            width={500}
            height={500}
            onBoundschange={this.handleClick}
          />
        </div>
      </YMaps>
    );
  }
}

export default MyMap;
