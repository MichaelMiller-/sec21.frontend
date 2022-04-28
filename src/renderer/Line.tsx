import React, {useCallback, useMemo} from 'react';
import {Vector3} from 'three';

type LineProps = {
    begin: Vector3
    end: Vector3
}
const Line = (props: LineProps) => {
    const points = useMemo(() => [props.begin, props.end], [props.begin, props.end])
    const onUpdate = useCallback(self => self.setFromPoints(points), [points])

    return (
        <line>
            <bufferGeometry onUpdate={onUpdate}/>
            <lineBasicMaterial color={'green'} linewidth={30}/>
        </line>
    )
}

export default Line