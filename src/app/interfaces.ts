export interface LoginForm {
    email: string;
    password: string;
}

export interface User{
    id: number; 
    role_id: number; 
    first_name: string; 
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Measurement{
    id: number;
    station: string;
    edited: number;
    date: Date;
    time: string;
    temp: number;
    dewp: number;
    stp: number;
    slp: number;
    visib: number;
    wdsp: number;
    prcp: number;
    sndp: number;
    frshtt: string;
    cldc: number;
    winddir: number;
}

export interface TemperatureInt{
    station: string;
    date: Date;
    time: string;
    country: string;
    longitude: number;
    latitude: number;
    elevation: number;
    temp: number;
    dewp: number;
    stp: number;
    slp: number;
    visib: number;
    wdsp: number;
    prcp: number;
    sndp: number;
    frshtt: string;
    cldc: number;
    winddir: number;
}

export interface Station{
    name: string;
    longitude: number;
    latitude: number;
    country: string;
}
