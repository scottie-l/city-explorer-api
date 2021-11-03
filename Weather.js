import React, { Component } from 'react';

export default class Weather extends Component {

    getWeather = async(city) => {
        const url = `https://api.weatherbit.io/v2.0/subscription/usage?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&format=json`;
    }
    // try {
    //     let response = await axios.get(url)
    //     this.setState({location: response.data.[0]}, this.getMapUrl)
    // } catch(event) {
    //     console.error(event);
    //     this.setState({error:true})
    // }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
