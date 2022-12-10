import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q:'Kyiv'})
  const [units, setUnits] = useState('metric')
  const [weather,setWeather] = useState(null)
  
  useEffect(() => {
    const fetchWeather = async() => {
 
      await getFormattedWeatherData({...query, units}).then((data) => {
        toast.success(`Successfully, ${data.name}, ${data.country}`)

        setWeather(data);
      });
    };
  
    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-300 to-blue-400'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-300 to-blue-400'

    return 'from-yellow-400 to-orange-300'
  }

  return (
    <div className={`mx-auto indent max-w-screen-md mt-4 py-15 bg-gradient-to-br from-cyan-300 to-blue-400 h-fit shadow-xl
    shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
    
          <Forecast title="daily forcast" items={weather.hourly}/>
          <Forecast title="hourly forcast" items={weather.daily} />
        </div>
      )}

    <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>

    </div>
  );
}

export default App;
