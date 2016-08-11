import React, {Component} from 'react';

class QueueListItem extends Component {
  render() {
    console.log(this.props.queue);
    const date = new Date(this.props.queue.scheduled);
    const name = '第' + (this.props.queue.deck || this.props.queue.dock) + this.props.unit;
    return (
      <div>
        <span>{name}</span> <span>{date.getHours()}:{date.getMinutes()}</span>
      </div>
    );
  }
}

class QueueList extends Component {
  render() {
    const items = this.props.queues.sort((prev, next) => {
      return (prev.deck || prev.dock) > (next.deck || next.dock);
    }).map((queue, i) => {
      return <QueueListItem key={i} queue={queue} unit={this.props.unit} />
    });
    return (
      <div style={{flex: 1}}>
        <div style={{fontWeight: 'bold'}}>{this.props.title}</div>
        {items}
      </div>
    );
  }
}

export default class QueuesView extends Component {

  render() {
    return (
      <div style={{display: 'flex'}}>
        <QueueList queues={this.props.queues.missions.queues}    title={'遠征'} unit={'艦隊'} />
        <QueueList queues={this.props.queues.recoveries.queues}  title={'修復'} unit={'dock'} />
        <QueueList queues={this.props.queues.createships.queues} title={'建造'} unit={'dock'} />
      </div>
    )
  }
}