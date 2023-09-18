import { View } from "@tarojs/components";
import "./index.module.less"

interface ShadowProps {
    onClose: () => void
}

export default function Shadow(props: ShadowProps) {

    const { onClose } = props

    const handleClick = () => {
        onClose()
    }

    return (
        <View className='sidebar-mask' onClick={handleClick} />
    )
}