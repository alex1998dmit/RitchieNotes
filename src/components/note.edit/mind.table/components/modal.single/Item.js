import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Item.css';

export default ({ el, closeModal, isOpened }) => {
  const node = useRef();
  const styles = {
    display:isOpened ? 'block' : 'none',
  };
  const outsideClick = useCallback((e) => {
    if (node.current.contains(e.target)) {
      return ;
    }
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    // for disable editing if clicked outside
    document.addEventListener("mousedown", outsideClick);
    // for disable editing if esc pressed
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [outsideClick]);

  return (
    <>
      <div className="mind-table-item-container" style={styles}>
        <div className="content">
          <div className="card" ref={node}>
            <div className="title">
              <h2>
                {el.title}
              </h2>              
            </div>
            <hr/>
            <div className="desc">
              {el.description}
            </div>
          </div>
          <div className="options">
            <div className="option">
              <button>Посмотреть</button>
            </div>
            <div className="option">
              <button>Удалить</button>
            </div>
            <div className="option">
              <button>Потомки</button>
            </div>
            <div className="option">
              <button>Редактировать</button>
            </div>
            <div className="option">
              <button onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}