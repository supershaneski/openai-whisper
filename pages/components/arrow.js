import React from 'react'

export default function Arrow(props) {
    return (
        <svg viewBox="0 0 24 24">
            <path fill={props.color || '#00D8FF'} d="M8 5v14l11-7z" />
        </svg>
    )
}