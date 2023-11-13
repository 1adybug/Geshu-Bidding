import { View } from "@tarojs/components";
import { useState } from "react";
import "./index.module.less"

export default function FloatingBall() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View className={`floating-ball ${isOpen ? 'open' : ''}`}>
            <div className='tool1' onClick={handleClick}>1</div>
            <div className={`tool ${isOpen ? 'tool-2' : ''}`}>2</div>
            <div className={`tool ${isOpen ? 'tool-3' : ''}`}>3</div>
        </View>
    );
}