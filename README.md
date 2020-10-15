# Siddhi IO TCP NODE

## Donation

If this project help you reduce time to develop, you can give me a cup of coffee :)

请作者喝杯咖啡。

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/ygmpkk) <img src="https://github.com/ygmpkk/donate/blob/master/assets/wechat.jpg?raw=true" alt="wechat" height="300" /> <img src="https://github.com/ygmpkk/donate/blob/master/assets/alipay.jpg?raw=true" alt="alipay" height="300" />

## Example

### Siddhi script

```groovy
@App:name("Example")
@App:description("Example Project")

@source(type = 'tcp', context = '/example', @map(type = 'json'))
define stream ExampleStream (hello string);

@sink(type = 'log', prefix = 'LOGGER-InsiderTrader')
define stream OutputStream(hello string);

@info(name = 'ExampleQuery')
from ExampleStream
insert into OutputStream;
```

### Installation

```shell
npm i siddhi-io-tcp-node
```

or

```shell
yarn add siddhi-io-tcp-node
```

### Usage

```javascript
const { TCPNettyClient } = require("siddhi-io-tcp-node");

const client = new TCPNettyClient({
  keepAlive: true,
  noDelay: true,
});

await client.connect("127.0.0.1", 9892);

const context = "/example";
const payload = {
  hello: "world",
};

client.send(context, payload);
```

## License

MIT
