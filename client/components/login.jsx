import React from 'react';
import {useNavigate, Link} from "react-router-dom";

const Login = (()=>{

    let navigate = useNavigate();
    const signUp = () =>{
        // Link(declarative) and useNavgate(imperative) achieves the same purpose.
        // It's either declaraitive focuses on what to execute, defines program logic, but not detailed control flow
        // or imperative - focuses on how to execute, defines control flow as statements that change a program state.
        let path = '/signup'
        navigate(path);
    }

    return(
        <div>
            <h1>Don't have an account?</h1>
            <button onClick={signUp}>Click here to create an account</button>
            {/* <Link to="/signup">Click here to create an account</Link> */}
        </div>
    )

})

export default Login