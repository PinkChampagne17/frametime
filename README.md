# frametime

A lightweight library for monitoring frametime in browsers.

## Installation

```sh
npm install frametime
```

## Usage

```typescript
import { subscribeFrametime } from 'frametime';

// Subscribe to frame timing updates
const unsubscribe = subscribeFrametime((frametime) => {
  console.log(`Frametime: ${frametime}ms`);
});

// Stop monitoring when done
unsubscribe();
```

## API

### subscribeFrametime(observer)

Subscribes to frame timing updates.

- **observer**: `(frametime: number) => void` - Callback that receives frame time in milliseconds
- **Returns**: `() => void` - Unsubscribe function

The monitoring automatically starts when the first observer subscribes and stops when all observers unsubscribe.

## License

MIT
