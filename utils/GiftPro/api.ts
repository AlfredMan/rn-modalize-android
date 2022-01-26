import base64 from "react-native-base64";
import { GiftProOrder } from "../../models/GiftProOrder";
import { Offer } from "../../models/Offer";
import { Voucher } from "../../models/Voucher";
const GIFT_PRO_USERNAME = `gp_RAfUiKJR8MbHkroS7znIOy64tLGaS`;
const GIFT_PRO_API_URL = `https://gp_RAfUiKJR8MbHkroS7znIOy64tLGaS@api.giftpro.co.uk`;
const BAO_DOMAIN_ID = 1597;

export const GIFT_PRO_ID_TO_POINT_DICT = {
  "19159": 300,
} as { [key: string]: number };
export const fetchGiftProOfferDetail = async ({
  productID,
}: {
  productID: string;
}) => {
  try {
    const response = await fetch(`${GIFT_PRO_API_URL}/vouchers/${productID}/`, {
      method: "GET",
      headers: {
        // Authorization: "Basic " + btoa(GIFT_PRO_USERNAME + ":" + ""),
        Authorization: "Basic " + base64.encode(GIFT_PRO_USERNAME + ":" + ""),
      },
    });
    console.log("detail url:", `${GIFT_PRO_API_URL}/vouchers/${productID}/`);
    const offer: Offer = await response.json();
    return offer;
  } catch (err) {
    console.log(err);
    // return { error: err };
    return {} as Offer;
  }
};
export const fetchGiftProOffers = async () => {
  try {
    const response = await fetch(`${GIFT_PRO_API_URL}/vouchers/`, {
      // const response = await fetch(
      //   `https://gp_RAfUiKJR8MbHkroS7znIOy64tLGaS@api.giftpro.co.uk/vouchers/`,
      //   {
      method: "GET",
      headers: {
        // Authorization: "Basic " + btoa(GIFT_PRO_USERNAME + ":" + ""),
        Authorization: "Basic " + base64.encode(GIFT_PRO_USERNAME + ":" + ""),
      },
    });
    const vouchers: Array<Voucher> = await response.json();
    console.log(" fetching:", vouchers);
    return vouchers;
  } catch (err) {
    console.log(err);
    // return { error: err };
    return [] as Array<Voucher>;
  }
};
export const fetchOrderWithRedeemCode = async ({
  redeemCode,
}: {
  redeemCode: string;
}) => {
  try {
    const response = await fetch(`${GIFT_PRO_API_URL}/codes/${redeemCode}/`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64.encode(GIFT_PRO_USERNAME + ":" + ""),
      },
    });
    const orderDetail = (await response.json()) as GiftProOrder;
    if (!orderDetail) {
      return {
        error: `Error when fetching ${GIFT_PRO_API_URL}/codes/${redeemCode}/`,
      };
    }
    // console.log(`order status with redeem code: ${redeemCode}: `, orderDetail?.status)
    return {
      orderDetail,
    };
  } catch (error) {
    return { error };
  }
};
export const getRedeemCode = async ({
  offer,
  email,
  message,
}: {
  offer: Offer;
  email: string;
  message?: string;
}) => {
  try {
    const data = new FormData();
    data.append("domainID", `${BAO_DOMAIN_ID}`);
    data.append("email", email);
    data.append("items[0][productID]", `${offer.productID}`);
    data.append("items[0][personalMessage][0]", offer.productID);
    data.append("methodID", "7477");
    data.append("items[0][options][Value]", "25");

    const response = await fetch(`${GIFT_PRO_API_URL}/orders/`, {
      method: "POST",
      headers: {
        // Authorization: "Basic " + btoa(GIFT_PRO_USERNAME + ":" + ""),
        Authorization: "Basic " + base64.encode(GIFT_PRO_USERNAME + ":" + ""),
        // "Content-Type": "application/json",
        // "Accept": "application/json"
      },
      // body: JSON.stringify({
      //   domainID: BAO_DOMAIN_ID,
      //   email,
      //   "items[0][productID]": offer.productID,
      //   "items[0][personalMessage][0]": message,
      //   methodID: 7477,
      //   "items[0][options][Value]": 25,
      // }),
      body: data,
    });
    const giftProOrderCreated = (await response.json()) as GiftProOrder;
    console.log("gift pro order created", giftProOrderCreated);
    if (!giftProOrderCreated) {
      return {
        error: `Can't create order with offer's productID: ${offer.productID}`,
      };
    }
    const orderDetailResponse = await fetch(
      `${GIFT_PRO_API_URL}/orders/${giftProOrderCreated.orderID}/rows/`,
      {
        method: "GET",
        headers: {
          // Authorization: "Basic " + btoa(GIFT_PRO_USERNAME + ":" + ""),
          Authorization: "Basic " + base64.encode(GIFT_PRO_USERNAME + ":" + ""),
        },
      }
    );
    const orderDetailDict = (await orderDetailResponse.json()) as {
      [key: string]: GiftProOrder;
    };
    const orderDetails = Object.values(orderDetailDict);
    if (!(orderDetails?.length > 0)) {
      return {
        error: `No order detail found for order ${giftProOrderCreated.orderID}`,
      };
    }
    const voucher = Object.values(orderDetailDict)[0];
    const redeemCode = voucher.redeemCode;
    return { redeemCode, voucher };
  } catch (err) {
    return { error: err };
  }
};
