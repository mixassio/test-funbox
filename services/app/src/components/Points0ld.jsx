import React from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import connect from '../connect';
import pointsSelector from '../selectors';
import DeletePoint from './DeletePoint';
import RenamePoint from './RenamePoint';

const mapStateToProps = state => ({
  points: pointsSelector(state),
});

@connect(mapStateToProps)
class Points extends React.Component {
  render() {
    const { points } = this.props;
    return (
      <ListGroup>
        {points.map(el => (
          <ButtonGroup size="sm" key={el.id}>
            <Button size="sm" className="w-100 m-1" variant="outline-success">{el.name}</Button>
            <ButtonGroup className="m-1">
              {<RenamePoint point={el} />}
              {<DeletePoint pointId={el.id} />}
            </ButtonGroup>
          </ButtonGroup>
        ))}
      </ListGroup>
    );
  }
}

export default Points;
