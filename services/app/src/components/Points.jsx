import React from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import connect from '../connect';
import pointsSelector from '../selectors';
import DeletePoint from './DeletePoint';
import RenamePoint from './RenamePoint';

const DragHandle = sortableHandle(() => <span className="pt-2 oi oi-elevator" />);

const SortableItem = SortableElement(({ value }) => (
  <ButtonGroup size="sm" key={value.id}>
    <DragHandle />
    <Button size="xs" className="w-100 m-1" variant="outline-success">{value.name}</Button>
    <ButtonGroup className="m-1">
      {<RenamePoint point={value} />}
      {<DeletePoint pointId={value.id} />}
    </ButtonGroup>
  </ButtonGroup>
));

const SortableList = SortableContainer(({ items }) => (
  <ListGroup>
    {items.map((el, ind) => (
      <SortableItem key={`item-${el.id}`} index={ind} value={el} />
    ))}
  </ListGroup>
));


const mapStateToProps = state => ({
  points: pointsSelector(state),
});

@connect(mapStateToProps)
class Points extends React.Component {
  state = {
    items: this.props.points,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}
export default Points;
