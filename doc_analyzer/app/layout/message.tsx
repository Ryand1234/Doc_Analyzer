"use client";
import React from 'react';
import { Info } from '../interface/chat-interface';
import './message.css'
export default function Message({ user, hide, message }: Info) {
    const isHTML = /<[a-z][\s\S]*>/i.test(message);

    return (
        <div
            style={{
                margin: '10px',
                padding: '8px',
                // width: '90vw',
                // background: 'black',
                color: 'black',
                display: (!hide) ? 'block' : 'none',
                textAlign: 'justify',
                lineHeight: '2em'
            }}
            className={`message`}
            id={`${user.toLowerCase()}`}
        >
            {/* {isHTML ? <span
                id={`${user.toLowerCase()}-response`}
                style={{
                    textAlign: 'justify',
                }} dangerouslySetInnerHTML={{ __html: message }}></span> : 
                (<span id={`${user.toLowerCase()}-response`}
                    style={{
                        textAlign: 'justify',
                    }} >{message}</span>)} */}
            <span id={`${user.toLowerCase()}-response`}
                style={{
                    textAlign: 'justify',
                }} >{message}</span>
        </div>
    )
};