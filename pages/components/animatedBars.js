import React from 'react'
import classes from './animatedBars.module.css'

export default function AnimatedBars(props) {

    const [bars, setBars] = React.useState(Array(8).fill(1))
    
    React.useEffect(() => {

        let timer = null

        if(props.start) {
            timer = setInterval(() => {
                setBars((prev) => {
                    let tmp = prev.map((v, i) => 1 + Math.round((1 + (16 * Math.sin((i/7)*Math.PI))) * Math.random()))
                    return tmp
                })
            }, 100)
        } else {
            setBars(Array(8).fill(1))
        }

        return () => {
            clearInterval(timer)
        }

    }, [props.start])

    return (
        <div className={classes.container}>
        {
            bars.map((item, index) => {
                return (
                    <div 
                    className={classes.bar} 
                    key={index}
                    style={{
                        height: `${item}px`,
                    }}
                    />
                )
            })
        }
        </div>
    )
}