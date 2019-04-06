/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  YMaps, Map, Placemark, Polyline,
} from 'react-yandex-maps';
import connect from '../connect';
import pointsSelector from '../selectors';

const mapStateToProps = state => ({
  setCurrentCenter: state.setCurrentCenter,
  currentCenter: state.currentCenter,
  points: pointsSelector(state),
  changePoint: state.changePoint,
});

@connect(mapStateToProps)
class MyMap extends React.Component {
  handleClick = (event) => {
    const { setCurrentCenter } = this.props;
    setCurrentCenter({ center: event.get('newCenter'), zoom: event.get('newZoom') });
  };

  movePoint = pointId => async (event) => {
    // eslint-disable-next-line dot-notation
    const newGeoLoc = event.get('target').geometry['_coordinates'];
    const { changePoint } = this.props;
    try {
      await changePoint({
        change: { center: newGeoLoc },
        pointId,
      });
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { currentCenter, points } = this.props;
    return (
      <YMaps>
        <div>
          <Map state={currentCenter} width={500} height={500} onBoundschange={this.handleClick}>
            {points.map(({ center, id, name }) => (
              <Placemark
                modules={['geoObject.addon.balloon']}
                key={id}
                geometry={center}
                properties={{ balloonContent: name }}
                options={{ draggable: true }}
                onDragend={this.movePoint(id)}
              />
            ))}
            <Polyline
              geometry={points.map(({ center }) => center)}
              options={{
                balloonCloseButton: true,
                strokeWidth: 3,
                strokeOpacity: 0.5,
              }}
            />
          </Map>
        </div>
      </YMaps>
    );
  }
}

export default MyMap;
