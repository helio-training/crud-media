import React, { useState } from 'react'
import UpdateVideoGame from './UpdateVideoGame';

const API_URL = process.env.REACT_APP_API_URL;

const VideoGame = ({ game, refresh }) => {
    const [open, setOpen] = useState(false);

    const deleteGame = () => {
        fetch(`${API_URL}/video-games/${game._id}`, {
            method: "DELETE"
        }).then(refresh)
    }
    const toggleOpen = () => setOpen(!open);
    const displayUpdate = open ? 
        <fieldset>
            <UpdateVideoGame game={game} refresh={refresh} close={toggleOpen}/>
        </fieldset> :
        '';
    return (
        <div>
            <span>{game.name}</span>
            <button className="edit" onClick={toggleOpen}>Edit</button>
            <button className="del-btn" onClick={deleteGame}>X</button>
            {displayUpdate}
        </div>
    )
}

export default VideoGame;