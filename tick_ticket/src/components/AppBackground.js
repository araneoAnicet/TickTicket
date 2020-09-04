import React from 'react'
import BackgroundImg from '../Background.png';


function AppBackground(props) {
    return (
        <section style={{backgroundImage: `url(${BackgroundImg})`, position: 'absolute', height: '110%', width: '100%', backgroundSize: 'cover'}}>
            {props.children}
        </section>
    );
}

export default AppBackground;