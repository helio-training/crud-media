import React from 'react'

const API_URL = process.env.REACT_APP_API_URL;

const VideoGame = ({ game, refresh }) => {
    const deleteGame = () => {
        fetch(`${API_URL}/video-games/${game._id}`, {
            method: "DELETE"
        }).then(refresh)
    }
    return (
        <div>
            <span>{game.name}</span>
            <button className="del-btn" onClick={deleteGame}>X</button>
        </div>
    )
}

export default VideoGame;