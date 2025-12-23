# Module 1: Compound Components Pattern

## 🎯 Learning Objectives

- ✅ Understand compound components
- ✅ Implement flexible APIs
- ✅ Share implicit state
- ✅ Create reusable component systems
- ✅ Use React Context effectively

---

## 📖 What are Compound Components?

Compound components work together to form a complete UI, sharing state implicitly through Context.

**Think of HTML elements:**
```html
<select>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

## 💻 Basic Example: Tabs

### Implementation

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const TabsContext = createContext();

// 2. Parent Component
function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// 3. Child Components
function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={isActive ? 'tab active' : 'tab'}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div role="tabpanel" className="tab-panel">
      {children}
    </div>
  );
}

// 4. Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
```

### Usage

```jsx
function App() {
  return (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home">Home</Tabs.Tab>
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home">
        <h2>Home Content</h2>
      </Tabs.Panel>
      
      <Tabs.Panel value="profile">
        <h2>Profile Content</h2>
      </Tabs.Panel>
      
      <Tabs.Panel value="settings">
        <h2>Settings Content</h2>
      </Tabs.Panel>
    </Tabs>
  );
}
```

---

## 💪 Advanced Example: Accordion

```jsx
import { createContext, useContext, useState } from 'react';

const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      {typeof children === 'function' ? children({ isOpen }) : children}
    </div>
  );
}

function AccordionTrigger({ id, children }) {
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button
      onClick={() => toggleItem(id)}
      className="accordion-trigger"
    >
      {children}
    </button>
  );
}

function AccordionContent({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);

  if (!isOpen) return null;

  return <div className="accordion-content">{children}</div>;
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// Usage
function FAQ() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item id="q1">
        <Accordion.Trigger id="q1">
          What is React?
        </Accordion.Trigger>
        <Accordion.Content id="q1">
          React is a JavaScript library for building user interfaces.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="q2">
        <Accordion.Trigger id="q2">
          What are compound components?
        </Accordion.Trigger>
        <Accordion.Content id="q2">
          A pattern for creating flexible component APIs.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

---

## 🎯 Real-World Example: Dropdown Menu

```jsx
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const DropdownContext = createContext();

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={dropdownRef} className="dropdown">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
      {typeof children === 'function' ? children({ isOpen }) : children}
    </button>
  );
}

function DropdownMenu({ children }) {
  const { isOpen } = useContext(DropdownContext);
  
  if (!isOpen) return null;

  return <div className="dropdown-menu">{children}</div>;
}

function DropdownItem({ children, onClick }) {
  const { setIsOpen } = useContext(DropdownContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button className="dropdown-item" onClick={handleClick}>
      {children}
    </button>
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;

// Usage
function UserMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        {({ isOpen }) => (
          <span>
            User Menu {isOpen ? '▲' : '▼'}
          </span>
        )}
      </Dropdown.Trigger>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => console.log('Profile')}>
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('Settings')}>
          Settings
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('Logout')}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
```

---

## ✨ Benefits

1. **Flexible API**: Users can compose components however they want
2. **Implicit State**: State shared automatically through Context
3. **Separation of Concerns**: Each component has a single responsibility
4. **Extensible**: Easy to add new child components
5. **Type-Safe**: Works great with TypeScript

---

## ⚠️ Common Pitfalls

### ❌ Mistake 1: Not Using Context

```jsx
// Wrong - passing props manually
<Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
  <Tab value="home" activeTab={activeTab} setActiveTab={setActiveTab} />
</Tabs>

// Right - implicit state via Context
<Tabs>
  <Tab value="home" />
</Tabs>
```

### ❌ Mistake 2: Allowing Invalid Composition

```jsx
// Should validate children
function TabList({ children }) {
  // Add validation
  const validChildren = React.Children.toArray(children).filter(
    child => child.type === Tab
  );
  
  return <div className="tab-list">{validChildren}</div>;
}
```

---

## 🏋️ Exercise

Create a `Modal` compound component:

```jsx
<Modal>
  <Modal.Trigger>
    <button>Open Modal</button>
  </Modal.Trigger>
  
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    
    <Modal.Body>
      Content here
    </Modal.Body>
    
    <Modal.Footer>
      <button>Cancel</button>
      <button>Confirm</button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

---

## ⏭️ Next Module

[Custom Hooks Pattern →](../02-custom-hooks/README.md)
