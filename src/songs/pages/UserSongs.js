import React from "react";

import { useParams } from "react-router-dom";

import SongList from "../components/SongList";

const DUMMY_SONGS = [
    {
        id: "s1",
        title: "Askin Olayim",
        description: "Icardi'nin sarkisi",
        imageURL: "https://i1.sndcdn.com/artworks-dQncaYVI7tH2kzH8-IfeQVA-t500x500.jpg",
        album: "Galatasaray",
        creator: 'u1'
    },
    {
        id: "s2",
        title: "Askin Olayim",
        description: "Icardi'nin sarkisi",
        imageURL: "https://i1.sndcdn.com/artworks-dQncaYVI7tH2kzH8-IfeQVA-t500x500.jpg",
        album: "Galatasaray",
        creator: 'u2'
    }

];

function UserSongs() {
    const userId = useParams().userId;
    const loadedSongs = DUMMY_SONGS.filter((song) => song.creator === userId);
    return <SongList items={loadedSongs} />;
  }
export default UserSongs;