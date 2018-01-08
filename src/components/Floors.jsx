import React from 'react';
import Floor from './Floor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QWERY_ROOMS =  gql`query{
    rooms {
      id
      title
      capacity
      floor
    }
    events{
        id
        title
        dateEnd
        dateStart
        users {
          id
          login
          avatarUrl
        }
        room {
          id
        }
      }
  }`;


class Floors extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
        };
        // this.handleClickMeet = this.handleClickMeet.bind(this);
    }
    // handleClickMeet(id){
    //     console.log('rfrfrf', id);
    // }
    render(){
        if (!this.props.data.loading){
        let floorsMass = [];
        for (let i = 0; i < this.props.data.rooms.length; i++){
            if (floorsMass[this.props.data.rooms[i].floor]===undefined){
                floorsMass[this.props.data.rooms[i].floor]=[{
                key: this.props.data.rooms[i].id,
                roomTitle: this.props.data.rooms[i].title,
                completed : false,
                roomSubtitile : this.props.data.rooms[i].capacity,
                events: []
                }];
            }
            else {
                floorsMass[this.props.data.rooms[i].floor].push({
                    key: this.props.data.rooms[i].id,
                    roomTitle: this.props.data.rooms[i].title,
                    completed : false,
                    roomSubtitile : this.props.data.rooms[i].capacity,
                    events: []
                    });
            }
        }

        for (let j = 0; j < this.props.data.events.length; j++){
            for (let k = 0; k < floorsMass.length; k++){
                if (floorsMass[k]!==undefined){
                    for (let l = 0; l < floorsMass[k].length; l++){
                        if(this.props.data.events[j].room.id === floorsMass[k][l].key){
                            floorsMass[k][l].events.push(this.props.data.events[j]);
                        }
                    }
                }
            }
        }
        return(
        <div>
                {floorsMass.map((floor, index)  => <Floor
                //  OnClickMeetFS={this.handleClickMeet} 
                 idFloor = {index} key={index} floorCount = {index} rooms ={floor}/>)}
        </div>
        )
    }
    else return(
        <div>Loading...</div>
    )
    }
}

export default graphql(QWERY_ROOMS)(Floors);