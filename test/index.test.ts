import { TCPNettyClient, EventComposite } from "../src";
import { v4 as uuidv4 } from "uuid";

describe("TCPNettyClient", () => {
  it("EventComposite", () => {
    const sessionId = "6A18CCF6-E309-489D-8EC3-2BDFFE350632";
    const channelId = "topic";
    const message = {
      symbol: "688008.SH",
      price: 83.4,
      time: 1600852671287,
    };

    const eventComposite: EventComposite = new EventComposite(
      sessionId,
      channelId,
      message
    );

    expect(eventComposite.build()).toStrictEqual(
      Buffer.from([
        2,
        0,
        0,
        0,
        109,
        0,
        0,
        0,
        36,
        54,
        65,
        49,
        56,
        67,
        67,
        70,
        54,
        45,
        69,
        51,
        48,
        57,
        45,
        52,
        56,
        57,
        68,
        45,
        56,
        69,
        67,
        51,
        45,
        50,
        66,
        68,
        70,
        70,
        69,
        51,
        53,
        48,
        54,
        51,
        50,
        0,
        0,
        0,
        5,
        116,
        111,
        112,
        105,
        99,
        0,
        0,
        0,
        56,
        123,
        34,
        115,
        121,
        109,
        98,
        111,
        108,
        34,
        58,
        34,
        54,
        56,
        56,
        48,
        48,
        56,
        46,
        83,
        72,
        34,
        44,
        34,
        112,
        114,
        105,
        99,
        101,
        34,
        58,
        56,
        51,
        46,
        52,
        44,
        34,
        116,
        105,
        109,
        101,
        34,
        58,
        49,
        54,
        48,
        48,
        56,
        53,
        50,
        54,
        55,
        49,
        50,
        56,
        55,
        125,
      ])
    );
  });

  // it("send", async () => {
  //   const client = new TCPNettyClient({
  //     keepAlive: true,
  //     noDelay: true,
  //   });

  //   await client.connect("172.18.0.154", 9892);

  //   const channelId = "topic";
  //   const message = {
  //     symbol: "688008.SH",
  //     price: 83.4,
  //     time: 1600852671287,
  //   };

  //   client.send(channelId, message);
  // });
});
