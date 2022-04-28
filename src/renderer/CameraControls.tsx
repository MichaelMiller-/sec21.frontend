import {Vector2, Vector3} from 'three';
import {useFrame, useThree} from "@react-three/fiber";

type CameraControlProps = {
    zoom: number
    deltaDrag: Vector2
}
const CameraControls = (props: CameraControlProps) => {
    // const {camera, size: {width, height}} = useThree();
    const {camera } = useThree();

    const dragVelocity = 100000

    return useFrame(() => {
        const X = camera.position.x + (props.deltaDrag.x / dragVelocity)
        const Y = camera.position.y + (props.deltaDrag.y / dragVelocity)

        const pos = new Vector3(X, Y, props.zoom)
        camera.position.lerp(pos, 0.5)
        camera.updateProjectionMatrix()
    })
}

export default CameraControls