import React from "react";

//import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";

import SongItem from "./SongItem";

import './SongList.css'

const SongList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No Songs Found. Maybe add one?</h2>
                    <button>Add Song</button>
                </Card>

            </div>
        );
    }

    return (
    <ul className="place-list">
        {props.items.map(song => (
        <SongItem 
        key={song.id} 
        id={song.id} 
        image={song.imageURL} t
        title={song.title}
        description={song.description}
        album={song.album}
        creatorId={song.creator}/>))}

    </ul>
    );
};

export default SongList;