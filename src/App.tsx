import React, { useCallback, useMemo } from 'react';
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
  const [positions, setPositions] = useState<Marker[]>([]);
  const mapRef = useKaKaoMap(positions);


  const handleClickOkButton = useCallback(() => {
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
  },[text]);

  const handleClickDeleteButton = useCallback(() => {
    setPositions([]);
  }, []);
  const handleChangeTextArea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  },[]);
  
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
