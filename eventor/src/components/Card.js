import React from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { deleteTask } from '../redux/actions';

const CardContainer = styled.div`
    width: 100%; 
    height: 175px;   
`;

const Heading = styled.h4`
    height: 30px;
    padding: 10px;
    padding-top: 3px;
`;

const Body = styled.div`
    height: 132px;
    margin: 5px;
    text-align: left;
    padding-left: 10px;
    padding-top: 5px;
    background-color: lightgray;
    position: relative;
`;

const Tag = styled.div`
    background-color: rgb(0,80,115); 
    font-size: small;
    color: white;
    padding: 5px;
    border-radius: 25px;
    display: inline-block;
    position: absolute;
    bottom: 5%;
`;


const Card = (props) => {
    return (
        <CardContainer>
            <Heading className="text-left">
                {props.heading}
                <DropdownButton
                    drop="right"
                    className="float-right"
                    size="sm"
                    variant="dark"
                    title=""
                >
                    <Dropdown.Item
                        isSelected
                        as="button"
                        onClick={() => { console.log("hello world") }}
                    >
                        Edit
                  </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={props.delete}>Delete</Dropdown.Item>
                </DropdownButton>
            </Heading>
            <Body>
                <div>{props.body}</div>
                <Tag>{props.event}</Tag>
            </Body>
        </CardContainer>
    );
}

export default Card; 