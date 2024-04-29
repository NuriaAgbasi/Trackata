import { useCallback, useEffect, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

import { useEventCallback, useEventListener } from 'usehooks-ts'

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        'local-storage': CustomEvent
    }
    //this is for adding a new event to the page it basically says oh im adding the localstorage event and its a custom hook 
}
//this line declares a custom type named 'UseLocalStorageOptions' that accepts values with diffrent types of data because of the <T> tag.
type UseLocalStorageOptions<T> = {
    //serializer takes the orginal form of the variable and converts it into a form suitable for storing.Therefore in this it is practically saying to turn the value of t to a string 
    serializer?: (value: T) => string
    //deserializer takes the value converted by the serializer and converts it into the value that it was before. This line is vbasically saying take the string and transform it back to the orignal value 
    deserializer?: (value: string) => T
    //initializewithvalue this is basically saying if the value is true i want to start using the value right away if it is false i want to keep it till later
    initializeWithValue?: boolean
}
//this is checking whether the code is being run on the server or on a browser. it checks whether typeof window is undefined or not 
const IS_SERVER = typeof window === 'undefined'

export default function useLocalStorage<T>(
    //this basiclly says that the default export is uselocalstorage and it is accepting any variable of any type making the code flexible
    key: string,
    //it represents the key under which the data will be stored in the local storage 
    initialValue: T | (() => T),
    //it has an initialvalue of type t or any other funct6ion that return the value of t 
    options: UseLocalStorageOptions<T> = {},
 //it takes in options
//this line defines a tuple(it is basically like a list but it cannt be changed once created), the first one in the tuple represents a stored of that has been
//in the localstorage and the second updates the state depending on the type of variable t is 
): [T, Dispatch<SetStateAction<T>>] {
    //it uses object destructuring by saying if the initializewithvalue that is 
    //defiend in the options object is undefined default is as true
    const { initializeWithValue = true } = options
//it declares a constant with the name serializer ~ it uses the usecallback(it remember what was programmed before) to take the value of type T and returns it to a string.
    const serializer = useCallback < (value: T) => string > (
        //it takes a parameter named value of the type T
        value => {
            //if the options.serializer function is true it returns the options.serializer with the value
            if (options.serializer) {
                return options.serializer(value)
            }
            //if not it serilizes the value by using the json stringify(converting the value to a json string)
            return JSON.stringify(value)
        },
        //this allows it to run only when the options object changes
        [options],
  )
//it declares a constant named sesrializer and uses the usecallback that accepts a value with the type of string and returns it to the type of t
    const deserializer = useCallback < (value: string) => T > (
        //it accepts the value with a type of string 
        value => {
            //if the options.desrializer is true it returns options.deserializer with the value
            if (options.deserializer) {
                return options.deserializer(value)
            }
            //if the value is undefined it return the undefined the functions returns undefined as type T
            if (value === 'undefined') {
                return undefined as unknown as T
            }
            //it declares a constant variable named defaultvalue
            const defaultValue =
            //it checks if initialvalue is an instance of a function. If initialvalue is a function it calls the initialvalue()
            //function and assigns the value to defaultvalue. if not it assigns the value of initialvalue to defaultvalue
                initialValue instanceof Function ? initialValue() : initialValue
//it declares a variable parsed with the type unknown 
            let parsed: unknown
            //it is a try and catch block and attemps to parse the value if it is succfully done it 
            //assigns the value to the variable parsed, if not, it catches it and shoots a console error
            //and return the defaultvalue
            try {
                parsed = JSON.parse(value)
            } catch (error) {
                console.error('Error parsing JSON:', error)
                return defaultValue // Return initialValue if parsing fails
            }
            //if the code works it returns the parsed value as type t
            return parsed as T
        },
        //this only works if the options and initialvalue is changed
        [options, initialValue],
  )

    // Get from local storage then
    // parse stored json or return initialValue
    //it defines a constant named readvalue it uses the usecallback hook and opens an arrow function that doesn't accept any 
    //values but returns the value of t
    const readValue = useCallback((): T => {
        //it defines a constant names initialvaluetouse, it says if initialvalue is an instance of a function it runs the initialvalue function
        //and assigns the value to the variable if not ut assigns the value of initialvalue to the variable
        const initialValueToUse =
            initialValue instanceof Function ? initialValue() : initialValue

        // Prevent build error "window is undefined" but keeps working
        //if IS_SERVER is true it returns the value of initialvaluetouse
        if (IS_SERVER) {
            return initialValueToUse
        }
        //it gets opens a try and catch statement and makes the constant with the name raw and it gets the key
        //it returns derualizer(raw) if the raw is true and initalvaluetouse if its not
        try {
            const raw = window.localStorage.getItem(key)
            return raw ? deserializer(raw) : initialValueToUse
            //it catches an error it consolewarns and returns the initialvaluetouse
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return initialValueToUse
        }
        //this only works if the initialvalue, key and deserialzer changes
    }, [initialValue, key, deserializer])

    const [storedValue, setStoredValue] = useState(() => {
        if (initializeWithValue) {
            return readValue()
        }
        return initialValue instanceof Function ? initialValue() : initialValue
    })

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue: Dispatch<SetStateAction<T>> = useEventCallback(value => {
        // Prevent build error "window is undefined" but keeps working
        if (IS_SERVER) {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client`,
            )
        }

        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(readValue()) : value

            // Save to local storage
            window.localStorage.setItem(key, serializer(newValue))

            // Save state
            setStoredValue(newValue)

            // We dispatch a custom event so every similar useLocalStorage hook is notified
            window.dispatchEvent(new StorageEvent('local-storage', { key }))
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }
    })

    useEffect(() => {
        setStoredValue(readValue())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
                return
            }
            setStoredValue(readValue())
        },
        [key, readValue],
    )

    // this only works for other documents, not the current one
    useEventListener('storage', handleStorageChange)

    // this is a custom event, triggered in writeValueToLocalStorage
    // See: useLocalStorage()
    useEventListener('local-storage', handleStorageChange)

    return [storedValue, setValue]
}