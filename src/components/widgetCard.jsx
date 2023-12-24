import React from "react";

const WidgetEntry = ({ title, subtitle, image, spotifyID, type }) => {
    const defaultImageUrl = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2';

    const imageStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        cursor: 'pointer',
    };

    const redirectToSpotify = () => {
      if (spotifyID) {
          if (type === 'track') window.open(`https://open.spotify.com/track/${spotifyID}`, '_blank');
          else if (type === 'artist') window.open(`https://open.spotify.com/artist/${spotifyID}`, '_blank');
      }
  };

    return (
        <div className="entry-body flex hover:scale-105" onClick={redirectToSpotify}>
            <img
                src={image || defaultImageUrl}
                alt={title}
                className="entry-image"
                style={imageStyle}
            />
            <div className="entry-right-body flex flex-col ml-2">
                <p className="entry-title text-white font-bold">{title}</p>
                <p className="entry-subtitle text-white">{subtitle}</p>
            </div>
        </div>
    );
};

const WidgetCard = ({ title, similar, featured}) => {
    return (
        <div className="widget-card h-100px w-full bg-slate-700 rounded-md mb-8 p-4">
            <h1 className="text-yellow-600 font-bold py-2">{title}</h1>
            <div className="flex flex-col gap-4">
              {similar
                  ? similar.map((artist) => (
                      <WidgetEntry
                          key={artist?.id} // Add a unique key for each WidgetEntry
                          title={artist?.name}
                          subtitle={''}
                          image={artist?.images[2]?.url}
                          spotifyID={artist?.id}
                          type={'artist'}
                      />
                  ))
                  : featured
                      ? featured.map((track) => (
                          <WidgetEntry
                              key={track?.id} // Add a unique key for each WidgetEntry
                              title={track?.name}
                              subtitle={track?.artists[0]?.name}
                              image={track?.album?.images[2]?.url}
                              spotifyID={track?.id}
                              type={'track'}
                          />
                      ))
                      : null}
            </div>
        </div>
    );
};

export default WidgetCard;
