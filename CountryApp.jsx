import { useEffect, useState } from 'react';
import CountryList from "./CountryList"
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import Button from '@mui/material/Button';
import axios from 'axios';
import { saveEntitiesUnsuccessful } from './Actions';
import isNetworkError from 'is-network-error';
export default function CountryApp(){
    //const [countries, setCountries] = useState(() => {
        //const savedCountries = localStorage.getItem('countries');
        //console.log(savedCountries)
      //  return savedCountries.length > 0 ? JSON.parse(savedCountries) : countriesList
    //})
    const [countries, setCountries] = useState([]);
    const dispatch = useDispatch();
     const unsaved = useSelector(state => state.unsaved);
    useEffect(() => {
        const savedCountries = JSON.parse(localStorage.getItem('countries')) || [];
        //setCountries(savedCountries);
        localStorage.setItem('countries', JSON.stringify(countries));

        fetch('http://localhost:8081/')
        .then(res => {return res.json()})
        .then(data => setCountries(data))
        .catch(err => {
            //if(isNetworkError(err))
              //  alert("Network");
            if(err.message.includes("NetworkError"))
                alert("Network Error");
            else
                alert("Server Error");
            console.log(err.message);
            dispatch(saveEntitiesUnsuccessful());})
        
        //axios.get('http://localhost:8081/')
        //.then(res => {console.log(res.data); setCountries(res.data);} )
        //.catch(err => {console.log(err);
          //  dispatch(saveEntitiesUnsuccessful());})
    }, [countries, dispatch]);
  
    const [editCountry, setEditCountry] = useState({
        id: 0,
        name: "",
        continent: "",
        capital: "",
        population: 0,
        checked: false
    })
    useEffect(() => {
        localStorage.setItem('countries', JSON.stringify(countries));
    }, [countries]);

    // useEffect(() => {
    //     const socket = socketIOClient('http://localhost:8080');
    
    //     // Listen for initial entities
    //     socket.on('initialEntities', (initialEntities) => {
    //       setCountries(initialEntities);
    //     });
    
    //     // Listen for new entities
    //     socket.on('newEntity', (newEntity) => {
    //       setCountries((prevEntities) => [...prevEntities, newEntity]);
    //     });
    
    //     return () => {
    //       socket.disconnect();
    //     };
    //   }, []);


    const deleteCountry = (index) =>
    {
        //setCountries(oldd => oldd.filter(i => i.id != index))
        axios.delete(`http://localhost:8081/del/${index}`)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }
    const editCountryAction = (id, name, continent, capital, population, checked) => {
        console.log(id)
        setEditCountry({
            id: id,
            name: name,
            continent: continent,
            capital: capital,
            population: population,
            checked: checked
        })
    }
    const addCountry = (objj) => {
        console.log(objj);
        axios.post('http://localhost:8081/add',  {...objj})
        .then(res => {alert(res.status);})
        .catch(err => {console.log(err);
            localStorage.setItem('countries', JSON.stringify([...countries, objj]));
            dispatch(saveEntitiesUnsuccessful());})
    };
  
    const updateCountry = (objj) => {
        //setCountries(old => {
          //  return old.map((c) => {
            //    if(c.id === objj.id)
              //      return objj
               // else
                 //   return c;
            //})
        //})
        axios.put(`http://localhost:8081/upd/${objj.id}`, objj)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }

    const exportJSON = () => {
        const JSONData = JSON.stringify(countries);
        const blob = new Blob([JSONData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const checkCountry = (id, checkk) => {
        axios.get(`http://localhost:8081/${id}`)
        .then(res => {alert(res.data[0].id)})
        .catch(err => console.log(err))
        setCountries(old => {
            return old.map(c => {
                if(c.id === id)
                    return {...c, checked: checkk};
                else
                    return c;
            })
        })
    }

    const deleteSelected = () => {
        setCountries(old => old.filter(c => c.checked === false));
    }
    
    return (
        <>
             <CountryList items={countries} action={deleteCountry} chec={checkCountry} upd={editCountryAction}/>
             <Form addAction={addCountry} ed={editCountry} updateAction={updateCountry}/>
             <Button variant="outlined" color='primary' onClick={exportJSON}>Export JSON</Button>
             <Button variant="contained" color='error' onClick={deleteSelected}>DELETE SELECTED</Button>
        </>
              
    )
}
