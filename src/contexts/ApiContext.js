import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'src/api/axios';
// import { getProkerReq } from 'src/api/proker';
import { useAuthentication } from './AuthContext';
import { useRef } from 'react';
// import { useConnection } from './ConnectionContext';
// import { isAuthenticated } from 'src/api/auth';

const ApiContext = createContext();

// const initialState = {
//   isFetching: false
// };

export const ApiProvider = ({ children }) => {
    const { authenticated, currentUser, currentKelompok } = useAuthentication();
    // const datajson = JSON.stringify(currentUser);
    console.log('user', currentUser);
    console.log('kelompok', currentKelompok);
    // console.log("_id", datajson);
    const prevAuthRef = useRef(authenticated);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [prokers, setProkers] = useState();
    const [divisi, setDivisi] = useState();
    const [media, setMedia] = useState();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNewData, setHasNewData] = useState(false);

    const id = '63734f0c41bfdb7ca8fbe819';
    // const kelompok = '10';
    // const userId = '63734e7741bfdb7ca8fbe817';
    const kel = localStorage.getItem("kel");
    const mhs = JSON.parse(localStorage.getItem("mhs"));

    // console.log(current)
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token && authenticated) {
            setIsLoading(true);
            setIsFetching(true);
            console.log('from fetchAll', isLoading);

            const [prokerResult, divisiResult, mediaResult, userResult] =
                await Promise.all([
                    axios.get(`/proker/${id}`),
                    axios.get(`/divisi`),
                    axios.get(`/media/${kel}`),
                    axios.get(`/mahasiswa/details/${mhs}`)
                ]);

            console.log('result => ', userResult);
            setProkers(prokerResult);
            setDivisi(divisiResult);
            setMedia(mediaResult);
            setUser(userResult);
            setIsFetching(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (prevAuthRef.current !== authenticated) {
            fetchData();
        }

        prevAuthRef.current = authenticated;
    }, [authenticated]);

    useEffect(() => {
        if (hasNewData) {
            fetchData();
        }
    }, [hasNewData]);

    useEffect(() => {
        fetchData();
    }, []);

    console.log(prokers);

    const addNewData = () => {
        setHasNewData(true);
    };

    return (
        <ApiContext.Provider
            value={{
                prokers,
                isFetching,
                divisi,
                media,
                user,
                isLoading,
                addNewData
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;

export function useAPI() {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
}
