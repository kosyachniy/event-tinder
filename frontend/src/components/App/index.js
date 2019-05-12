import React from 'react'
import 'bulma/css/bulma.css'

import { appId, appCode } from '../../keys'
import { viewer } from '../../params'
import './style.css'
import Header from '../Header'
// import Search from '../Search'
import Cards from '../Cards'
import Map from '../Maps'
import Timeline from '../Timeline'


export default class App extends React.Component {
  state = {
    maps: false,
    search: '',
    markers: '',
    timeline: false,
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
  
  handlerTime = () => {
    this.setState({
			timeline: !this.state.timeline,
    })
  
		if (!this.state.timeline) {
			document.getElementsByClassName('header')[0].style.background = 'rgba(255, 255, 255, 1)'
		} else {
      if (this.state.maps) {
        document.getElementsByClassName('header')[0].style.background = 'rgba(255, 255, 255, 0.7)'
      } else {
        document.getElementsByClassName('header')[0].style.background = 'rgba(255, 255, 255, 0.0)'
      }
		}
  }


  render() {
		const body = (this.state.timeline && <Timeline />) || (this.state.maps && 
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
				<Header handlerType={ this.handlerType } handlerTime={ this.handlerTime } />
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