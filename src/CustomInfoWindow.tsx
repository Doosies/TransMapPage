import React, {useState} from 'react';
import styled from 'styled-components';

interface CustomInfoWindowProps {
    name: string;
    lat: number;
    lng: number;
}

const CustomInfoWindowBlock = styled.div`
    padding: 5px;
`
const CustomInfoWindow = (props: CustomInfoWindowProps) => {
    return (
        <CustomInfoWindowBlock>
            {props.name}
        </CustomInfoWindowBlock>
    );
}

export default CustomInfoWindow;