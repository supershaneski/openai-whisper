import React from 'react'

// Reference: https://stackoverflow.com/questions/58844583/how-to-implement-fifo-queue-with-reactjsredux
function immutablePush(arr, newEntry) {
    return [ ...arr, newEntry ]
}

function immutableShift(arr) {
    return arr.slice(1)
}

export function useStorage() {

    const storage = React.useRef([])

    const storagePush = (item) => {
        storage.current = immutablePush(storage.current, item)
    }

    const storagePop = () => {
        const item = storage.current[0]
        storage.current = immutableShift(storage.current)
        return item
    }
    
    return [ storagePush, storagePop ]

}