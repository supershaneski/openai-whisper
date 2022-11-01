import React from 'react'

export default function Progress({ size, lineWidth, displayOff, value, lineColor, textColor, backgroundColor, progressColor }) {

    let p1 = value < 25 ? 90 - Math.round((value / 25)*90) : 0
    let p2 = value < 25 ? 90 : value >= 50 ? 0 : 90 - Math.round(((value - 25) / 25)*90)
    let p3 = value < 50 ? 90 : value >= 75 ? 0 : 90 - Math.round(((value - 50) / 25)*90)
    let p4 = value < 75 ? 90 : value >= 100 ? 0 : 90 - Math.round(((value - 75) / 25)*90)

    return (
        <>
            <div className="progress">
                <div className="inner">
                    <div className="segment" style={{
                        transform: `rotate(270deg) skew(${p1}deg)`, //skew 90 - 0
                    }} />
                    <div className="segment" style={{
                        transform: `rotate(0deg) skew(${p2}deg)`,
                    }} />
                    <div className="segment" style={{
                        transform: `rotate(90deg) skew(${p3}deg)`,
                    }} />
                    <div className="segment" style={{
                        transform: `rotate(180deg) skew(${p4}deg)`,
                    }} />
                    <div className="display">
                        {
                            !displayOff && <div className="text">{ value }<span>%</span></div>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
            .progress {
                position: relative;
                width: ${size}px;
                height: ${size}px;
                box-sizing: border-box;
            }
            .inner {
                background-color: ${lineColor};
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
            }
            .display {
                background-color: ${backgroundColor};
                border-radius: 50%;
                position: absolute;
                left: ${lineWidth}px;
                top: ${lineWidth}px;
                width: calc(100% - ${2 * lineWidth}px);
                height: calc(100% - ${2 * lineWidth}px);
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .text {
                font-family: helvetica, arial, sans-serif;
                font-size: 1.2em;
                font-weight: 600;
                color: ${textColor};
            }
            .text span {
                font-size: 0.7em;
                font-weight: 400;
            }
            .segment {
                background-color: ${progressColor};
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100vw;
                height: 100vw;
                transform-origin: 0 0;
                z-index: 1;
            }
            `}</style>
        </>
    )
}

Progress.defaultProps = {
    size: 100,
    lineWidth: 10,
    displayOff: false,
    textColor: '#FFF',
    backgroundColor: '#333',
    progressColor: '#FFD167',
    lineColor: '#555',
    value: 0,
}