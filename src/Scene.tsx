import React, {Suspense, useMemo, useRef, useState} from 'react';
import {DbCurveMember, DbPointSupport, DbStructuralPoint} from "./DatabaseInterface";
import './App.css'
import {Canvas, useFrame} from '@react-three/fiber';
import {Color, TextureLoader, Vector2, Vector3} from 'three';
import Dot from './renderer/Dot';
import Line from "./renderer/Line";
import CameraControls from "./renderer/CameraControls";
import {HoverImageShader} from "./renderer/Shader";
import Modak from "./Modak.json";

type TextProps = {
    position: Vector3
    color: string
    fontSize: number
    opacity: number
    text: string
}

//function Text({ children, position, opacity, color = 'black', fontSize = 35 }) {

const Text = (props: TextProps) => {
    /*
        const canvas = useMemo(() => {
            const fontface = "Arial";
            const fontsize = props.fontSize;
            const borderThickness =  4;

            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            context.textBaseline = 'middle'
            context.font = `bold ${props.fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`

            const metrics = context.measureText(props.children);
            const textWidth = metrics.width;

            context.lineWidth = borderThickness;

            context.fillStyle = props.color
            context.fillText( props.children, textWidth - (textWidth*0.8), fontsize);
            return canvas
        }, [children])

        <canvasTexture attach="map" image={canvas} />
    */

    return (
        <sprite scale={[5, 3, 3]} position={props.position}>
            <spriteMaterial attach="material" transparent alphaTest={0.5}>
                <text>sdogjösdiofjgö</text>
            </spriteMaterial>
        </sprite>
    )
}

type LagerProps = {
    position: Vector3
}
const Lager = (props: LagerProps) => {

    return (
        <mesh position={props.position}>
            <sphereGeometry args={[0.7, 32]}/>
            <meshBasicMaterial color={'red'}/>
        </mesh>
    )
}

type TextObjectProps = {
    text: string
    position: Vector3
}

function TextObject(props: TextObjectProps)
{
    const mesh = useRef(null);

    // const font = new FontLoader().parse(Modak);
/*
    const textOptions = {
        font,
        size: 4,
        height: 2,
        // curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.1,
        bevelOffset: 0.2,
        bevelSegments: 5
    };
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
        <mesh castShadow receiveShadow position={props.position} ref={mesh}>
            <textGeometry attach="geometry" args={textOptions} factor={0.3} />
            <meshBasicMaterial attach="material" color="cyan" />
        </mesh>
    );

 */
    return (<></>);
}


type SphereProps = {
    position: Vector3
    color: Color
}

const Sphere = (props: SphereProps) => {
    return (
        <mesh position={props.position}>
            <sphereBufferGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color={props.color} roughness={0.5} />
        </mesh>
    );
};

const image = 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

type ImageProps = {
    url: string
}

const Image = (props: ImageProps) =>  {
    const [texture] = useMemo(() => {
        const loader = new TextureLoader()
        return [loader.load(props.url)]
    }, [props.url])

    return (
        <mesh position={[0, 0, 5]} scale={[1, 1, 1]} rotation={[0, 0, 0]} >
            <planeBufferGeometry attach="geometry" args={[5, 7]} />
            <shaderMaterial attach="material" transparent args={[HoverImageShader]} uniforms-texture-value={texture} />
        </mesh>
    )
}

type SceneProps = {
    structural_points: DbStructuralPoint[]
    members: DbCurveMember[]
    pointSupports: DbPointSupport[]
}

const Scene = (props: SceneProps) => {

    const zoomVelocity = 20

    const [zoom, setZoom] = useState(3)
    const [beginDragPosition, setBeginDragPosition] = useState(new Vector2())
    const [dragDistance, setDragDistance] = useState(new Vector2())

    const onMouseDownEvent = (evt: React.MouseEvent<HTMLDivElement>) => {
        setBeginDragPosition(new Vector2(evt.clientX, evt.clientY))
    }
    const onMouseUpEvent = (evt: React.MouseEvent<HTMLDivElement>) => {
        setDragDistance(beginDragPosition.sub(new Vector2(evt.clientX, evt.clientY)))
    }

//                 <Text position={new Vector3(2,0,8)} color={'black'} fontSize={35} opacity={1} text={'ksdjmföijdf'} />

    return (
        <div className="canvasFrame"
             onWheel={(e) => setZoom(zoom + (e.deltaY / zoomVelocity))}
             onMouseDown={onMouseDownEvent}
             onMouseUp={onMouseUpEvent}>
            <Canvas
                onCreated={({gl}) => {
                    gl.setClearColor("#252934");
                }}>
                <Suspense fallback={null}>

                    <Image url={image} />

                    {props.structural_points.map(e => (
                        <Dot position={new Vector3(e.coordinate_x, e.coordinate_y, e.coordinate_z)} name={e.name}/>))}

                    {props.members.map(e => (
                        <Line
                            begin={new Vector3(e.beginNode.coordinate_x, e.beginNode.coordinate_y, e.beginNode.coordinate_z)}
                            end={new Vector3(e.endNode.coordinate_x, e.endNode.coordinate_y, e.endNode.coordinate_z)}/>
                    ))}

                    {props.pointSupports.map(e => (
                        <Lager
                            position={new Vector3(e.referencePoint.coordinate_x, e.referencePoint.coordinate_y, e.referencePoint.coordinate_z)}/>
                    ))}
                    <gridHelper args={[10, 10, `white`, `gray`]} />
                    <axesHelper/>
                    <CameraControls zoom={zoom} deltaDrag={dragDistance}/>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Scene