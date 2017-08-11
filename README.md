# react-native-loader
A collection of animated spinners for react native using ReactART.

![Demo](http://f.cl.ly/items/2W0s3L1s3H2W1i2l3q14/react-native-loader.gif)

# Usage
## Installation
Install it via npm:

```
npm i -S react-native-loader
```

### Android
For Android, it works out of the box.

### iOS
For iOS, add `ART.xcodeproj` from `node_modules/react-native/Libraries/ART` to your Libraries then link `libART.a`.

## How to use
```jsx
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

// ...
<View>
  <Bubbles size={10} color="#FFF" />
  <Bars size={10} color="#FDAAFF" />
  <Pulse size={10} color="#52AB42" />
  <DoubleBounce size={10} color="#1CAFF6" />
</View>

```
