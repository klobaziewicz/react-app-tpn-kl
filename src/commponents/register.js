import React, { useState, useEffect, Component } from 'react';
import { useForm } from "react-hook-form";
import Footer from './footer';

function Register() {
    let [count, setCount] = useState({login: '', password: '', mail: ''});
    const { register, handleSubmit } = useForm();

    const handleInfo = (data) => {
        zmiana(data.login,data.password,data.mail)
        //console.log('login: '+data.login+' hasło: '+data.password+ '  mail: '+data.mail);
    }
    let zmiana = async (a,b,c) => {
        setCount(count = {login: a, password: b, mail: c})
        
        try {
            //pobranie loginów, hasł i maili
            
            const res = await fetch("https://stormy-oasis-25600.herokuapp.com/select_login")
            const jsonData2 = await res.json()
            console.log(jsonData2)
            let check=true
            if(!c.includes('@'))
                check=false
            for(let i=0;i<jsonData2.length;i++){
                if(jsonData2[i].login==a||jsonData2[i].mail==c)
                    check=false
            }
            if(check){
                console.log('nie powtarza się i wartości poprawne');
                const response = await fetch("https://stormy-oasis-25600.herokuapp.com/register/?login="+a+"&password="+b+"&mail="+c)
                const jsonData1 = await response.json()
            }
            else
                console.log('login/mail powtarza się lub mail jest niepoprawny');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div className='container_r'>
                <h1>
                    Zarejestruj się
                </h1>
                <form className='form3' onSubmit={handleSubmit(handleInfo)}>
                    <label>
                        Wpisz dane:
                    </label> <br/> <br/>
                    <input placeholder="login" type="text" name="login" {...register('login')} required /><br></br>
                    <input placeholder="hasło" type="password" name="password" {...register('password')} required /><br></br>
                    <input placeholder="mail" type="text" name="mail" {...register('mail')} required /><br></br>
                    <input type="submit" className='btn2' value="Zarejestruj się" />
                </form>
            </div>
            <Footer/>
        </div>
    );
}


export default Register;