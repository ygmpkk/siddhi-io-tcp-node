import { Socket } from "net";
import { v4 as uuidv4 } from "uuid";
import ByteBuffer from "ByteBuffer";

export class EventComposite {
  byteBuffer: ByteBuffer;

  constructor(sessionId: string, channelId: string, message: any) {
    this.byteBuffer = new ByteBuffer();

    if (typeof message === "object") {
      message = JSON.stringify(message);
    }

    const dataLength = message.length;
    const messageSize =
      4 + sessionId.length + 4 + channelId.length + 4 + dataLength;

    this.byteBuffer
      .byte(2)
      .int32(messageSize)
      .int32(sessionId.length)
      .byteArray(
        sessionId.split("").map((item) => item.charCodeAt(0)),
        sessionId.length
      )
      .int32(channelId.length)
      .byteArray(
        channelId.split("").map((item) => item.charCodeAt(0)),
        channelId.length
      )
      .int32(dataLength)
      .byteArray(
        message.split("").map((item) => item.charCodeAt(0)),
        message.length
      );
  }

  build(): Buffer {
    return this.byteBuffer.pack();
  }
}

export interface TCPNettyClientOptions {
  keepAlive: boolean;
  noDelay: boolean;
}

export class TCPNettyClient {
  private sessionId: string;
  private _client: Socket;
  private host: string;
  private port: number;
  private timeout = 1000;
  private retrying = false;

  constructor(options: TCPNettyClientOptions) {
    this._client = new Socket();
    this._client.on("connect", this.connectEventHandler);
    this._client.on("close", this.closeEventHandler);

    this._client.setKeepAlive(options.keepAlive);
    this._client.setNoDelay(options.noDelay);
    this.sessionId = uuidv4();
  }

  private makeConnection() {
    this._client.connect(this.port, this.host);
  }

  private connectEventHandler() {
    console.log("connected");
    this.retrying = false;
  }

  private closeEventHandler() {
    if (!this.retrying) {
      this.retrying = true;
      console.log("Reconnecting...");
    }

    setTimeout(this.makeConnection, this.timeout);
  }

  connect(host: string, port: number): Promise<boolean> {
    this.host = host;
    this.port = port;

    return new Promise((resolve) => {
      this._client.connect(port, host, () => {
        resolve(true);
      });
    });
  }

  shutdown() {
    this._client.removeListener("close", this.closeEventHandler);
    this._client.destroy();
  }

  send(channelId: string, message: any): boolean {
    const eventComposite: EventComposite = new EventComposite(
      this.sessionId,
      channelId,
      message
    );

    return this._client.write(eventComposite.build());
  }
}

export default TCPNettyClient;
