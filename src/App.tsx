import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import InputContainer from './InputContainer';
import useKaKaoMap from './useKaKaoMap';



const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20;
  /* background: red; */

  position: absolute;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const KaKaoMap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;

`;

function App() {
  const [text, setText] = useState('');
  const [positions, setPositions] = useState([
    {
        title: '동일로 ', 
        latlng: new window.kakao.maps.LatLng(33.450705, 126.570677)
    },
    {
        title: '생태연못', 
        latlng: new window.kakao.maps.LatLng(33.450936, 126.569477)
    },
    {
        title: '텃밭', 
        latlng: new window.kakao.maps.LatLng(33.450879, 126.569940)
    },
    {
        title: '근린공원',
        latlng: new window.kakao.maps.LatLng(33.451393, 126.570738)
    }
  ]);
  const mapRef = useKaKaoMap(positions);


  const handleClickOkButton = () => {
    const slicedText = text.split("\n");
    const geocoder = new window.kakao.maps.services.Geocoder();

    slicedText.forEach( addr => {
      geocoder.addressSearch(addr, (result: any, status: any)=> {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          setPositions( pos => pos.concat({
            title: addr,
            latlng: coords,
          }));
        }
      });
    });

    // console.log(slicedText);
    setText('');
  }
  const handleClickDeleteButton = () => {
    setPositions([]);
  }
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }
  
  return (
    <StyledApp>
      <KaKaoMap
        className="map"
        ref={mapRef}
      />
      <InputContainer
        onChangeTextArea={handleChangeTextArea}
        onClickDeleButton={handleClickDeleteButton}
        onClickSendButton={handleClickOkButton}
        text={text}
      />
  
    </StyledApp>
  );
}

export default React.memo(App);
