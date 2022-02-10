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
  const [positions, setPositions] = useState<string[]>([]);
  const mapRef = useKaKaoMap(positions);


  const handleClickOkButton = async () => {
    const slicedText = Array.from( new Set(text.split("\n")) );
    const processedText: string[] = [];

    for(const t of slicedText) {
      processedText.push(t);
    }
    setPositions([...positions, ...processedText]);

    
    setText('');
  }

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
