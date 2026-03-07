```
<MyComponent message="Hello" count={42} onCancel={handleCancel} />
```
```
// Define the shape with an interface
interface MyComponentProps {
  message: string;
  count: number;
  onCancel: () => void;  // function that returns nothing
}

// Destructure directly in the function parameter
export default function MyComponent({ message, count, onCancel }: MyComponentProps) {
  return <p>{message}</p>
}
```