import React, {useState} from 'react';
import {Vector3} from 'three';

type DotProps = {
    position: Vector3
    name: string
}

const Dot = (props: DotProps) => {
    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false)

    return (
        <mesh position={props.position}>
            onClick={() => setClick(!clicked)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            <boxGeometry />
            <meshBasicMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

export default Dot