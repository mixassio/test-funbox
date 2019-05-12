import React from 'react';
import Points from './Points';
import FormPoint from './FormPoint';
import MyMap from './MyMap';

const App = () => (
  <div className="d-flex justify-content-center m-2 flex-row vh-100">
    <div className="flex-column ml-5 pr-2 border-right border-warning">
      <div className="mt-2 pb-2 border-bottom border-warning">
        <FormPoint />
      </div>
      <div className="overflow-auto pt-2 pb-1 h-75">
        <Points />
      </div>
    </div>
    <div className="flex-column mr-5 pl-2 w-50">
      <MyMap />
    </div>
  </div>
);

export default App;
