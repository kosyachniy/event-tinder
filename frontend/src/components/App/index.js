import React from 'react'
import 'bulma/css/bulma.css'

import { appId, appCode } from '../../keys'
import { viewer } from '../../params'
import './style.css'
import Header from '../Header'
// import Search from '../Search'
import Cards from '../Cards'
import Map from '../Maps'


export default class App extends React.Component {
  state = {
    maps: false,
    search: '',
    markers: '',
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

	handlerSearch = (res) => {
    this.setState({search: res})

    // searchMarker = new H.map.DomMarker({lat:lat, lng:lon});
	}


  render() {
		const body = (this.state.maps && 
      <React.Fragment>
        {/* <Search handlerSearch={this.handlerSearch} /> */}
        <Map
          app_id={ appId }
          app_code={ appCode }
          lat={ viewer.geoLat }
          lng={ viewer.geoLng }
          zoom={ viewer.zoom }
          search={ this.state.search }
          markers={ this.state.markers }
          // markerLat={ this.state.lat }
          // marletLng={ this.state.lng }
        />
      </React.Fragment>
    ) || <Cards />

		return (
			<div className="main">
      {this.state.markers}
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