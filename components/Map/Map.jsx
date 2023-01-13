import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import style from '../../styles/Home.module.css';
import {MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker} from 'react-leaflet';
import { Typography }from '../Typography';
import styled from 'styled-components';
import { expoLine } from '../../data/expo.js';       
import { Spacer } from '../Spacer';

export default function Map() {
       const StyledPopup = styled(Popup)`
              border-radius: 0;

              .leaflet-popup-content-wrapper {
                     border-radius: 7.5px;
                     background-color: #FEF9F1;
                     min-width: 100px;
                     min-height: 50px;
                     margin: 0;
                     padding: 2em;
              }

              .leaflet-popup-tip-container {
                     visibility: hidden;
              }

              a.leaflet-popup-close-button{
                     background-color: #1A99c5;
                     border-radius: 50%;
                     height: 25px;
                     width: 25px;
                     margin: 0.5em 0.5em 0.7em 5em;
                     text-align: center;
                     color: #FEF9F1;
              }

              .leaflet-popup-content p {
                     margin:0;
              }
       `       
       const toKingGeorgePositions = [];
       const toProductionWayPositions = [[49.204943945073374, -122.90607708574763]];
       for(let i = 0; i < expoLine.length; i++){
              if (i < expoLine.length-4){
                  toKingGeorgePositions.push(expoLine[i].position);   
              } else {
                     toProductionWayPositions.push(expoLine[i].position);
              }   
       };       
       const expoLineOption = {color: '#1A99c5'};
       const center = [49.27859, -123.10999];
       const stationIcon = L.icon({
              iconUrl: '/stationIcon.svg',
              iconSize: [35, 35],
       });
       

       return(
              <MapContainer 
                     className = {style.map} 
                     center = {center} 
                     zoom = {15} 
                     scrollWheelZoom = {true}>
                     <TileLayer 
                            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                            url={`https://api.mapbox.com/styles/v1/mcafik/clct005sv000y14pu3l66oyz8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWNhZmlrIiwiYSI6ImNsY3R2MDl3OTAyaTUzcHM1ZnB4dTU1b2cifQ.5hXrTook2Cv9YHRyyiaipw`}        
                     />       
                     {expoLine.map((expoStation) => (
                            <Marker 
                                   key ={expoStation.station}
                                   position = {expoStation.position} 
                                   icon = {stationIcon}>
                                   <StyledPopup>
                                          <Typography 
                                                 size = '1.2rem' 
                                                 weight = '500' 
                                                 textAlign = 'center' 
                                                 text = {expoStation.station}
                                          />
                                          <Typography 
                                                 size = '1.2rem' 
                                                 weight = '500' 
                                                 textAlign = 'center' 
                                                 text = 'Station'
                                          />
                                          <Spacer size='15' />
                                          <Typography 
                                                 textAlign = 'center' 
                                                 text = {expoStation.line}
                                          />
                                   </StyledPopup>
                            </Marker>
                     ))}
                     <Polyline 
                            pathOptions = {expoLineOption} 
                            positions = {toKingGeorgePositions}
                     />
                     <Polyline 
                            pathOptions = {expoLineOption} 
                            positions = {toProductionWayPositions}
                     />
              </MapContainer>
       )
}