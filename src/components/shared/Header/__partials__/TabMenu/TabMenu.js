import { useState } from 'react';
import { TabButton } from '@ui-kit/Button';

export const TabMenu = ({ menuItems, defaultActiveItem }) => {
  const [activeItem, setActiveItem] = useState(defaultActiveItem);

  const handleItemClick = (item) => () => {
    item.onClick?.();
    setActiveItem(item.id);
  };

  return (
    <div className='cr-tab-container'>
      {menuItems.map((menu) => (
        <TabButton
          key={menu.id}
          isActive={activeItem === menu.id}
          onClick={handleItemClick(menu)}
          className='cr-tab-item'>
          {menu.title}
        </TabButton>
      ))}
    </div>
  );
};
