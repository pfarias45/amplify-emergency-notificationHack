// src/App.js
import * as React from "react";
import { Map, GoogleApiWrapper, InfoWindow,  Marker  } from 'google-maps-react';
import { getAccessToken } from '../../wcp/WcpTokenStore';
import {Box, BoxProps} from '@workday/canvas-kit-react/layout';
import {shieldIcon} from '@workday/canvas-accent-icons-web';

import styled from '@emotion/styled';
import EmailContactForm from "./Email";

const mapStyles = {
    width: '60%',
    height: '60%',
  };


  const CardLayout = styled("div") ({
    paddingTop: "50px",
    paddingLeft: "650px"
    });


function groupBy(objectArray, lat, long) {
  const groupedByLocations = objectArray.reduce((acc, obj) => {
     const key = obj[lat] + ',' + obj[long];
     if (!acc[key]) {
        acc[key] = [];
     }
     // Add object to list for given key's value
     acc[key].push(obj);
     return acc;
  }, {});

  // {lat,long: Array of students, lat,long: array of students}
  console.log(groupedByLocations);

  const locations = Object.keys(groupedByLocations);
  //['lat,long', 'lat,long']

  console.log(locations);

  const groupedWithTotals = [];
  
  // {lat, long, workerWIDs, workerNames, workerTotal}
  locations.forEach(key => {
     groupedWithTotals.push({
      lat: groupedByLocations[key][0].lat,
      long: groupedByLocations[key][0].long,
      //workerWIDs: groupedByLocations[key].map(worker => worker.wid),
      //workerNames: groupedByLocations[key].map(worker => worker.name),
      workerEmails: groupedByLocations[key].map(worker => worker.email),
      workerPhones: groupedByLocations[key].map(worker => worker.phone),
      workerTotal: groupedByLocations[key].length
    })
  
  } );

  console.log(groupedWithTotals);

  return groupedWithTotals;
}


