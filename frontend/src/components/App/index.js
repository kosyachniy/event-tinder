import React from 'react'
import 'bulma/css/bulma.css'

import { appId, appCode } from '../../keys'
import './style.css'
import Header from '../Header'
import Cards from '../Cards'
import Map from '../Maps'


export default class App extends React.Component {
  state = {
    maps: false,
  }

	handlerType = () => {
		this.setState({
			maps: !this.state.maps,
    })
  
		if (!this.state.maps) {
			document.getElementsByClassName('header')[0].style.background = 'rgba(255, 255, 255, 0.7)'
			// document.getElementsByClassName('header')[0].style.opacity = '0.7'
		} else {
			document.getElementsByClassName('header')[0].style.background = 'rgba(255, 255, 255, 0.0)'
			// document.getElementsByClassName('header')[0].style.opacity = '0'
		}
	}

  render() {
    const geoLat = 55
    const geoLng = 40

		const body = (this.state.maps &&
      <Map
        app_id={ appId }
        app_code={ appCode }
        lat={ geoLat }
        lng={ geoLng }
        zoom={ 4 }
        // markerLat={ this.state.lat }
        // marletLng={ this.state.lng }
      />
    ) || <Cards />

		return (
			<div className="main">
				<Header handlerType={ this.handlerType } />
				{ body }
			</div>
		)



    // return (
    //   <React.Fragment>
    //     {/* <Header /> */}
    //     <Cards />
    //   </React.Fragment>
      
    // )
  }
}