import React, { useState, useRef } from 'react';
import "./index.module.less"

const ListItem = () => {
  const [slideOffset, setSlideOffset] = useState(0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const { clientX } = e.touches[0];
    const offsetX = startX.current - clientX;

    if (offsetX > 0) {
      setSlideOffset(Math.min(offsetX, 100));
      setShowDeleteButton(true);
    } else {
      setSlideOffset(0);
      setShowDeleteButton(false);
    }
  };

  const handleTouchEnd = () => {
    startX.current = 0;
    setSlideOffset(0);
    setShowDeleteButton(false);
  };

  const handleDelete = () => {
    // 处理删除逻辑
    console.log('执行删除操作');
  };

  return (
    <div
      className='list-item'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // 添加 onTouchCancel 事件处理，确保在触摸取消时也停止滑动
      style={{ transform: `translateX(-${slideOffset}px)` }}
    >
      <div className='content'>列表项内容</div>
      {showDeleteButton && (
        <div className='delete-button' onClick={handleDelete}>
          删除
        </div>
      )}
    </div>
  );
};

export default ListItem;