function MapGenerator () {

    const [selectedElement, setSelectedElement] = React.useState(null);
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [showInfoWindow] = React.useState(true);
    const [mapData, setMapData] = React.useState([]); // for markers
    //const [workerWIDsList, setWIDs] = React.useState([]); // for form
    //const [workerNamesList, setNames] = React.useState([]); // for form
    const [locationName, setLocationName] = React.useState(''); // for form
    // const [locationWID, setLocationWID] = React.useState(''); // for form
    const [selectedLoc, setSelectedElementLoc] = React.useState(null);

    const [workerEmailsList, setEmails] = React.useState([]);

     // use for info window logic
    const[isLocation, setIsLocation] = React.useState(false);
  

    const [locationsCompany, setCompanyLocations] = React.useState([]); // for markers

    //const [workerEmailsList, setEmails] = React.useState([]);
    //const [selectedLocation, setSelectedLocation] = React.useState({});

    const getLocations = async () => {
        const reportResponse = await fetch('https://api.workday.com/raas/lmcneil/Worker_Locations_Report', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
    
        const data = await reportResponse.json();

        console.log(data);

        const markerGroup = groupBy(data.Report_Entry, 'lat', 'long');
        
        setMapData(markerGroup);
    }


    React.useEffect(() => {
      getLocations();
    }, []);


    const getLocationsCompany = async () => {
      const wqlResponse = await fetch('https://api.workday.com/wql/v1/data?query=SELECT locationName, workdayID, latitude, longitude FROM locations (locationUsagesForLocation = (46db411c4a5245fbb39834d8b2cba049))', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAccessToken()}`
          }
      });
  
      const data = await wqlResponse.json();

      console.log(data);

      setCompanyLocations(data.data);
  }


  React.useEffect(() => {
    getLocationsCompany();
  }, []);

 
  // for company locations
  const mapRef = React.useRef();

    return (
      <React.Fragment>
        <EmailContactForm emails={workerEmailsList} locationName={locationName}/>
      
        <CardLayout>
          <Map
                  id="map"
                  ref={mapRef}
                  google={window.google}
                  zoom={10}
                  style={mapStyles}
                  initialCenter={{
                    lat: 37.821311, 
                    lng: -121.813176
                  }}
                  
              >
              
              { locationsCompany.map( key => {
                 
                return (
                  <Marker
                        key={key.locationName}
                        title={key.locationName}
                        label={(key.locationName).toString()}
                        position={{lat: key.latitude,
                        lng: key.longitude}}
                        onClick={(props, marker) => {
                          setSelectedElementLoc(key);
                          setActiveMarker(marker);
                          // only location to form if there isnt a location on the text input already
                          if(locationName === '') setLocationName(key.locationName); // send and show
                          //if(locationWID === '') setLocationWID(key.workdayID); // send and show
                        }
                      }  
                      />



                )
              
              }) }
              


              {mapData.map( location => {
                return (
                  <Marker
                        key={location.lat + ',' + location.long}
                        title={location.lat + ',' + location.long}
                        label={(location.workerTotal).toString()}
                        position={{lat: location.lat,
                        lng: location.long}}
                     
                    
                    
                        onClick={(props, marker) => {
                          setSelectedElement(location);
                          setIsLocation(true);
                          setActiveMarker(marker);
                          // append to arr every time a different marker is clicked if not already in arr
                          //if(!workerWIDsList.includes(location.workerWIDs)) setWIDs(workerWIDsList => [...workerWIDsList, location.workerWIDs]); // send but not show
                        
                          //if(!workerNamesList.includes(location.workerNames)) setNames(workersNamesList => [...workersNamesList, location.workerNames]); // send and show

                         if(!workerEmailsList.includes(location.workerEmails)) setEmails(workerEmailsList => [...workerEmailsList, location.workerEmails]); 
                         
                        }
                      }  
                      />



                )
              
              }) }
              
              {selectedLoc ? (
                <InfoWindow
                        visible={showInfoWindow}
                        marker={activeMarker}
                        onCloseClick={() => {
                        setSelectedElementLoc(null);
                        }
                      }
                    onClose = {() => { setLocationName('')}}
                      >
                        <div>
                          <h3>{  'Location: ' + selectedLoc.locationName}</h3> 
                  
                        </div>
                      
                      </InfoWindow>
                    ) : null}



            {selectedElement ? (
                <InfoWindow
                        visible={showInfoWindow}
                        marker={activeMarker}
                        onCloseClick={() => {
                        setSelectedElement(null);
                        }
                      }
                    onClose = {() => { setEmails([]) }}
                      >
                        <div>
                          <h3>{ 'Total Workers: ' + selectedElement.workerTotal}</h3> 
                  
                        </div>
                      
                      </InfoWindow>
                    ) : null}

              </Map>

              </CardLayout>
      </React.Fragment>
  
    );
  }



    
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJammR5yIOiUVS90JxoMEzTEScO4nF9g8'
})(MapGenerator);



/*
 

    /*
  
    const getLocationsCompany =  async () => {

      const data = [
        {
          locationName: 'Lake Forest',
          latitude:33.650066,
          longitude: -117.693100 
        },
        {
            locationName: 'Mission',
          
          latitude:35,
          longitude: -117
        }
        ];
        
        setCompanyLocations(data);
    }

 
    React.useEffect(() => {
        getLocationsCompany();
      }, []);

      

    const handleChange = async (e) => {
     
      setSelectedLocation(e.target.value);

      console.log(e.target.value);

    };
      const onSelectCity = useCallback(({longitude, latitude}) => {
         mapRef.current?.flyTo({center: [longitude, latitude], duration: 2000});
     } , []);

     
    const getLocations = async () => {
      const data = [
          {
            name: 'Worker A',
            locationName: 'Lake Forest',
            email: 'pfarias@hcg.com',
            phone: '949-446-7152',
            lat: 33.650066,
            long: -117.693100 
          },
          {
            name: 'Worker AB',
            locationName:  'Lake Forest',
            email: 'paula.farias45@gmail.com',
            phone: '949-446-7152',
            lat: 33.650066,
            long: -117.693100 
          },
          {
            name: 'Worker B',
            locationName:  'Mission',
            phone: '949-446-7152',
            email: 'test.com',
            lat: 35,
            long: -117
          },
          {
            name: 'Worker C',
            locationName:  'Mission',
            phone: '949-446-7152',
            email: 'test2.com',
            lat:35,
            long: -117
        }
      ]; 
    
      const markerGroup = groupBy(data, 'lat', 'long');
    
      setMapData(markerGroup )
    }
          


                
         <button onClick={handleChange()}>Onchange</button>
 


  
    let latLong;
    
      

   function handleChange() {
     
      latLong = {
        lat: 20,
        lng: -100
      }
        

    };

 <FormField
                    required={true}
                    labelPosition={FormField.LabelPosition.Left}
                    label="Locations Dropdown"
                    inputId="select-scrollable"
                    hintText="Select business site to navigate to it"
                    >
                    <Select 
                    value={selectedLocation}
                    onChange={handleChange} >
                        {locationsCompany.map( location => {
                            return ( 
                            <SelectOption key={location.locationName} label={location.locationName} value={JSON.stringify(location)} />    
                            )
                        } ) }
                    </Select>
          </FormField>

          <ControlPanel onSelectCity={onSelectCity} />

          <select name="selectList" id="selectList" 
            value={selectedLocation}
            onChange={e => {setSelectedLocation(e.target.value)
            console.log(selectedLocation);
            }}>
                    {locationsCompany.map( location => { 
                     
                        return ( 
                            <option value={location} label={location.locationName} 
                            
                            /> ) 
                    } ) } 
         </select>


   
    /*
 
    const getLocations = async () => {
      
      const data = [
        {
          name: 'Worker A',
          location: 'Lake Forest',
          email: 'pfarias@hcg.com',
          lat:33.650066,
          long: -117.693100 
        },
        {
          name: 'Worker AB',
          location: 'Lake Forest',
          email: 'paula.farias45@gmail.com',
          lat:33.650066,
          long: -117.693100 
        },
        {
          name: 'Worker B',
          location: 'Mission',
          email: 'test.com',
          lat:35,
          long: -117
        },
        {
          name: 'Worker C',
          location: 'Mission',
          email: 'test2.com',
          lat:35,
          long: -117
      }
      ]; 
      
      console.log(data);

      const markerGroup = groupBy(data, 'location');
      
      setMapData(markerGroup);

    }


import jsPDF from 'jspdf';
import html2canvas from "html2canvas";


        <button onClick={}>PDF</button>


    

const printDocument = async () => {
  console.log('yes');
  const input = document.getElementById('map');
 await html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('https://en.wikipedia.org/wiki/File:Workday_Logo.png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
};


const printDocument = async () => {
  const input = document.getElementById('map');
  await html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
}

const printDocument = async () => {
  await html2canvas(document.body, {
     useCORS: true,
     onrendered: function() {
         const canvas = document.getElementById("canvas");
         var img =canvas.toDataURL('image/jpeg');
         var pdf = new jsPDF();
         pdf.addImage(img, 'JPEG', 15, 40, 180, 180);
         pdf.save('a4.pdf')
     }
 });

const locationsList = locations.forEach((location) => {
    return

});


// src/App.js
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import {getLocations } from '../../utils/ExtendData';
import { getAccessToken } from '../../wcp/WcpTokenStore';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const Location = ({ name, lat, lng }) => (
    
    <Marker key={name}
    position={{
        lat: {lat},
        lng: {lng}
    }}
  onClick={console.log(lat)}
  name={name}
  />

  );
  
class MapGenerator extends Component {


  constructor() {
    super();
    this.state = {
      name: "React",
      locations: []
    };

  this.getLocations = this.getLocations.bind(this);
    }

    async getLocations() {
        const reportResponse = await fetch('https://api.workday.com/raas/pfarias-impl/Map_Generator_Report_Test_-_PF?Location_Usages_for_Location!WID=46db411c4a5245fbb39834d8b2cba049', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
    
        const data = await reportResponse.json();
    
        return data.Report_Entry;
    }

    async componentDidMount() {
        const locations = await this.getLocations();
        this.setState({ locations });
    }
    
  render() {

    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 33.650066,
            lng: -117.693100 
          }}
        >
            {this.state.locations.map((location) => (
                <Location
                    name={location.name}
                    lat = {location.lat}
                    lng={location.long}
                    key={location.name}
                />
                ))}
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJammR5yIOiUVS90JxoMEzTEScO4nF9g8'
})(MapGenerator);


/*


function MapGenerator () {

    const [mapData, setMapData] = React.useState('');

    const getLocations = async () => {
        const reportResponse = await fetch('https://api.workday.com/raas/pfarias-impl/Map_Generator_Report_Test_-_PF?Location_Usages_for_Location!WID=46db411c4a5245fbb39834d8b2cba049', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
    
        const data = await reportResponse.json();
        
        
        let newArr = []; 

        for (const [key, value] of Object.entries(data)) { 
           newArr.push([`${key}`, `${value}`]); 
        } 

    
        setMapData(newArr);
    }

    React.useEffect(() => {
      getLocations();
    }, []);



    return (
      <React.Fragment>
        <Map
          google={window.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 33.650066,
            lng: -117.693100 
          }}
        >
        </Map>
      
        {mapData.map(location => (
                <Location
                    name={location.name}
                    lat = {location.lat}
                    lng={location.long}
                    key={location.name}
                />
                ))}
      </React.Fragment>
    );
  }




  // src/App.js
import * as React from "react";
import { Map, GoogleApiWrapper, InfoWindow,  Marker  } from 'google-maps-react';
import { getAccessToken } from '../../wcp/WcpTokenStore';
import {Box, BoxProps} from '@workday/canvas-kit-react/layout';


import Form from "./Form";

import styled from '@emotion/styled';
import EmailContactForm from "./Email";

const mapStyles = {
    width: '60%',
    height: '60%',
  };


  const CardLayout = styled("div") ({
    paddingTop: "50px",
    paddingLeft: "500px"
    });


function groupBy(objectArray, lat, long) {
  const groupedByLocations = objectArray.reduce((acc, obj) => {
     const key = obj[lat] + ',' + obj[long];
     if (!acc[key]) {
        acc[key] = [];
     }
     // Add object to list for given key's value
     acc[key].push(obj);
     return acc;
  }, {});

  // {lat,long: Array of students, lat,long: array of students}
  console.log(groupedByLocations);

  const locations = Object.keys(groupedByLocations);
  //['lat,long', 'lat,long']

  console.log(locations);

  const groupedWithTotals = [];
  
  // {lat, long, workerWIDs, workerNames, workerTotal}
  locations.forEach(key => {
     groupedWithTotals.push({
      lat: groupedByLocations[key][0].lat,
      long: groupedByLocations[key][0].long,
      //workerWIDs: groupedByLocations[key].map(worker => worker.wid),
      //workerNames: groupedByLocations[key].map(worker => worker.name),
      workerEmails: groupedByLocations[key].map(worker => worker.email),
      workerPhones: groupedByLocations[key].map(worker => worker.phone),
      workerTotal: groupedByLocations[key].length
    })
  
  } );

  console.log(groupedWithTotals);

  return groupedWithTotals;
}


function MapGenerator () {

    const [selectedElement, setSelectedElement] = React.useState(null);
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [showInfoWindow] = React.useState(true);
    const [mapData, setMapData] = React.useState([]); // for markers
    const [workerWIDsList, setWIDs] = React.useState([]); // for form
    const [workerNamesList, setNames] = React.useState([]); // for form
    const [locationName, setLocationName] = React.useState(''); // for form
    const [locationWID, setLocationWID] = React.useState(''); // for form

     // use for info window logic
    const[isLocation, setIsLocation] = React.useState(false);
  

    const [locationsCompany, setCompanyLocations] = React.useState([]); // for markers

    //const [workerEmailsList, setEmails] = React.useState([]);
    //const [selectedLocation, setSelectedLocation] = React.useState({});

    const getLocations = async () => {
        const reportResponse = await fetch('https://api.workday.com/raas/lmcneil/Worker_Locations_Report', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
    
        const data = await reportResponse.json();

        console.log(data);

        const markerGroup = groupBy(data.Report_Entry, 'lat', 'long');
        
        setMapData(markerGroup);
    }


    React.useEffect(() => {
      getLocations();
    }, []);


    const getLocationsCompany = async () => {
      const wqlResponse = await fetch('https://api.workday.com/wql/v1/data?query=SELECT locationName, workdayID, latitude, longitude FROM locations (locationUsagesForLocation = (46db411c4a5245fbb39834d8b2cba049))', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAccessToken()}`
          }
      });
  
      const data = await wqlResponse.json();

      console.log(data);

      setCompanyLocations(data.data);
  }


  React.useEffect(() => {
    getLocationsCompany();
  }, []);

 
  // for company locations
  const mapRef = React.useRef();

    return (
      <React.Fragment>
          <EmailContactForm emails={workerEmailsList} />
        <CardLayout>
          <Map
                  id="map"
                  ref={mapRef}
                  google={window.google}
                  zoom={10}
                  style={mapStyles}
                  initialCenter={{
                    lat: 33, 
                    lng: -117
                  }}
                  
              >
              
              { locationsCompany.map( key => {
                 
                return (
                  <Marker
                        key={key.locationName}
                        title={key.locationName}
                        label={(key.locationName).toString()}
                        position={{lat: key.latitude,
                        lng: key.longitude}}
                        onClick={(props, marker) => {
                          setSelectedElement(key);
                          setActiveMarker(marker);
                          // only location to form if there isnt a location on the text input already
                          if(locationName === '') setLocationName(key.locationName); // send and show
                          if(locationWID === '') setLocationWID(key.workdayID); // send and show
                        }
                      }  
                      />



                )
              
              }) }
              


              {mapData.map( location => {
                return (
                  <Marker
                        key={location.lat + ',' + location.long}
                        title={location.lat + ',' + location.long}
                        label={(location.workerTotal).toString()}
                        position={{lat: location.lat,
                        lng: location.long}}
                        onClick={(props, marker) => {
                          setSelectedElement(location);
                          setIsLocation(true);
                          setActiveMarker(marker);
                          // append to arr every time a different marker is clicked if not already in arr
                          if(!workerWIDsList.includes(location.workerWIDs)) setWIDs(workerWIDsList => [...workerWIDsList, location.workerWIDs]); // send but not show
                        
                          if(!workerNamesList.includes(location.workerNames)) setNames(workersNamesList => [...workersNamesList, location.workerNames]); // send and show

                         // if(!workerEmailsList.includes(location.workerEmails)) setEmails(workerEmailsList => [...workerEmailsList, location.workerEmails]); 
                         
                        }
                      }  
                      />



                )
              
              }) }
              

            {selectedElement ? (
                <InfoWindow
                        visible={showInfoWindow}
                        marker={activeMarker}
                        onCloseClick={() => {
                        setSelectedElement(null);
                        }
                      }
                    onClose = {() => { setNames([])  ; setWIDs([]) ; setLocationWID('') ; setLocationName('')}}
                      >
                        <div>
                          <h3>{ isLocation === true ? 'Location: ' + selectedElement.locationName : 'Total Workers: ' + selectedElement.workerTotal}</h3> 
                  
                        </div>
                      
                      </InfoWindow>
                    ) : null}

              </Map>

              </CardLayout>
      </React.Fragment>
  
    );
  }



    
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJammR5yIOiUVS90JxoMEzTEScO4nF9g8'
})(MapGenerator);




*/











