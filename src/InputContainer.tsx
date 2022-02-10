import React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import {BiSend} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';

interface InputContainerProps {
    onClickSendButton: () => void;
    onClickDeleButton: () => void;
    onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    text: string;
}

const InputContainerBlock = styled.div`
    width: 100%;
    height: 30px;
    position: absolute;
    z-index: 2;
    bottom: 0;
    margin-bottom: 30px;
    
    display: flex;
    justify-content: center;
`

const InputTextArea = styled.textarea`
    width: 60%;
    height: 30px;

    border-radius: 50px;
    border-style: hidden;
    padding-left: 2%;
    padding-right: 2%;

    resize: none;
    vertical-align: middle;
    max-lines: 1;
`;
const OkButton = styled.button`
    margin-left: 10px;
    /* width: 30px; */
    height: 100%;
    border-radius: 0;
    border-style: none;
    background-color: white;
    /* opacity:; */

    &:hover {
        background-color: #ececec;
    }
    &:active {
        background-color: #8f8f8f;
    }

`;
const DeleteButton = styled.button`
    margin-left: 10px;
    /* width: 30px; */
    height: 100%;
    border-radius: 0;
    border-style: none;
    background-color: white;
    /* opacity:; */

    &:hover {
        background-color: #ececec;
    }
    &:active {
        background-color: #8f8f8f;
    }
`;


const InputContainer = ({
    onClickDeleButton, 
    onClickSendButton, 
    onChangeTextArea,
    text
}:InputContainerProps) => {
    return (
        <InputContainerBlock>
            <InputTextArea 
                value={text}
                onChange={onChangeTextArea}
                autoFocus
            />
            <OkButton onClick={onClickSendButton}>
                <BiSend size={25}/>
            </OkButton>
            <DeleteButton onClick={onClickDeleButton}>
                <MdDelete size={25} />
            </DeleteButton>
        </InputContainerBlock>
    );
}

export default React.memo(InputContainer);

