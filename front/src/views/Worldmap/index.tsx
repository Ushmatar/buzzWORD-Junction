import * as React from 'react'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps'

import { Motion, spring } from 'react-motion'

const motionDefaults = {
  zoom: 1,
  x: 0,
  y: 20
}

const mapUrl =
  'https://d3-geomap.github.io/d3-geomap/topojson/world/countries.json'

export default class Worldmap extends React.Component<any, any> {
  constructor(props: null) {
    super(props)
    this.state = {
      markers: [[10, 10], [100, 31]],
      center: [0, 20],
      zoom: 1
    }
    this.toggleZoomToDataPoint = this.toggleZoomToDataPoint.bind(this)
  }

  toggleZoomToDataPoint({ coordinates }: any) {
    this.setState(state => ({
      ...state,
      center:
        state.zoom === motionDefaults.zoom
          ? coordinates
          : [motionDefaults.x, motionDefaults.y],
      zoom: state.zoom === motionDefaults.zoom ? 2 : motionDefaults.zoom
    }))
  }

  render() {
    return (
      <Motion
        defaultStyle={motionDefaults}
        style={{
          zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
          x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
          y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
        }}
      >
        {({ zoom, x, y }: any) => (
          <ComposableMap
            style={{
              width: '100%',
              height: 'auto'
            }}
          >
            <ZoomableGroup center={[x, y]} zoom={zoom}>
              <Geographies geographyUrl={mapUrl}>
                {(geographies: any, projection: any) =>
                  geographies.map((geography: any, i: number) => (
                    <Geography
                      key={`geography-${i}`}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none'
                        },
                        hover: {
                          fill: '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none'
                        },
                        pressed: {
                          fill: '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none'
                        }
                      }}
                    />
                  ))}
              </Geographies>
              <Markers>
                {this.state.markers.map((coordinates: [number, number]) => (
                  <Marker
                    marker={{ coordinates }}
                    key={coordinates.toString()}
                    onClick={this.toggleZoomToDataPoint}
                  >
                    <circle cx={0} cy={0} r={10} fill="rgba(100,50,0,0.5)" />
                  </Marker>
                ))}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </Motion>
    )
  }
}
