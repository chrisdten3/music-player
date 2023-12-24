import React from "react";

const AlbumImage = (imageSrc) => {
    console.log('checking albumImage' + imageSrc);
    return (
        <div className="h-[50%] w-[50%]">
            <img src={imageSrc} alt="album cover" className="rounded-2xl" />
        </div>
    )
}

const AlbumInfo = (info) => {
    return (
        <div className="h-[30%] flex flex-col justify-center">
            <h1 className="text-white text-3xl">Album Name</h1>
            <h2 className="text-gray-400 text-xl">Artist Name</h2>
        </div>
    )
}

const SongCard = (album) => {
    console.log('checking album' + album);
    return (
        <div className="h-[60%] pb-30 bg-slate-800 rounded-2xl flex-col justify-center items-center">
            <AlbumImage
                imageSrc = {album?.images[0]?.url}
            />
            <AlbumInfo 
                info = {album}
            />
        </div>
    )
}
export default SongCard;