import { useEffect, useState } from 'react';

const WeatherPage = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLocation({ latitude, longitude });
        // Burada hava durumu API'sine istek yapabilirsiniz.
      }, (error) => {
        console.error('Geolocation error:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="background">
      <div className="h-screen flex justify-center items-center">
        {location && <p>Konum: {location.latitude}, {location.longitude}</p>}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="card1 w-full">
            <img
              src="https://i.gifer.com/5yb.gif"
              alt="img-1"
              className="object-cover h-full"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://i.gifer.com/embedded/download/OcT6.gif"
              alt="img-2"
              className="object-cover h-full"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://i.pinimg.com/originals/c1/a9/3a/c1a93a1d0de0059a3119b8b1a55ce582.gif"
              alt="img-3"
              className="object-contain"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://www.sakarya54.net/wp-content/uploads/2022/12/supercell1.gif"
              alt="img-4"
              className="object-contain"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://taylorsciencegeeks.weebly.com/uploads/5/9/2/0/59201005/562505546.gif"
              alt="img-5"
              className="object-contain"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://24.media.tumblr.com/cc99ef01499bce32e50fe73641594856/tumblr_mfzrh8wvg41s0v7f4o1_500.gif"
              alt="img-6"
              className="object-contain"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://www.icegif.com/wp-content/uploads/2022/02/icegif-544.gif"
              alt="img-7"
              className="object-contain"
            />
          </div>
          <div className="card1 w-full">
            <img
              src="https://i.pinimg.com/originals/51/9a/83/519a837a74de5c3a0638a40a31ae0324.gif"
              alt="img-8"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
