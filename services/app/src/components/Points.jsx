import React from 'react';
import cn from 'classnames';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import connect from '../connect';
import pointsSelector from '../selectors';
import DeletePoint from './DeletePoint';
import RenamePoint from './RenamePoint';

const mapStateToProps = state => ({
  points: pointsSelector(state),
  setCurrentPointId: state.setCurrentPointId,
  currentPointId: state.currentPointId,
});

@connect(mapStateToProps)
class Points extends React.Component {
  setPoint = pointId => () => {
    const { setCurrentPointId } = this.props;
    setCurrentPointId(pointId);
  };

  render() {
    const {
      points, currentPointId,
    } = this.props;
    return (
      <ListGroup>
        {points.map((el) => {
          const btnClass = cn({
            'w-100': true,
            'm-1': true,
            active: el.id === currentPointId,
          });
          return (
            <ButtonGroup size="sm" key={el.id}>
              <Button size="sm" onClick={this.setPoint(el.id)} className={btnClass} variant="outline-success">{el.name}</Button>
              {el.removable
              && (
                <ButtonGroup className="m-1">
                  {<RenamePoint point={el} />}
                  {<DeletePoint pointId={el.id} />}
                </ButtonGroup>
              )
              }
            </ButtonGroup>
          );
        })}
      </ListGroup>
    );
  }
}

export default Points;
