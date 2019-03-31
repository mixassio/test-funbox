import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';


class myMap extends React.Component {
  render() {
    return (
      <YMaps>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={500} height={500} />
        </div>
    </YMaps>
    )
  }
}

export default myMap;
