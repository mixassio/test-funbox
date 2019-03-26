import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import Channels from './Channels';
import FormChannel from './FormChannel';

const App = () => (
  <div className="d-flex justify-content-center m-2 flex-row vh-100">
    <div className="flex-column ml-5 pr-2 border-right border-warning">
      <div className="mt-2 pb-2 border-bottom border-warning">
        <FormChannel />
      </div>
      <div className="overflow-auto pt-2 pb-1 h-75">
        <Channels />
      </div>
    </div>
    <div className="flex-column mr-5 pl-2 w-50">
      <YMaps>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={500} height={500} />
        </div>
      </YMaps>
    </div>
  </div>
);

export default App;
