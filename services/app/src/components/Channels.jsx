import React from 'react';
import cn from 'classnames';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import DeleteChannel from './DeleteChannel';
import RenameChannel from './RenameChannel';


const mapStateToProps = state => ({
  channels: channelsSelector(state),
  setCurrentChannnelId: state.setCurrentChannnelId,
  currentChannelId: state.currentChannelId,
  addChannel: state.addChannel,
});

@connect(mapStateToProps)
class Channels extends React.Component {
  setChannel = channelId => () => {
    const { setCurrentChannnelId } = this.props;
    setCurrentChannnelId(channelId);
  };

  render() {
    const {
      channels, currentChannelId,
    } = this.props;
    return (
      <ListGroup>
        {channels.map((el) => {
          const btnClass = cn({
            'w-100': true,
            'm-1': true,
            active: el.id === currentChannelId,
          });
          return (
            <ButtonGroup size="sm" key={el.id}>
              <Button size="sm" onClick={this.setChannel(el.id)} className={btnClass} variant="outline-success">{el.name}</Button>
              {el.removable
              && (
                <ButtonGroup className="m-1">
                  {<RenameChannel channel={el} />}
                  {<DeleteChannel channelId={el.id} />}
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

export default Channels;
