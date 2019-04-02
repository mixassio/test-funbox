/* eslint-disable react/no-unused-state */
import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import connect from '../connect';

const mapStateToProps = state => ({
  setCurrentCenter: state.setCurrentCenter,
  currentCenter: state.currentCenter,
});

@connect(mapStateToProps)
class MyMap extends React.Component {
  handleClick = (event) => {
    const { setCurrentCenter } = this.props;
    setCurrentCenter({ center: event.get('newCenter'), zoom: event.get('newZoom') });
  };

  render() {
    const { currentCenter } = this.props;
    return (
      <YMaps>
        <div>
          <Map
            state={currentCenter}
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
